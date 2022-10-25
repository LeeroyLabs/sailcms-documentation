# Metadata

⚠️ __THIS IS AN ADVANCED SUBJECT__ ⚠️



User metadata is way to have user records to expand depending on project requirements. SailCMS offers a way to do this without too much headaches.



## Getting started

To get started, you need to register the metadata keys you would need. There are 2 types of metadata you create. Either an arbitrary key/value or a flag. Flags are useful to have an easy boolean response to specific things like `received_welcome_email` or things like `is_vip` . The name is up to you and the need you have.



### To register an arbitrary key/value pair

```php
// Register a straightforward key / string value
UserMeta::register('my_key', UserMeta::TYPE_STRING);

// Register a straightforward key / int value
UserMeta::register('my_key', UserMeta::TYPE_INT);

// Register a straightforward key / float value
UserMeta::register('my_key', UserMeta::TYPE_FLOAT);

// Register a straightforward key / boolean value
UserMeta::register('my_key', UserMeta::TYPE_BOOL);
```

The reason you have a difference between `int` and `float` is because this api uses the GraphQL scalar values.



For more complex data structures, you can use the 5th type `UserMeta::TYPE_CUSTOM`. This one is more advanced and complex. You can build it to be an object or an array. The choices is yours.



The api signature is the following:

```php
public static function register(string $key, int $type callable $callback): void
```

So if you pass an array with a static class name (ex: `YourClass::class`) your method needs to be static to work. If you pass an object, it must be public.

```php
UserMeta::register('my_key', UserMeta::TYPE_CUSTOM, [YourClass::class, 'yourMethod']);
```

Your callback must provide an instance of the `Collection` class. It must be an associative collection. Like the following:

```php
$graphql = '';

foreach ($yourdata as $value) {
  $graphql .= $value . ': Boolean!'; 
  // the string part is the graphql type that your meta field represents
  // it could be anything you want.
}

return $graphql;
```

This string will be injected in the GraphQL schema under the `UserMeta` type and input definitions.



The reason adding to the metadata is complex is because of GraphQL. GraphQL requires you to define all properties and objects of all objects. This means that using metadata is easier if you do not need to send your metadata through GraphQL.



__TAKEAWAY__: Do not use this mechanism if you do not plan on exposing extra metadata in your GraphQL schema.