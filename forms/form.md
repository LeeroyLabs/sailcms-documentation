# Form

Form is used to group form entries under the same type and to define settings specific to this form.

## Settings

Most of the settings (except entry_title) will default with [SailCMS mail settings](/getting-started/configurations/emails).
So it is not required to set them.

Defaults:
```php
public string $to = '';
public array $cc = [];
public array $bcc = [];
public string $success_email_handle = '';
public string $entry_title = '';
```

#### to

This sets where you want the email to be sent.

#### cc

This sets an array of email to be in CC

#### bcc

This sets an array of email to be in BCC

#### success_email_handle

This determines which success email to send after each form submit.

#### entry_title

The only option that don't default with SailCMS. This sets the title of each entry of the form.
You can add values from the fields in the title by using `{keyOfTheField}`.

### CRUD Methods

The getAll, findAll, getDefaultType and getEntryModelByHandle public static methods are all read protected as well as the getEntryModel, getById and getByHandle public methods.