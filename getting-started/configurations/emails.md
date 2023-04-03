# Emails

This is all related to the email system, including the Previewer.

<br/>

Defaults:
```php
'emails' => [
    'from' => 'no-reply@leeroy.ca',
    'fromName' => [
        'fr' => 'SailCMS',
        'en' => 'SailCMS'
    ],
    'usePreviewer' => false,
    'sendNewAccount' => true,
    'globalContext' => [
        // You can add your own static context variables
        'locales' => [
            'fr' => [
                'thanks' => 'Merci',
                'defaultWho' => "Quelqu'un que vous connaissez"
            ],
            'en' => [
                'thanks' => 'Thanks',
                "defaultWho" => 'Someone you know'
            ]
        ]
    ],
    'overrides' => [
        'allow' => false,
        'acceptedDomains' => [
            'localhost', 
            'localhost:5173',
            'localhost:3000'
        ]
    ]
],
```

## from

The email address to use when sending emails.

## fromName

The name to use in the `from` for emails.

## usePreviewer

Allow the use of the previewer. By default, it's allowed on all environments except production.

## sendNewAccount

Send an email when a new user account is created. This includes administrative accounts.

## globalContext

A global context that all emails have access to. You should use this for environment specific
variables. If you wish to have locale values (static text), you should use the locale files and
the twig function `__('path.to.your.string')`.

## overrides

This enables you to provide a special header called `x-domain-override` to your calls and when
an email is involved, the URL for yout call to action (button) will be changed to the given
domain in the override. The `acceptedDomains` is a security to not allow anybody other than
what is set here to be set. This is disabled by default on the production environment.