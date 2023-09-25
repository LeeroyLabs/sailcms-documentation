# Form

Form is used to group form entries under the same type and to define settings specific to this form.

It's properties are `title`, `handle`, `fields` and `settings`.

`title` is the title of the form, for example: `Contact Form` or `Quote Form`.

`handle` is to link form entries.

`fields` are the fields used in the form. 

Most of the `settings` will default with [SailCMS mail settings](/getting-started/configurations/emails).
So it is not required to set them.

Defaults:
```php
public string $to = '';
public array $cc = [];
public array $bcc = [];
public string $success_email_handle = '';
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

The getAll, findAll, getDefaultType and getEntryModelByHandle public static methods are all read protected as well as the getById and getByHandle public methods.

# Form Entry

Form Entry are created when, in the settings of the form, the action DATABASE or BOTH is selected.

It has `form_handle`, `site_id`, `locale`, `trashed`, `template`, `dates`, `content` and `viewed` properties.

`form_handle` is the handle of the form which this entry is related. It's more for organizing entries, depending on the form.

`site_id` and `locale` serve to know which region or language of the entry.

`trashed` serve to let know if this entry has been `softdelete` if it's true, it is false by default.

`template` is the path to the email template that will be used the moment the form is submitted.

`dates` is set automatically when you create or delete a form entry.

The `content` is linked to the `fields` of the Form with a key and a simple object with a handle, type and the content.

`viewed` is to know if the form entry has been viewed in the admin and to filter.

### CRUD Methods

The getAll, findAll, getDefaultType and getEntryModelByHandle public static methods are all read protected as well as the getById public methods.