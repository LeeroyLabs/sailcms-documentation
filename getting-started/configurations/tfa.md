# Two-Factor Authentication

Settings to customize the way Sail generates and manages your 2FA codes. Also you can change a few things 
for the UI to match your applications' ui.

<Br/>

Defaults:
```php
'tfa' => [
    'issuer' => 'SailCMS',
    'whitelist' => 'localhost,leeroy.ca',
    'length' => 6,
    'expire' => 30,
    'format' => 'svg',
    'main_color' => '',
    'hover_color' => ''
]
```

## issuer

Who is issuing the 2FA key. Normally, you would want your application's name here.

## whitelist

The allowed domains to load the UI for the 2FA to be displayed. This is important to be set to
only the domains you use.

::: danger
Again, this is very important to the security of all your users for you to set this to only the domains
you are using.
:::

## length

The length of the generated code. Standard is 6.

## expire

The lifetime of the code. Standard is 30 seconds.

## format

The format to generate the QR code in. `svg` is the lightest way to go. You can also use `png` and `jpg`.

## main_color

The main color to use for the UI.

## hover_color

The hover color on the buttons in the UI.