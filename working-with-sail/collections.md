# Collections <Badge type="tip" text="3.0.0" />

Collections are a widely used class that wraps up the `Array` functionalities by providing the most used array related
php functions but providing a normalized api. It also provides more advanced methods that php does not offer out of the box.

Collection is compliant with the `ArrayAccess` interface. That means that you can access collection information using it like
a regular array

```php
$myCollection[0];
// Is equivalent to
$myCollection->at(0);
```

You can also use the `get` method to fetch deep values.

```php
$myCollection->get('get.a.deep.value.down.in.the.arrays', 'default value');
```

Collection is also compliant with the `JsonSerializable` interface to make it compatible with all json methods.

```php
json_encode($myCollection);
// is equivalent to
$myCollection->toJSON();
```

You also can use collection in model castings.

Collection implements the most commonly used methods for array like (but not limited to):

`find`, `map`, `filter`, `reduce`,  `each`, `push`, `slice`, `pop`, `reverse`, `contains`, `shuffle`, `dedup`, `chunks`,
`sort`, `sortBy`, `merge` and many many many more.

We suggest you take a look at the API Documentation to learn all the available methods in the Collection class.