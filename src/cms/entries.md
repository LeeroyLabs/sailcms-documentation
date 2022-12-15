# Entries

SailCMS comes with models to help to structure your page contents. 
The models are the `Entry`, `EntryType` and the `EntryLayout`.

## Entry Type

The entry type is used to regroup the entries into the same type and in the same way,
to define the tables in the databases. Thereby, the entries of a blog type would be located
in the `blogs` table of the database.

An entry type is formed with a `title`, a `handle`, an `url_prefix` and a `entry_layout_id`. 
The `handle` is used to get the instance or to get the related Entry model. 

Here is a list of reserved words that are not allowed to create an Entry Type:

```php
const RESERVED_WORDS_FOR_HANDLE = [
    'entry',
    'entries',
    'entry_type',
    'entry_types',
    'entry_layout',
    'entry_layouts',
    'user',
    'users',
    'category',
    'categories',
    'asset',
    'assets',
    'config',
    'configs',
    'log',
    'logs',
    'tfa_data',
    'role',
    'roles',
    'email',
    'emails',
    'csrf'
];
```

> **Warning** Once the handle is set it can't be changed.

The `url_prefix`, a LocaleField, is used to form the url of the entries related to the type.
When it is updated, all urls of entries of this modified type will be updated too.

You can also assign an [entry layout](#entry-layout) to an entry type by passing his id. 

By default, SailCMS comes with an entry type named "Page".
If you want to change the default entry type, you can change it in the `general.php` config files.
The default handle cannot be changed

```php
use SailCMS\Assets\Transformer;

return [
    'dev' => [
        ...
        'entry' => [
            'defaultType' => [
                'title' => 'Page',
                'urlPrefix' => [
                    'en' => '',
                    'fr' => ''
                ]
                'entryLayoutId' => null 
            ]
        ]
    ...
```

### Utilities

Here is a list of utility notes to help you work with entry types.

#### Get Entry Model By Handle

An entry need an Entry Type to be queried at first.
If you create an Entry instance directly, you'll get the default entry type :
```php
$entryModel = new Entry();
```

So, if you want to get a model instance from an entry type, use this method:

```php
$entryModel = EntryType::getEntryModelByHandle('test');
```

#### CRUD Methods

The `createOne`, `updateByHandle` and `hardDelete` methods are all write protected with the Sail permissions system's.

When you update the `url_prefix` of an entry type, all urls of the related entries will be updated.
Also, when you delete an entry type an EntryException could be raised if there is existing related entries. 

The `getAll`, `findAll`, `getDefaultType` and `getEntryModelByHandle` public static methods are all read protected as well as
the `getEntryModel`, `getById` and `getByHandle` public methods. 
However, the `getAll`, `getDefaultType` and `getEntryModelByHandle` has a parameter ($api) to set to true to be protected.


The group of permission for the entry type is `entrytype` and stored in a class constant named `EntryType::ACL_HANDLE`.


## Entry Layout

The entry layout is a structure that helps to set and validate the contents of your entries.

It has `titles`, `authors`, `dates`, `is_trashed` and `schema` properties.
The `titles` properties are the title of entry layout for the display in the admin panel.
Like entry `authors` and `dates` are automatically sets when create, update and deleting an entry layout.
The `is_trashed` is obviously used in the delete method when it's a soft delete.

The `schema` properties in the structure of an entry content. 
The schema is a Collection of model fields that contains one or mode type fields and their settings.

> To fully understand the schema field components, check the [Fields page](/cms/fields).

### Utilities

Here is a list of utility notes to help you work with entry layouts.

#### Generate Layout Schema

The `generateLayoutSchema` static method is the best way to generate the schema for an entry layout.
You simply pass a list of model fields instance with a key to reuse it in the entry content.

```php
$textField = new TextField($labels, [
    ['required' => true,],
]);

$schema = EntryLayout::generateLayoutSchema(new Collection([
    'title' => $textField
]));
```

The schema return by that will be perfect to create or update an entry layout.

#### Update schema config

When you have queried your entry layout, you can use the `updateSchemaConfig` to update the settings of a field.
You just need to pass a `fieldKey`, the setting to update, a `fieldIndex` and if you want the labels of the field in the admin panel.

```php
$entryLayout->updateSchemaConfig('title', [
        'max_length' => 255,
        'min_length' => 10
    ], 0, new LocaleField([
        'fr' => 'Titre de section',
        'en' => 'Section title'
    ]));
```

#### Update schema key

Like the `updateSchemaConfig`, this public method is really useful to modify the schema. 
But now, it's to modify a key in the schem and it only need the `key` and a `newKey`.

```php
// The key will become subtitle
$entryLayout->updateSchemaKey('title', 'subtitle');
```

Obviously, all entry contents for each entry type will be updated in the same call.

#### CRUD methods

The `create`, `updateById`, `updateSchemaKey` and `delete` methods are all write protected with Sail permissions system's.

The `getAll` and `one` public method read protected as well.

## Entry

An entry is used to store content of a page for your site. 
By example, it can be the homepage, blogs, orphan pages, etc.

An entry have a `locale`, a `site_id` and an `alternates` properties to localized your entries. 
In the alternate field, you can set the related versions of your entry to generate easily the language switcher in your pages 
and the canonical urls.

It's possible to structure your entries with the `parent` attribute. 
This field takes an `EntryParent`, that needs a `type_handle` and `parent_id` attribute.
So, you can class all your entries in your site regardless of the type.

An entry has three different possible status `live`, `inactive` or `trash`. 
This way it's possible to make soft delete of entries. 

> **Warning** The status cannot be set to `trash` in the update method, you must use the delete method to do that.

For the contents fields, we have `title`, `slug`, `categories` and `content` attributes.

The slug can be *null* and it will be generated with the title of the entry. 
There is also a validation done on the slug to be sure that there is no other entry with the same value.
Automatically, we increment the slug with a number just to be sure that there are unique.  

The `categories` id are simply regrouped in a Collection that is used to filter the list of entries. 

The `content` is linked to the [Entry Layout](#entry-layout) with a key and a simple object with a `handle`, `type` and the `content`.
The `handle` is related to the [Model Field](/cms/fields#model-field) and helps to validate the content as well as the `type` value.
The `type` is issued from an enum named "StoringType":
```php
enum StoringType: string
{
    case INTEGER = 'integer';
    case FLOAT = 'float';
    case STRING = 'string';
    case BOOLEAN = 'boolean';
    case ARRAY = 'array';
}
```
Then, the `content` is sets accordingly to the `type`.

The two last attributes - `authors` and `dates` - are automatically sets when creating, updating and deleting an entry.
These attributes are useful to retrieve information about the life of your entry: 
when it was created and by whom, who and when it was deleted, etc.

### Utilities

Here is a list of utility notes to help you work with entries.

#### Homepage usage

The homepage is automatically stored in the configs table when you are creating, updating or deleting an entry.
To retrieve the homepage you should use `Entry::getHomepage()` with your site id and your locale. 
In the `create` and `updateById` methods, if the flag `isHomepage` is changed the configs will be updated accordingly. 

#### CRUD Methods

The `create`, `updateById` and `delete` methods are all write protected with the Sail permissions system's.

As it was said before, the homepage config is updated each time the `isHomepage` flag is used
as well as if you delete an entries with the `isHomepage` at *true*.

The `one`, `getCount`, `all` and `countEntries` public methods are not read protected because the entries are the content of a site.

These getter methods will only search on the Entry Type that is joined to the Entry constructor, not on all types.

The `findByUrl` and `findByCategoryId` static methods are not protected as well and on contrary will search in all entry types.