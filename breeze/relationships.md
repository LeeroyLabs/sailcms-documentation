# Relationships

Breeze offers a very easy to use relationship system to load relationships automatically for you. Breeze offers
3 types of relationship. `hasOne`, `hasMany` and `hasManyOn`.

:::danger
One very important thing to understand is that relationships will not be processed when the max depth has been reached.
This stops your application from falling into an infinite resolving situation. By default, we set this limit to __3__.

We do not recommend going above 3 levels of depth. Unless you know what you are doing or know the impacts setting this
to a higher limit will have.
:::

## Configuring a relationship

To get relationships up and running, you need to inform Breeze on what the relations and their types are. Here is an
example of a simple `hasOne` relationship.

```php
class MyModel extends Model
{
    protected array $relationships = [
        'model_key' => [self::hasOne, OtherModel::class, 'optional_new_key']
    ];
}
```
This example above tells Breeze that the `model_key` property has 1 to 1 relationship with the `OtherModel` and will
store the result in a new `optional_new_key` in your model. Of course, you don't have to add a new property but it can
be handy if you want to keep the original value intact.

## hasOne

The `hasOne` type will assume you are using an id to be matched on the target side. For example, if in your model the
value is named `user_id` it will check in the target collection for `_id` being equal to your user_id. Note that your
value does not have to be an `ObjectId`, it can be the string representation of it, but it can also be an `ObjectId`.

## hasMany

The `hasMany` works with arrays. For example, you have an array of user ids, if you would like to have a relationship
for that array. You would use `hasMany` here. Here is a code example:

```php
class MyModel extends Model
{
    protected array $relationships = [
        'model_array' => [self::hasMany, User::class]
    ];
}
```
This example would get all users that have their id in the `model_array` property.

## hasManyOn

The `hasManyOn` is more of what you would expect `hasMany` would be in the SQL world. To demonstrate a use case for this
type, imagine you are logging everything a user does in your application. You have a bunch of log documents for a single
user. In your user model you could have:

```php
protected array $relationships = [
    'logs' => [self::hasManyOn, Log::class, 'user_id']
];
```
This defines a new property called `logs` on our model, using the `Log` class and using the `user_id` property on it
to match with our model's `_id`.

That means that if you fetch a user, there would be a property `logs` that would be an array with the logs that the 
user has.