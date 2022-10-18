# Logging

SailCMS offers powerful and flexible logging with a thin layer over __Monolog__ that allows you to log to virtually
anything you can think of. Out of the box, SailCMS provides 3 adapters. Database, Local file and Datadog.

If you don't already know, Monolog supports logging to many places at the same time with log bubbling. You have multiple
adapters at the same time.

## Configuring one or two or three

If you take a look into your project's configuration file in `config/<project_name>/general.php`, you should see this

```php
'logging' => [
    'useRay' => true,
    'loggerName' => 'sailcms',
    'adapters' => [
        \SailCMS\Logging\Local::class
    ],
    'datadog' => [
        'api_key_identifier' => 'DD_DEFAULT_KEY'
    ],
    'minLevel' => \Monolog\Level::Debug,
    'bubble' => true
]
```

By default, we enable the local file only. But you can easily add any existing adapter like this:

```php
'adapters' => [
    \SailCMS\Logging\Local::class,
    \SailCMS\Logging\Database::class
],
```

If you want to use third party adapters, The monolog repository has a vast list of 3rd party adapters. They are all
compatible with SailCMS. The ones that need configuration before usage, you must load them in a container or module
before loading them to the Log class.

For example:

```php
$handler = new Your3rdPartyHandler('...config here...');
Log::addAdapter($handler);
```

If your adapter does not require configuration like the provided adapters. You can add them directly to the `adapters`
array in your `general.php` configuration file.

You also have the option of building your own and loading it like the provided adapters or do it manually like the 3rd
party adapters.

## Datadog

The Datadog adapter requires you to configure the `datadog` array in your `general.php` configuration file. You need
to specify the key to use from the `.env` file. The reason we do not set the key directly in the config file is because
that config file is surely versioned with git. Saving credentials in git would be a big mistake. With the nature of
`.env` files not being versioned in git, saving it to this file is the safest way to proceed.

Take this example:

```php
'datadog' => [
    'api_key_identifier' => 'DD_DEFAULT_KEY'
],
```

Means that SailCMS expects the `.env` file to have a key named `DD_DEFAULT_KEY` like the following:

```dotenv
DD_DEFAULT_KEY=xxxxxxxxxxxxxxxxxxxxxxx
```

## Local file & Database

These 2 adapters do not require any action from you to work.

## Types of log

You have 8 levels of log, from lowest to highest priority: debug, info, notice, warning, error, critical, alert, emergency.

Each level has it's own method in the Log class.

```php
Log::debug('your message here', ['context_to_your_log' => 'value']);
Log::warning('your message here', ['context_to_your_log' => 'value']);
Log::criticial('your message here', ['context_to_your_log' => 'value']);
```

### Note

The Datadog adapter expects to have a special variable in your log's context array. That variable is `channel`. This is
specific to datadog and will populate the "source" field in Datadog.