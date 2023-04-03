# Cross-Origin Resource Sharing (CORS)

<br/>

Defaults:
```php
'cors' => [
    'use' => true,
    'origin' => '*',
    'allowCredentials' => true,
    'maxAge' => 86400,
    'methods' => ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
    'headers' => ['Content-Type', 'x-access-token', 'x-domain-override']
]
```

## use

If you wish to allow CORS for your SPA website or to allow other sites to call your api.

## origin

The origin(s) to allow. By default, all are allowed when active.

## allowCredentials

Set the `Access-Control-Allow-Credentials` or not.

## maxAge

The maximum age of the cache duration for the preflight response.

## methods

What HTTP methods that can use CORS.

## headers

Headers allowed to be passed in a CORS request. By default, Sail sets `Content-Type`, `x-access-token` and
`x-domain-override`. The last 2 are SailCMS specific for authenticating a user and allowing to change the
domain of all email CTAs.