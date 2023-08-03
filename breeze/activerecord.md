# ActiveRecord <Badge type="tip" text="3.0.0" />

Breeze offers a second way to work with the database. This second way to work with the database is also very popular
with developers. It does not support as advanced things like the normal way to use it. But it can save alot of time
or do things very easily.

## Create a document

```php
$model = new ModelName();
$model->propName = 'value';
$model->save();

// After being saved, the id is now available
echo $model->id;
```

## Check if a document exists in the database

Sometimes with complex methods that creates a record in once place and saves later on in the method, you might know
if the document has been saved or not. Using the `exists` method will tell you if the document was saved at least once
in the database.

```php
if ($model->exists()) {
    // Exists in the database
}
```

## Modifying a document

Once you have fetched a document (with or without ActiveRecord) you can easily change values of properties and save
them back.

```php
// .. code that fetches

$obj->prop1 = 'new value';
$obj->prop2 = 200;
$obj->save();
```

## Fetching a document by id

```php
$obj = ModelName::get('id');
```

## Fetching a document by a field value

To perform this you must use the `getBy` method. Here is the signature

```php
$obj = ModelName::getBy('field', $value);
```

By default, this runs a equality operator on the query. But you can pass a third argument to set the operator you want.
Here is the list of supported operators (quotes are just to identify the operator):

| Operateur | Alias   | Description                              |
|-----------|---------|------------------------------------------|
| "=="      | "eq"    | equal                                    |
| "!="      | "ne"    | Not equal                                |
| ">"       | "gt"    | Greater than                             |
| "<"       | "lt"    | Lower than                               |
| ">="      | "gte"   | Greater or equal                         |
| "<="      | "lte"   | Lower or equal                           |
| "in"      | "has"   | In array                                 |
| "notin"   | "nin"   | Not in array                             |
| "like"    | "regex" | Value contains (similar to SQL '%value%' |
| "notlike" | ""      | Value does not contain                   |

## Increment a value

This method enables you to increment a value and do it safely. What do we mean by doing it safely, here is a typical
way developers increment a value and save it to the database:

```php
$obj->prop++;
$obj->save();
```

But this is not considered safe. Because the second you fetch the document, it can become obsolete if any other user
increments or changes this document before you get to save your changes. So if you get the document and it's `prop` value
is at `5` when you fetch and then you increment by `1`, you are expecting it to be `6` it might be true sometimes but
at one point you will notice that you are starting to lose data because maybe by the time you save the `6` value someone
already changed it to `7` or `8`. By the time you save, you set the value to `6` instead of whatever the value is +1.

This method makes sure that whatever the value is, it's incremented by what you want.

```php
$obj->increment('field', 1);
$obj->save();
```

> __Note__: `save` is required to register any of the 5 special calls (increment, push, pop, pull, pullAll).

## Push to array

You can easily push content to an array in your database object using `push` and `pushEach`. `push` is meant to be used
with 1 item being added. `pushEach` will push an array's items one after the other. See it like a merge. But `pushEach`
also has a secret power, it can sort and/or slice the final array.

## Pop out of array

Remove the first element of your array.

## Pull from array

Remove the last element of your array.

## Pull all from array

Removes everything that matches your query in the array. For example, you want to remove every item that matches the "world"
string.

## Updated values after saving

This is useful when you update a document with any of the `increment`, `push`, `pop`, `pull`, `pullAll` methods. You
can ask the model to refresh itself.

```php
$obj->refresh();
```

Note that this will only update the object's properties that marked as modified, any other property is left untouched.

## Check if document is dirty

You easily find out if the document you are manipulating has been changed by using the `isDirty` method.

```php
if ($obj->isDirty()) {
    // Yep modified!
}
```

## Delete a document

You can easily delete any document (and instance of a model really, even if not in ActiveRecord mode) using the `delete`
method on the document.

```php
$obj->remove();
```