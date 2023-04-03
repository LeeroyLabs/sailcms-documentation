---
description: Configuring SailCMS
---
# Configuration

SailCMS uses the widely supported `.env` file format for sensitive variables and general settings. This is the `.env` file
generated at install time.

```dotenv
ENVIRONMENT=dev
DEBUG=off

SITE_URL=http://localhost

# Composer location
COMPOSER_LOCATION=/usr/local/bin/composr

# Output Compression
USE_COMPRESSION=false

# Queue System
QUEUE_MAX_PROCESS_PER_RUN=all
QUEUE_MAX_RETRY=3

# Database
DATABASE_DSN="mongodb://localhost:27017/sailcms"
DATABASE_DB=sailcms

# Caching
CACHE_USE=false
CACHE_USER=""
CACHE_PASSWORD=""
CACHE_HOST=tcp://localhost:6379
```

## Accessing Environment Variables

Within your code if you need to access any of your `.env` variables, you can use the globally accessible `env` method.

```php
env('debug', 'off');
```

This would load the value from your `.env` file or provide `off` as the value if not it's not set in your `.env`.

## Accessing General Configuration values

Accessing general settings from your `config/general.php` file is also as trivial as the `env` method using the `setting`
method that is also globally accessible.

```php
setting('path.of.your.config', 'default_value');
```

Like `env`, `setting` enables you to set a default value if no value is present in your `config/general.php` file.

## Storing General Settings from your app

If you want to have some arbitrary settings saved to the database, SailCMS comes with a `Config` model that can store
that for you. If your data is sensitive, you can request for it to be encrypted before saving.

```php
// Unencrypted store
Config::setByName('your_setting_name', [...]);

// Encrypted store
Config::setByName('your_setting_name', [...], true);
```

When using `getByName` it will detect if the data is encrypted and decrypt it for you.

## General Configurations

As you probably have seen, you a have a 3 configuration files in your `config` folder, 1 for each
environment. Instead of having 3 huge files for configurations, we opted for a great quality of life
improvement which only requires you to set the configurations you wish to change and not what uses the
default values.

This way, your configuration files will probably be almost empty for each environment. Please look at the
subsections for each configuration categories.

::: warning
As you can set only what you are changing, you must know that if you set configuration for something with
a value of array, you need to implement that whole array, otherwise, you will be missing crucial
configuration that could destabilize Sail. Here are 2 examples, one that implements a scalar value
and one that implements an array value.

```php
'emails' => [
    'from' => 'no-reply@yoursite.com',
    'fromName' => [
        'fr' => 'Votre Site',
        'en' => 'Your Site'
    ]
],
// more config
```
This example shows that you are only changing 2 of the 6 main properties of the `emails` configuration.
The above example is correct.

```php
'emails' => [
    'from' => 'no-reply@yoursite.com',
    'fromName' => [
        'en' => 'Your Site'
    ]
],
// more config
```

If you configure the `fromName` array with missing pieces, the system will not work properly and maybe
even crash if you do not provide the missing information. This is what we mean by implement all properties
of an array you are setting. The above example is incorrect.

:::