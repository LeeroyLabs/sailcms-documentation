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