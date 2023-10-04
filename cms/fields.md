# Fields <Badge type="tip" text="3.0.0" />

TODO

## Entry Field

The layout system ([EntryLayout](/cms/entries#entry-layout)) uses the EntryField model to store field data into the database.

The `key` property must be unique and can be used to retrieve an instance.

The `type` property is used to define the usage of the field.

The `repeatable` property is a flag to specify the type of content in the Entry. 
If `true` the content will be treated as an _array_ otherwise, as the type of the field.

The `searchable` property is a flag to make the content available for the [Sail Search Engine](/search/index)

The `validation` property is a string that can contain all validations needed for your field. 
Each value must be separated by the pipe `|` character, and the [Validator](#validator) will use each value to validate the [Entry](/cms/entries#entry) content.
It's possible to add argument to the validation via the `configs` property of the fields.
For example, a "min" validation must be configured this way :

```php

```

### Utilities

TODO

#### CRUD METHOD

TODO

## Validator

TODO

### Domain

__key__: domain

To verify if a string is a domain.

#### Possible argument

__key__: tld

A boolean to tell if it's a top-level domain, default set to `true`

### Alpha and alphanum

__key__: alpha
__key__: alphanum

To verify if a string is alpha or alphanumeric.

#### Possible argument

__key__: extraChars

An array to add extra characters to the validation.

[//]: # (- alpha, alphanum : .)

[//]: # (- min : to verify that an integer or float value is minimum)

[//]: # (  - )

[//]: # (- max :)

[//]: # (- between :)

[//]: # (- postal :)

[//]: # (- phone :)

[//]: # (- date, time, datetime :)

[//]: # (- creditcard :)

[//]: # (- uuid :)