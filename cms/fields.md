# Fields <Badge type="tip" text="3.0.0" />

TODO front point of view ?

## Entry Field

The layout system ([EntryLayout](/cms/entries#entry-layout)) uses the EntryField model to store field data into the database.

The `key` property must be unique and can be used to retrieve an instance.

The `type` property is used to define the usage of the field.

The `repeatable` property is a flag to specify the type of content in the Entry. 
If `true` the content will be treated as an _array_ otherwise, as the type of the field.

The `searchable` property is a flag to make the content available for the [Sail Search Engine](/search/index)

The `required` property is obviously the flag to specify is a field is required!

The `validation` property is a string that can contain all validations needed for your field. 
Each value must be separated by the pipe `|` character, and the [Validator](#validator) will use each value to validate the [Entry](/cms/entries#entry) content.
It's possible to add argument to the validation via the `config` property of the fields.
For example, a "min" validation must be configured this way :

```php
(new EntryField())->update("ID", new Collection([
    'validation' => 'min',
    'config' => ['min' => -10]
]));
```

Note on the `config` property, in addition to the validator configuration, you can pass any configuration you need in your admin templates.
Plus, the `label`, `placeholder` and `explain` properties are also for the admin templates. 

### Utilities

Here is a list of utility notes to help you work with entry fields.

#### Validate a key



#### Get fields for a matrix field

#### CRUD METHOD

The `getByKey`, `getById` and `getList` methods are all read protected with the Sail ACL system.

While the `create`, `update`, `deleteByIdOrKey` and `deleteManyByIds` methods are write protected.

# Validator

TODO

## Simple validation list

### Boolean
### Email
### Url
### Ip
### Integer
### Float
### Numeric
### Id
### Hex color
### Directory
### File
### Postal Code
### Zip
### Country Code
### Html

## Validation with arguments list

### Domain

__key__: domain

To verify if a string is a domain.

#### Possible argument

__key__: tld

A boolean to tell if it's a top-level domain, default set to `true`

### Alpha and alphanumeric

__key__: alpha
__key__: alphanum

To verify if a string is alpha or alphanumeric.

#### Possible argument

__key__: extraChars

An array to add extra characters to the validation.

### Min

__key__: min

To verify if a numeric value is greater than a _min_ value.

#### Possible argument

__key__: min

To specify a minimum value, default `-INF` (see [Php Math Constants](https://www.php.net/manual/en/math.constants.php)).

### Max

__key__: max

To verify if a numeric value is lower that a _max_ value.

#### Possible argument

__key__: max

To specify a maximum value, default `INF` (see [Php Math Constants](https://www.php.net/manual/en/math.constants.php)).

### Between

__key__: between

To verify if a numeric value is between a _min_ and a _max_ value.

#### Possible argument

__keys__: max, min

To specify a minimum and a maximum values, same default values.

### Postal and phone

__key__: postal

To verify if a string is a postal code or a phone number, according to a country. 

#### Possible argument

__key__: country

To specify the postal code or phone number format according to a country array, default `all`. 
Note: the default is a string, but if you use it, put an array of country value like that :

```php
(new EntryField())->update("ID", new Collection([
    'validation' => 'postal',
    'config' => ['country' => ['US', 'IN']]
]));
```

### Date

__key__: date

#### Possible argument

### Time

__key__: time

#### Possible argument

### Datetime

__key__: datetime

#### Possible argument

### Credit card

__key__: creditcard

#### Possible argument

### Uuid

__key__: uuid

#### Possible argument