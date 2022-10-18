# Two-Factor Authentication

Two-Factor Authentication is currently one of the most popular ways to secure a user account on the web today. SailCMS
has world-class support for it. SailCMS supports the `SHA1` implementation to have the largest support from authentication
applications out there. As soon as some key players upgrade their apps, SailCMS will be moving to `SHA256`, which is more
secure. An option in the `env` file will allow you to choose to continue on with `SHA1` or move to `SHA256` to keep a 
good backwards compatibility.

Here is the supported features

- Prebuild, responsive UI
- Customization of button color and hover color (see Customizing section)
- Customization of Provider Label, duration and length (see Customizing section)
- Wide range of App support (using SHA1)
- Provides rescue codes if device is lost or changed.

SailCMS offers a fully managed way of enabling 2FA for your users. This is the recommended way of using it. There is
2 ways to implement it.

Here is what it looks like out of the box without any customization.

![Two-Factor Authentication - Step 1](/2fa.jpg)
![Two-Factor Authentication - Step 2](/2fa-2.jpg)

## Twig

If you are using the html templating, Twig, you have access to a function called `twoFactor` that will render the 
html and javascript required for it. Simply call it this way: <code v-pre>{{ twoFactor(user_id) }}</code>

`<user_id>` is the user's id in the database. This will link the 2FA secret to the user account.

## Headless

When using SailCMS in headless mode (Single Page App), you can create an iframe that loads 
`https://yoursite/v1/tfa/<locale>/<user_id>`

In this case `<locale>` represent the locale in which you want to present the UI. Supported are `fr` and `en`.

`<user_id>` is the user's id in the database. This will link the 2FA secret to the user account.

## Customizing

You can customize things for the two-factor authentication in your `config/<project>/general.php` file.

### issuer

This is the label you want to appear in the authenticator app. Generally, you would want the name of your application
to appear here. The account label will be filled in for you.

### whitelist

This is a list (separated by commas) of hosts that are allowed to load this page in an iframe. This is a form of security
to prevent other sites from hijacking this system.

### length

The length of the code to be generated the authentication app. The standard is 6.

### expire

The length of time (in seconds) that the code is valid for. The standard is 30 seconds. The system will allow for a small
window of time after the 30 seconds to still accept the code 

### format

This determines the image format for the QR code. Per default, SVG is preferable because of size and that it does not
require any extra libraries in your PHP setup. Any other format (jpg, png) requires to have the `imagick` extension
installed.

### main_color

This is the color of the button. By default, the button is blue (for tailwind users, blue-500).

### hover_color

This is the color of the button when you hover over it. By default, the button is dark blue (for tailwind user, blue-800).