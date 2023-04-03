# Session

These settings help you manage the session system for Sail.

<br/>

Defaults:
```php
'session' => [
    'mode' => \SailCMS\Session\Stateless::class,
    'httpOnly' => true,
    'samesite' => 'strict',
    'ttl' => 21_600, // 6h
    'jwt' => [
        'issuer' => 'SailCMS',
        'domain' => 'localhost'
    ]
]
```

## mode

Set the adapter to use for sessions. We provide Standard and Stateless adapters. Standard uses the php
session and the stateless adapter is the recommended way of doing things. The stateless adapter is best
for serverless or load balanced environments.

## httpOnly, samesite and ttl

These settings are related to the cookies set for you for both adapters. They set if javascript has
access to the cookie (httponly), samesite sets the domain that can use the cookie and the ttl is the
cookie's time to live or duration.

## jwt

These are the settings for the JWT for the stateless adapter. It sets the issuer of the token and the 
domain. These 2 values are used in the validation of tokens.