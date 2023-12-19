# ODM <Badge type="tip" text="3.0.0" />

Breeze uses [MongoDB](https://www.mongodb.com) for database. That ODM is called Breeze, it provides a very smooth 
experience to create models and migrations and work with the database.

## Connecting

By default, in your `.env` file, you have a `DATABASE_DSN`. This is where you put your mongodb dsn string. But one thing
that is very cool, is that if for some reason, you need to connect to more than one database. Breeze offers multi database
support. You can see this as a very low cost way to scale your database if needed.

To connect to multiple sources, simply use multiple `DATABASE_DSN` by given them ids, like so:

```dotenv
DATABASE_DSN=mongodb://...
DATABASE_DSN_2=mongodb://...
```

The main DSN should never have a number. In code, your main DSN is refered to as connection `0`.

```php
class YourModel extends Model
{
    protected int $connection = 0; // or 1 if you have 2 DSNs. 0 is the defaut value
}
```

## First steps

To create your first model, use the CLI:

```bash
php sail create:model <module_or_container> <container_or_module_name> <model_name>
```

So for example:

```bash
php sail create:model container Spec Product
```

This would create the `Product` model in the `Spec` container space. The standard is naming your model using singular
grammar. Automatically, Breeze will know to use the plural for the collection in the database. In this case, `Product`
would store data in the `products` collection.

## Custom collection name

By default, when creating a model, Breeze will take the name of your model and pluralize it and set it to snakecase. so
`MyModel` would be in collection `my_models`. Sometimes, that's perfect, but sometimes that is not what you want. To
change it, simply define it like this:

```php
class YourModel extends Model
{
    protected string $collection = 'my_super_models';
}
```
## Helping your IDE help you

To make sure your IDE helps you for code completion and doesn't go crazy saying "accessed property using magic methods", 
we suggest adding a phpdoc block to define your properties, here is an example:

```php
/**
 *
 * @property string $name
 * @property int $number
 * @property Collection $list
 * 
 */
class YourModel extends Model
{
    // ...
}
```

## Fields

the `field` property let's Breeze know what fields are allowed to be in the json representation of your model. by default,
the value is set to `['*']`, meaning, all fields will be allowed for json representation.

If you want to keep sensitive information out of json representations, use the `guards` property.

## Guards

Guards are used to protect sensitive information from leaving the cms. That means that whenever a model is encoded to json,
the fields in the model's `guard` property will be omitted.

## Validators

Validators are used to validate the data before being inserted or updated in the database. For example, you want to
make sure that the title of your content to be "not empty", the validators would do this check for you automatically.

Here is the list of built-in validators:

| Identifier | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| not-empty  | Validates that property is not empty                         |
| string     | Validates that property is a string                          |
| numeric    | Validates that property is of a numeric value (float or int) |
| boolean    | Validates that property is a boolean                         |

Provided validators can be used together to perform multiple validations, for example,<br/>"not-empty,string" would validate that the property is not empty and is of type string.

### Custom Validator

If you want, you can build your own custom validator. To do that, you need to have a class that implements the `Validator`
interface and have the `validate` method. to register it in the `$validators` property in your model. 

```php
protected array $validators = [
    'propA' => MyValidator::class
];
```
And your validator looks like this

```php
use Breeze\Contracts\Validator;

class MyValidator implements Validator
{
    public static function validate(string $key, mixed $value): void
    {
        // Your code validates the value, if everything is ok
        // you do and return nothing. In the case that something
        // is wrong, you throw an exception
        
        // Note: if you do not throw an exception, the database will save your
        // data as is and act like everything was validated.
    }
}
```

## Permission Checking

If you would like to check for permissions for a specific call, you have access to the `hasPermissions` method. If you
do not specify anything, it will check for write permission. If you provide true, it will check for read permission.

Before you can use this method, you need to define what ACL group your model works with. Here is an example for model
that uses a custom `products` ACL group, using the `permissionGroup` property:

```php
class YourModel extends Model
{
    protected string $permissionGroup = 'the_name_of_you_acl';
}
```
Then anywhere in your model, you can call:

```php
$this->hasPermission(); // check write
```

if your code makes it passed this method, that means permission is allowed. otherwise, the code will throw an exception
saying `permission denied`.

## Separation of Concern

Breeze enforces separation of concern. What that mean is that Breeze forces you to do your database queries from within
a model. You cannot perform any queries from outside. Well, you can but it's extra work for you to get that going.

## Querying

One thing to know is that Breeze uses chaining to simplify and make developer experience better when querying. Here is
a basic get by id.

```php
public function getById(ObjectId|string $id): ?YourModel
{
    return $this->findById($id)->exec(); 
}
```

Breeze offers the classic options for querying that mongodb has. `find`, `findOne`, `count`, `aggregate` but it also has the
very useful `findById` which accepts a string or ObjectId. The other 2 find calls require that `_id` be an ObjectId.

One special method also supported is `distinct` to perform a distinct queries much like MySQL does.

### Query Options

Breeze offers a simple of gathering all possible options of a call into a simple object. This gathers `sort`, `skip`, 
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

### QueryOptions alternative

The `QueryOptions` are made for better code reuse and to tighten up large queries. But if you want to do "one-off" settings
like skip documents or limit the amount of documents to return, you can use the inline methods:

```php
$this->find()->skip(5)->limit(20)->exec();
```

Every option in `QueryOptions` is available as an inline method:

```php
$this->find()->skip(5)
             ->limit(10)
             ->collation('fr')
             ->sort(['field' => 1])
             ->project(['fieldA' => 1])
             ->exec();
```

## Caching

Breeze offers fully-managed caching using Redis within models. This means that if you provide a key and optionally a
time to live, the model system will read/write to cache if it's active. To use caching, simply define your key in the 
exec method.

```php
$this->find([...])->exec('mySpecialKey', Cache::TTL_MONTH);
```

By default, if no TTL given, `Cache::TTL_WEEK` will be used.

A thing to note is that model and list of models when returning from cache use what we call `CastBack` which casts the
value of the model (json) back to its original model, so you don't have to.

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

Like updates, Breeze supports `deleteMany`, `deleteOne` and `deleteById`.

Delete methods return the number of records affected by the operation.

## Bulk Operations

Breeze has support for MongoDB's `bulkWrite` command. This enables high effiency and performance when you have bulk
of data to update. This is preferred to the writing as many times as the number of records you are updating methodology.
Here is an example of a bulkwrite for updating records.

```php
foreach ($loopEl as $num => $loop) {
    $ops = [
        'updateOne' => [
            ['_id' => $loop->_id],
            ['$set' => ['value' => ($num + 1)]]
        ]
    ];
}

$this->bulkWrite($ops);
```

This loops through records to build an array of operations to perform, once we are ready, we perform only 1 database 
operation. This will always be more efficient than doing 1 operation per record.

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

__NOTE__: Breeze supports creating basic indexes, if you need more advanced indexes, it's preferred to be done directly
in your database.

## Logging Queries

You can activate the `logging` configuration (__works only in development mode__), this will log your queries to wherever
you have configured the logger. We recommended database logging as it's clearer than flat file.

## Utilities

### ensureObjectId

This method takes an ObjectId or string as argument and makes sure to return an ObjectId. The reason this exists is because
developing using the _id as string in the code is simpler than dealing the object everywhere. But the database expects the
object, this makes sure that the variable you have is an ObjectId before you pass it to mongodb.

### ensureObjectIds

This method is the same as `ensureObjectId` but works on an array of ids.

### timeToDate

This turns any timestamp into a UTCDateTime object.

### safe

This method is there for you to filter out possible bad user input. Even if the database is not SQL, Document Injection is
a very real thing. To prevent this, use `safe` on the data your want to store, it will make sure it's safe to be used
in a database call. This method is recursive, that means, all the input will be sanitized.

__NOTE__: This is to process values, not entire mongodb object/insert/update/delete calls.