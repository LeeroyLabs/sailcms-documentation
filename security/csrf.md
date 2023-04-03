# CSRF Protection  <Badge type="tip" text="3.0.0" />

Cross-site request forgeries are a type of exploit where an unauthorized attacker can perform actions against a form from a 3rd party web page that might try to send malicious data to your server and bypass your frontend security measures and validations.

Having a one-time token that identifies the sender and validates if it was done in a timely fashion makes your form secure and guarantees that the user sending the form is the user that requested it and that he did so on your application.

SailCMS offers an easy solution for both tranditional applications and more modern single-page applications or SPAs.

## From TWIG

You can add the token to your form with a simple call using:

```twig 
{{ csrf() }}
```

This will add the following html to your page

```html
<input type="hidden" name="_csrf_" value="xxxxxxxxxxxxxxxxx" />
```

in this example, the series of x would be replaced by the token value.

## Security Note

By default, SailCMS will use the `_csrf_` name for the field in your html. But this can be set,
and we encourage you to set it to something else that is unique to your project.

## From SPA

At any moment in your application you request a token for the user using the `/v1/csrf` URL. This token is valid for a period of time of your choosing and is created for the specific user requesting it.

## Accessing Validity Flag

To check if the code is valid or not, which you should do when handling forms, use the `$_ENV['CSRF_VALID']` global variable. 

## Configuration

You set 2 things in releation to CSRF. the expiration time in seconds and the leeway, if any, to allow the token to still be valid for after expiration.

By default expiration is `120` seconds and leeway is `5` seconds. These configurations are in your `general.php` file in the `CSRF` index.