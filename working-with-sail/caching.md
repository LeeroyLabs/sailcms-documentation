# Caching  <Badge type="tip" text="3.0.0" />

SailCMS offers Redis caching out of the box. It's deeply integrated with the ORM to provide managed cache handling for
database records.

## Database

As mentioned, the base model handles all the logic for caching, you only need to provide a key. All fetching methods
gets/sets cache and all mutating methods clear cache.

But they do not clear cache system wide, they clear the model's namespace only. That name is managed by the base model,
you only need to provide something significant to you. For example

```php
$this->find([...])->exec('user_id_here', Cache::TTL_MONTH);
```
Within the User model, this will be stored in the user model's namespace with the key of the user id.

## Custom use

You can also use the caching system to your own needs without a database model. You can do this

```php
Cache::set('keyname', $value, Cache::TTL_WEEK); // TTL is optional (default 1 week)

Cache::get('keyname');
```

When using the cache directly, you are responsible for namespacing your keys yourself. But you don't have to.

```php
Cache::set('keyname', $value);                // no namespace
Cache::set('your_namespace:keyname', $value); // namespace called your_namespace
```

to clear cache on the database (cache database) or to clear a namespace on the database:

```php
Cache::remove('keyhere');                  // Remove a single key
Cache::removeAll();                        // Clear only the used database
Cache::removeAll(true);                    // Clear all databases
Cache::removeUsingPrefix('yournamespace'); // Clear your namespace
```