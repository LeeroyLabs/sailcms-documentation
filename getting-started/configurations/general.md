# General

These are general configurations for SailCMS.

<br/>

Defaults:
```php
'devMode' => false,
'allowAdmin' => true,
'adminTrigger' => 'admin',
'timezone' => 'America/New_York',
'useBasicAuthentication' => false,
```

## devMode

This sets if the Sail is in development mode or not, that means if errors should be shown or not. 

## allowAdmin

This allows the `adminTrigger` to be set and respond when requested. This is sometimes disabled
in production to stop possible hack attempts or from modifications to be made on the production
server.

## adminTrigger

This determines the base url of the admin panel.

## timezone

Sets the timezone for all time related things

## useBasicAuthentication