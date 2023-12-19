# Casting <Badge type="tip" text="3.0.0" />

Casting enables the database to cast your data into your application's classes. Instead of havin generics objects and
arrays, you can have custom objects that are more powerful and that your IDE knows about and can help you with
autocompletion.

To set what field are being cast to something other than basic value, you need to specify them in the `casting`
property of your model.

Breeze supports a few object types and special values out of the box.

The object types are `Carbon` (date), `ObjectId` (database id), `Collection` and `DateTime`. For special values, 2 are
supported. `encrypted` decrypts the value out of the database and encrypts it when going in. `timestamp` takes a
timestamp value and turns it into a Carbon object and turns a Carbon object into a timestamp.

Here is an example of how you configure your casting values

```php
class YourModel extends Model
{
    protected array $casting = [
        'key1' => 'encrypted',
        'key2' => 'timestamp',
        'key3' => Collection::class,
        'key4' => Carbon::class
    ];
}
```

In the case that you have a collection and want to cast its values, you provide an array and provide casting information
for them, like this:

```php
class YourModel extends Model
{
    protected array $casting = [
        'key1' => [Collection::class, SomeType::class],
    ];
}
```

## Casting to custom objects

Breeze allows you to cast to any type of class. The only thing you need to do is to implement the `Castable` contract.
Here is an example of what an implementation would look like:

```php
class MyObject implements Castable
{
    public function castFrom(): mixed
    {
        return [
            'key1' => $this->key1,
            // ...
        ];
    }
    
    public function castTo(mixed $value): self
    {
        return new self(...);
    }
}
```