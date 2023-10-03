# Fields <Badge type="tip" text="3.0.0" />

TODO

## Entry Field

The layout system ([EntryLayout](/cms/entries#entry-layout)) uses the EntryField model to store field data into the database.

The `key` property must be unique and can be used to retrieve an instance.

The `type` property is used to define the usage of the field.

The `repeatable` property is a flag to specify the type of content in the Entry. 
If `true` the content will be treated as an _array_ otherwise, as the type of the field.

The `searchable` property is a flag to make the content available for the [Sail Search Engine](/search/index)

The `validation` property is a string that can contain all validation needed in your field. 
Each value must be separated by the pipe `|` character, and the [Validator](#validator) will use each value to validate the [Entry](/cms/entries#entry) content.


### Utilities

#### CRUD METHOD

## Validator

Here is the list of cases that implemented in the Validator:
- domain :
- alpha, alphanum :
- min :
- max :
- between :
- postal :
- phone :
- date, time, datetime :
- creditcard :
- uuid :