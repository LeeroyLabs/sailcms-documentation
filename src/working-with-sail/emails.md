# Emails

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
