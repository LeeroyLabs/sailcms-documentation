# Emails <Badge type="tip" text="3.0.0" />

SailCMS comes bundled with a sweet and easy way to use emails in your application, built on top of Symfony's great
Mailer library. SailCMS comes with the SMTP and Sendgrid packages preinstalled. If you need any other provider, please 
refer to the following table to install your adapter.


| Provider           | SMTP DSN | Package |
| ------------------ | -------- | ------------------ |
| Amazon SES         |    ses+smtp://USERNAME:PASSWORD@default      | symfony/amazon-mailer |
| Gmail              |    gmail+smtp://USERNAME:PASSWORD@default      | symfony/google-mailer |
| Mailchimp Mandrill |      mandrill+smtp://USERNAME:PASSWORD@default    | symfony/mailchimp-mailer |
| Mailgun            |   mailgun+smtp://USERNAME:PASSWORD@default      | symfony/mailgun-mailer |
| Mailjet            |      mailjet+smtp://ACCESS_KEY:SECRET_KEY@default    | symfony/mailjet-mailer |
| Postmark           |     postmark+smtp://ID@default     | symfony/postmark-mailer |
| Sendgrid   |     sendgrid+smtp://KEY@default     | Preinstalled |
| Sendinblue         |    sendinblue+smtp://USERNAME:PASSWORD@default      | symfony/sendinblue-mailer |
| OhMySMTP           |        ohmysmtp+smtp://API_TOKEN@default  | symfony/oh-my-smtp-mailer |

Once your preferred provider's package is installed. Simply use it's DSN for the mail system to detect what provider
it is and load it's related class.

SailCMS offers all possible methods to setup your email and send it without beating yourself over the head with it.

Here is an example of an HTML email with an attachment and embedded image:

```php
$email = new Mail();

$context = new Collection([
    'key' => 'value of the key'
]);

$email->from('john@website.com')
      ->to('target@mail.com')
      ->cc('otherguy@email.com')
      ->subject('This is a cool email!')
      ->attach('local://my-super-file.txt', 'my-super-file')
      ->embed('local://my-embed-image.jpg', 'embed-image')
      ->priority(Mail::PRIORITY_HIGHEST)
      ->template('email', $context)
      ->send();
```

A few things to note. Regarding `embed` and `template`.

`embed` second argument is the name of the file to use in your template. Use `cid:<name-of-file>` as the src of the image
in your template.

`template` requires you to only give the path and filename with the application's template directory. This will render
your view using Twig. You do not have to explicit give the extension `.twig` it will be added for you.

## Email Management System

SailCMS offers a email management system that enables you to create emails using Twig templates and setting your own
content in it.

It offers a title, text, cta and cta link. If you want you can add (using code) more variables in your templates.

SailCMS also being a multi-language supporting system, offers a way to translate static content in your template. You
can add any amount of translations in your app's `config/general.php` file.

```php
'emails' => [
    'from' => 'no-reply@yoursite.com',  // Email used for the "from"
    'fromName' => [                     // Name of the sender
        'fr' => env('MAIL_FROM_FR'),
        'en' => env('MAIL_FROM_EN')
    ],
    'sendNewAccount' => false,          // Send email on account creation?
    'globalContext' => [
        // You can add your own static context variables
        'locales' => [
            'fr' => [
                // Add static french key/value pairs
            ],
            'en' => [
                // Add static english key/value pairs
            ]
            // You can add more languages, depending on what you support
        ]
    ],
    'overrides' => [    // allow for x-domain-override header
        'allow' => true,
        'acceptedDomains' => [  // Allowed domains and ports
        'localhost', 
        'localhost:5173', 
        'localhost:3000'
        ]
    ]
]
```

All variables (and locales) will be automatically processed in the template upon rendering.

### useEmail

The `useEmail` method is the ultimate tool for sending emails. You specify what template from the database to use, the
language for it and whatever context data you want. In the context, you can speficy the `replacements` index and within
that array, the keys will be replaced in email's data (subject, content, cta, cta title), that enables your emails to support
things like `{your_variable}` with the value within the `replacements` array. Here is an example of that.

It's important to know that your emails can enjoy the same power as your web templates. The email system supports Twig
for templating.

```php
$context = [
    'replacements' => [
        'my_variable' => 'Hello World!'
    ],
    'name' => 'Your Name'
];

$mail = new Mail();
$mail->to($email)->useEmail(
    'template_name_from_db', // slug created from the name given on creation
    $locale,                 // The locale to use for the email (fr, en, etc.)
    $context                 // your extra variables (context)
)->send();
```

the third argument is your custom context for Twig. It will be merged to the system context and config context to form
a `SuperContext` will of the variables available to the template.

## Preview Emails

SailCMS offers a url to test your emails without having to run the code that generates them. You
can call the `/email-preview/{email_slug}/{locale}`. If you do nothing else, the preview will be
rendered with Sail's default rendering values. But luckily, Sail allows you to register preview handlers
to handle each preview and provide more context to the previewer.

To register a preview handler, call the `Mail::registerPreviewHandler` method. This method expects you
to provide what template is handled and what will handle it.

When that template is being previewed, your handler will be called and provided the current context. From
here, you can add or change the context object and return a `MailPreviewData` instance. This object
enables you to set the new context variable and different template if you want.