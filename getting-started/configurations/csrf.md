# Cross Site Request Forgery (CSRF)

Another security layer for your application. This allows you to set if you wish to use it and
what are the expiration settings.

<br/>

defaults:
```php
'CSRF' => [
    'use' => true,
    'leeway' => 5,
    'expiration' => 120,
    'fieldName' => '_csrf_'
]
```

## use

Whether to use it or not.

## leeway

How many seconds to still accept the csrf token for after expiration.

## expiration

How many seconds before the token is expired.

## fieldName

The field name that will be looked for in requests and set when used in twig. We __highly recommend__
you set this to something unique which will protect you more against bot attacks.

::: danger
We are not kidding around, you need to set this to something very random that bots will not detect
it as a CSRF token field. It's very important.
:::