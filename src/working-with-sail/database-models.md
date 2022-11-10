# Database and Models

SailCMS uses [MongoDB](https://www.mongodb.com) for database. It provides a very smooth experience to create models and
work with the database.

To create your first model, use the CLI:

```bash
php sail create:model <module_or_container> <container_name_or_module_name> <model_name>
```

So for example:

```bash
php sail create:model container Spec Product
```

This would create the `Product` model in the `Spec` container space. The standard is naming your model using singular
grammar. Automatically, SailCMS will know to use the plural for the collection in the database. In this case, `Product`
would store data in the `products` collection.

## Custom collection name

To use a custom collection name, you need to implement a custom `__construct` method that forces the name. For example:

```php
public function __construct()
{
    parent::__construct('your_custom_name');
}
```

__NOTE__: When setting a custom name, SailCMS will use it as is, it will not pluralize it for you.

## Defining your properties

SailCMS has 2 things you need to do to enjoy a nice development experience and please the future versions of php. You
need to define your properties in your model, like the following:

```php
class YourModel extends BaseModel
{
    public string $some_text = '';
    public int $some_number = '';
}
```

That will be super useful if you use any development environment that has intellisense. Also, it is future-proof against
incoming changes in php about "magical use of properties on objects".

As a standard, we suggest using snake-case for database properties. SailCMS uses this format for all database properties.
But you have the choice, it's your call.

SailCMS also provides a way to secure some fields that you may not want to return to an api or any malicious code.

## Fields

The `fields` method tells the underlying orm what field you want to expose to the rest of the application. For a use
case, let's use the case of a user.

User has a password, but it's not safe to just pass this around to anything that should not have it. In this case, `fields`
returns every property __but__ the password property.

In the case that want to have the password. In this case, when you query the model, pass `true` to the `exec` method, 
this will tell the model to return all properties.

## Permission Checking

If you would like to check for permissions for a specific call, you have access to the `hasPermissions` method. If you
do not specify anything, it will check for write permission. If you provide true, it will check for read permission.

Before you can use this method, you need to define what ACL group your model works with. Here is an example for model
that uses a custom `products` ACL group, using the init method:

```php
public function init(): void
{
    $this->setPermissionGroup('products');
}
```
Then anywhwere in your model, you can call:

```php
$this->hasPermission(); // check write
```

if your code makes it passed this method, that means permission is allowed. otherwise, the code will throw an exception
saying `permission denied`.

## Separation of Concern

SailCMS enforces separation of concern. What that mean is that SailCMS forces you to do your database queries from within
a model. You cannot perform any queries from outside. Well, you can but it's extra work for you to get that going.

## Querying

One thing to know is that SailCMS uses chaining to simplify and make developer experience better when querying. Here is
a basic get by id.

```php
public function getById(ObjectId|string $id): ?YourModel
{
    return $this->findById($id)->exec(); 
}
```

SailCMS offers the classic options for querying that mongodb has. `find`, `findOne`, `count`, `aggregate` but it also has the
very useful `findById` which accepts a string or ObjectId. The other 2 find calls require that `_id` be an ObjectId.

One special method also supported is `distinct` to perform a distinct queries much like MySQL does.

### Query Options

SailCMS offers a simple of gathering all possible options of a call into a simple object. This gathers `sort`, `skip`, 
`limit` and `projection`. Here are examples of how to use it:

```php
// Init with all options
$this->find(['some_field' => true], QueryOptions::init(['yourfield' => 1], 0, 100, ['sortkey' => 1]));

// Init with only sort
$this->find(['some_field' => true], QueryOptions::initWithsort(['sortkey' => 1]);

// Init with only pagination (skip and limit)
$this->find(['some_field' => true], QueryOptions::initWithPagination(0, 100));

// Init with only projection
$this->find(['some_field' => true], QueryOptions::initWithProjection(['yourfield' => 1]));

// You can add that to a query
$this->find([], QueryOptions::initWithPagination(0, 100))->exec();
```

### Populating

SailCMS implements a feature that is found in the popular orm `Mongoose` for nodejs, populate. This enables you to populate
fields that represent an id of another collection without having to do an extra query in your code.

For example, let's take this collection structure and see how we can use populate to save on queries.

```json
{
    "_id": "63653ce2fc482bfbb70d4f76",
    "name": "Apple",
    "author_id": "634ed5a2af9ad9278209b245",
    "category_id": "6346e9e988bac135e7018214"
}
```

```php
$this->find([])->populate('author_id', 'author', User::class)->populate('category_id', 'category', Category::class)->exec();
```

This would add `author` and `category` properties to your returned documents. Don't worry if the value of the field you
are targeting for population (eg: `author_id`) is empty or null, SailCMS will know to not call populate on it. Instead,
it will create the property and set it to `null`. If you are using this for GraphQL, we suggest having those fields be 
optional in case a value would be null.

#### Note

This feature, unlike mongoose, does not support nested population.

## processOnFetch and processOnStore

These two optional methods are overridable for you to provide more context to custom data types. For example, let's say
you have a property that stores this kind of data:

```json
{
    "title": {
        "fr": "Premier test",
        "en": "First Test"
    },
    "date": 1668089783
}
```

The recommended way to handle this in php is to have a custom type that will represent this data.

```php
use SailCMS\Contracts\DatabaseType;
use SailCMS\Types\LocaleField;

class YourCustomType implements DatabaseType
{
    public LocaleField $title;
    public int $date;
    
    public function __construct(public readonly LocaleField $title, public readonly int $date) { }
    
    // Required method for the ORM to know what to do when encountering this type when writing
    public function toDBObject(): \stdClass|array
    {
        return [
            'title' => $this->title,
            'date' => $this->date
        ];
    }
}
```

If you notice, when running the `toDBObject` you are not simplifying the title. This is because the `LocaleField` is 
a defined database type and implements its own `toDBObject` method, so you don't have to.

The `processOnStore` is a method that you can use if you do not want to custom type your things and have more obscure
objects or code.

The `processOnFetch` is executed when documents are pulled from the database, this method is called on every field. If
you need to instantiate a custom type, this is where you do it. Sort of like this:

```php
public function processOnFetch(string $key, mixed $value): mixed
{
    if ($key === 'yourCustomProp') {
        return new YourCustomType(...$value);
    }
    
    return $value;
}
```

So when the database calls on each field, if the key is what you are expecting, you can cast it to the proper object type.
It's important to return the value has is if nothing is to be done (if it's already a known type to the database).

