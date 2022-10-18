# Errors And Debugging

Sail offers many built in tools to help with development. For all uncaught or unforeseen errors, Sail provides
a nice looking, helpful error screen using the `Whoops` library.

When your code crashes, you should get something like this:

![Error Page](/error_page.jpg)

As you can see it dumps all server variables and environment variables. Now, don't panic, there is a blacklist
for environment variables to not show important things like api keys, passwords among other things. It shows up
in the following way:

![Safe Environment Variables](/env_safe.jpg)

You can easily configure what is hidden in the `config/security.php` file using the `envBlacklist` setting.


```php
<?php

$securitySettings = [
    // Hide these variables from being exposed in the $_ENV dump in the error manager
    'envBlacklist' => [
        'DATABASE_DSN', 'DATABASE_USER', 'DATABASE_PASSWORD', 'DATABASE_DB',
        'DATABASE_PORT', 'DATABASE_AUTH_DB', 'MEILI_HOST', 'SEARCH_ENGINE',
        'MEILI_PORT', 'MEILI_INDEX', 'MEILI_MASTER_KEY', 'SETTINGS'
    ]
];
```
This is the base security.php file provided with the install.

## Debugging

To debug your code you have 2 choices. You can use the basic `dd` or "dump and die" method but Sail provides a
more advanced version using `Debug::dd` to get the same result as just `dd` but also get the file and line where
you called it and also send the data to `Ray` if you have it activated.

## Ray

Ray is a software and library that helps you debug your code without loading it up with `print_r` and `echo` calls
everywhere. You can safely add a ray call or `Debug::ray` call in your code and it will safely send the data
over to ray if possible or do nothing if deactivated/unable to do it.

You can download Ray [here](https://myray.app/)