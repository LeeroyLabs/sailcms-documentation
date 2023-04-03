# Cache

This configuration is to be used for caching in your project. The caching adapter is Redis.

<br/>

Defaults:
```php
'cache' => [
    'use' => (bool)env('cache_use', 'false'),
    'host' => env('cache_host', 'localhost'),
    'user' => env('cache_user', ''),
    'password' => env('cache_password', ''),
    'port' => 6379,
    'database' => 10,
    'ssl' => [
        'verify' => true,
        'cafile' => '/path/to/file'
    ]
]
```

## use

Use caching or not.

## host, user, password, port, 

These are the url/port and credentials to connect to and with.

## database

The database number.

## ssl

If you require an SSL connection, you need to provide verification information.

### verify

Do we verify the SSL?

### cafile

Certificate file to use for validation.