## Inserting

To insert a record into the database, you have access to 2 methods, `insert` and `insertMany` for bulk operations.

```php
$this->insert([
    'field' => $value
]);
```

Insert methods return the id of the records created

## Updating

To perform updates, you have either `updateMany` or `updateOne`. Here is how you can update a document.

```php
$this->updateOne(['_id' => $id], ['$set' => ['fielda' => 1, 'fieldb' => 2]]);
```

Update methods return the number of records affected by the operation.

But you can also use any of mongodb's update operators (ex: `$push`, `$pull`, etc.).

## Deleting

Like updates, SailCMS supports `deleteMany`, `deleteOne` and `deleteById`.

Delete methods return the number of records affected by the operation.

## Adding indexes using code

If your code needs to perform indexing of collections, you can easily perform this task with

```php

// Optional options
$options = [
    'unique' => true,
    'name' => 'your_index_name',
    // etc.. (all available mongodb options are available)
]

$this->addIndex(['field' => 1], $options); // 1 = Ascending, -1 Descending

// or

$this->addIndexes([['field' => 1], ['field2' => -1]]);
```

As you can add indexes, you can remove them with `dropIndex` or `dropIndexes`.

__NOTE__: SailCMS supports creating basic indexes, if you need more advanced indexes, it's preferred to be done directly
in your database.

## Utilities

### ensureObjectId

This method takes an ObjectId or string as argument and makes sure to return an ObjectId. The reason this exists is because
developing using the _id as string in the code is simpler than dealing the object everywhere. But the database expects the
object, this makes sure that the variable you have is an ObjectId before you pass it to mongodb.

### timeToDate

This turns any timestamp into a UTCDateTime object.

### safe

This method is there for you to filter out possible bad user input. Even if the database is not SQL, Document Injection is
a very real thing. To prevent this, use `safe` on the data your want to store, it will make sure it's safe to be used
in a database call. This method is recursive, that means, all of the input will be sanitized.

__NOTE__: This is to process values, not entire mongodb object/insert/update/delete calls.