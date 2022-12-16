# Collections

Collections are a widely used class that wraps up the `Array` functionalities by providing the most used array related
php functions but providing a normalized api. It also provides more advanced methods that php does not offer out of the box.

Here is a list of all available methods.

## get

This is the most important method of the Collection class. It enables you to access and traverse your collection with ease.

Take this array for example:

```php
$arr = [
    'somekey' => [
        'anotherlevel' => [
            'gettingdeep' => 'this is what im looking for'
        ]
    ]
];
```

Assuming the collection has the same content:

```php
echo $collection->get('somekey.anotherlevel.gettingdeep');
// would output: this is what im looking for
```

What if you are looking at an array with numerical keys

```php
$class1 = (object)['test' => 'Hello World!'];
$col1  = new Collection(['abc', 'def', $class1]);
$col2  = new Collection(['rst', 'uvw', 'xyz']);

$collection = new Collection([$col1, $col2]);
    
echo $collection->get('0.2.test');
// would output: 'Hello World!'
// because it would look at index 0 ($col1), then index 2 ($class1)
// then find the value for 'test'
```

You can even do the following

```php
$collection = new Collection([
    'mainkey' => [
        'subkey' => [
            (object)['key' => 'Hello World'],
            (object)['key' => 'Hello World Again?']
        ]
    ]
]);

$obj = $collection->get('mainkey.subkey.0');
echo $obj->key;
// would output: Hello World
```


## push / pushSpread

This enables you to push or push using spread operator at the of the collection.

```php
$collection->push(['test' => 1]);
$collection->pushSpread(...$var);
```

## pushKeyValue / pushSpreadKeyValue

This enables you to push ke/value pair to an associative collection.

```php
$collection->pushKeyValue('key', 'value');
$collection->pushKeyValue(
    ['key' => 'value'], 
    ['key2' => 'value'],
    ['key3' => 'value']
);
```

## prepend

Add an element to the beginning of the collection.

```php
$collection->prepend(['test' => 'value']);
```

## add

Add an element using a key to an associative collection.

```php
$collection->add($key, $element);
```

## reverse

Reverse a collection.

```php
$newCollection = $collection->reverse();
```

## slice 

Get a piece of the collection using start/end indexes.

```php
$newCollection = $collection->slice(0, 5);
```

## splice

Remove a part of a collection.

```php
$newCollection = $collection->splice(0, 5);
```

## chunks

Get a chunked version of the collection by the given size and optionally preserve keys.

## pop

Remove `n` elements off the end of the collection. 

## pull

Remove an element a position `n` and return it.

## keys

Get all keys from the collection.

## at / idx / nth

These are all the same, they return the item at the given index.

## map

This enables you to loop through the collection and return a new collection of whatever value you want.

## reduce

This reduces the values of the collection a single value. For example, reduce `[4, 100, 12, 1, 0]` to `117`.

```php
$value = $collection->reduce(fn ($value, $item) => $value += $item, 0);
```

__NOTE__: It's important to remember that php has deprecated mixing of floats and integers. If you plan on dealing
with floats and integers, please cast everything to float first.

## filter

## shuffle

## contains

## dedup

## each

## find

## findIndex

## sort

## sortBy

## get

## diff

## intersect

## merge

## toArray

## toJSON

- flatten
- where
- whereIn
- whereInStrict
- whereNotIn
- whereNotInStrict
- whereBetween
- whereNotBetween
- whereNull
- whereNotNull
- whereInstanceOf
- whereNotInstanceOf
- max
- maxBy
- has
- unwrap
- setAt
- setFor