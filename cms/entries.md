# Entry <Badge type="tip" text="3.0.0" />

SailCMS comes with models to help structure your page contents.
The models for the content are the `EntryType`, `EntryLayout`, `EntrySeo` and `Entry`.
There is also the `EntryVersion` model for versioning and the `EntryPublication` for publishing your entries.

## Entry Type

The entry type is used to regroup the entries into the same type and in the same way,
to define the tables in the databases. Thereby, the entries of a blog type would be located
in the `blogs` table of the database.

An entry type is formed with a `title`, a `handle`, an `url_prefix` and a `entry_layout_id`.
The `handle` is used to get the instance or to get the related Entry model.

This is the list of reserved words that are not allowed to create an Entry Type:

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

<br/>

::: warning
Once the handle is set it can't be changed.
:::
> 
<br/>

The `url_prefix` field is a LocaleField, an object that looks like this:

```php
{
    "fr": "Bonjour le monde!",
    "en": "Hello World!",
    "es": "Hola Mundo!"
}
```

In this specific case, that object contains all versions of url prefix:

```php
{
    "fr": "produits",
    "en": "product",
    "es": "productos"
}
```

This is used to build every entry's url. It's related to the type, using the base url for that type (if any) and also
use its parent url as the base (if any). Something like this:

```
Base is /blog 
content would be /blog/the-title-of-your-article

Parent is article hello-world, 
content would be /blog/hello-world/update-to-the-breaking-story
```

At any point, if you change the base url or the parent's url, your content's url will be updated accordingly.

You can also assign an [entry layout](#entry-layout) to an entry type by passing its id.

### Changing the default Entry Type

By default, SailCMS comes with an entry type named `Page`.
If you want to change the default entry type, you can change it in the `general.php` config files.
__The default handle cannot be changed.__

In your configuration file, look for the `defaultType` section.

```php
...
    'entry' => [
        'defaultType' => [
            'title' => 'Page',
            'urlPrefix' => [
                'en' => '',
                'fr' => ''
            ],
            'useCategories' => false,
            'entryLayoutId' => null 
        ]
    ]
...
```
<br/>

::: warning
The entry type is not updated with the settings values, these parameters must be saved at the initialization of the project.
:::
>
<br/>


### Utilities

Here is a list of utility notes to help you work with entry types.

#### Get Entry Model By Handle

To get the appropriate model for your Entry type, you must hint SailCMS as to what you want. For example if you simply
instantiate the `Entry` model, like this

```php
$model = new Entry();
```

SailCMS will return the default type, `Page`. But if you know what type of content you want, you can use the convenience
method:

```php
$model = EntryType::getEntryModelByHandle('your_type');
```

#### CRUD Methods

The `createOne`, `updateByHandle` and `hardDelete` methods are all write protected with the Sail ACL system.

::: info
When you delete an entry type, an EntryException could be raised if there are existing related entries.
:::
> 
The `getAll`, `findAll`, `getDefaultType` and `getEntryModelByHandle` public static methods are all read protected as well as
the `getEntryModel`, `getById` and `getByHandle` public methods.

However, the `getAll`, `getDefaultType` and `getEntryModelByHandle` methods have a special parameter to enable the read protection
in case it is required. It's called `api` and is a boolean.

The group of permission for the entry type is `entrytype`.


## Entry Layout

an Entry Layout is a structure that sets and validates the content set in the entries that are using it.

It has `titles`, `authors`, `dates`, `is_trashed` and `schema` properties.

The `titles` property is the title of the layout that is used to display the name of it in the admin panel.

`authors` and `dates` are set automatically when you create/update/delete an entry layout.

The `is_trashed` property is an indicator if the layout has been deleted. This of course is a soft delete. A hard delete
would remove it from the database forever.

The `schema` property is a representation of the available field tabs and their configurations for the specific layout.

::: info
To have a better understanding of the schema field components, check the [Fields page](/cms/fields).
:::

### Utilities

Here is a list of utility notes to help you work with entry layouts.

#### Get Entry Fields

There is several method to get [Entry Field](/cms/fields#entry-field) from a schema.

The `getFieldInSchema` static method get an Entry Field by his key. 

The `getEntryFieldIds` static method return all Entry Field of a Collection of Entry Layout.

The `fetchFields` static method is used to populate Entry Field object in the schema. Then, when you look at the schema 
all the data of the fields are accessible.

#### Has entry types

The `hasEntryType` static method is useful to tell if an entry layout is used by an entry types. 
It checks that assertion for a Collection of Entry Layouts

#### Count used entry field

The `countUsedEntryField` static method allow to count the usage of an [Entry Field](/cms/fields#entry-field) with his id.

#### CRUD methods

The `create`, `updateById`, `deleteManyByIds`, `restoreMany` and `delete` methods are all write protected with the Sail ACL system.
On the other-hand, the `getAll`, `bySlug` and `one` public methods are read protected.

## Entry

An entry is used to store data for a piece of content in your application. We do not refer your content to pages because
SailCMS can be used to create things like one-off pages like contact or pages, blog articles, product pages or any other
type of content your application needs. It can handle anything that has content or media.

All entries have a `locale`. `site_id` and `alternates` properties to localized them.
In the alternate field, contains the alternate entry ids for the same content, this way, you can easily refer to the
alternate content, with something like a language switcher, without having to do any more work.

It's possible to structure your entries with the `parent` attribute.
This field takes an `EntryParent`, that needs a `type_handle` and `parent_id` attribute.

So, you can organize all your entries in your site regardless of the type.

An entry has a `trashed` status. That means that when it's true, this is what we call `soft delete`.
The content is trashed to the cms and will not respond to user accessing the url.
But in reality, the content still exists in case you ever change your mind.

For content fields, they have `title`, `template`, `slug`, `categories` and `content` properties.

If the slug is set to `null`, Sail will generate one out of the title. There is also a validation performed on the slug
to make sure that there is no duplicates. If there is ever a duplicate, we will increment a value and add it to the end
of the slug. For example, if `my-page` already exists, Sail will set `my-page-2`.

The `categories` is a list of ids that is used to filter the list of entries.

The `content` is linked to the [Entry Layout](#entry-layout) with a key and a simple object with a `handle`, `type` and the `content` :
- The `handle` is related to the [Model Field](/cms/fields#model-field) and helps to validate the content as well as the `type` value.
- The `type` is issued from an enum named "StoringType".

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
- Finally, the `content` could be parsed accordingly to the `type`.

The two last attributes - `authors` and `dates` - are automatically sets when creating/updating/deleting an entry.
These attributes are useful to retrieve information about the entry's editing history. It will tell you who created it,
when he created it, when it was changed or deleted, etc.

### Utilities

Here is a list of utility notes to help you work with entries.

#### Homepage usage

The homepage is automatically stored in the configs table when you are creating, updating or deleting an entry.
To retrieve the homepage you should use `Entry::getHomepage()` with your site id and your locale.
In the `create` and `updateById` methods, if the `isHomepage`, `locale` or `siteid` fields
are changed the homepage settings will be updated accordingly.

#### Using a middleware

It is possible to hook the entry model with a middleware to intervene before the save, update and delete methods.

```php
class TestMiddleware implements AppMiddleware
{

    public function type(): MiddlewareType
    {
        return MiddlewareType::ENTRY;
    }

    public function process(Data $data): Data
    {
        switch ($data->event)
        {
            case Entry::BeforeCreate:
                if ($data->data['title']) {
                    $data->data['title'] .= '-middleware-create';
                }
                break;

            case Entry::BeforeUpdate:
                if ($data->data['title']) {
                    $data->data['title'] .= '-middleware-update';
                }
                break;

            default:
                break;
        }

        return $data;
    }
}
```

So, all data send in the create and update method can be updated before the actual operation.

#### Post save, update and delete events

To hook itself the after the entry save, events way has been chosen.
There are three constant in the entry model, to get entry events:

```php
public const EVENT_DELETE = 'event_delete_entry';
public const EVENT_CREATE = 'event_create_entry';
public const EVENT_UPDATE = 'event_update_entry';
```

To register an event in a container is simple as this:
```php
public function events(): void
    {
        Event::register(Entry::EVENT_CREATE, self::class, 'entryPostCreate');
...
```

Then, the entry is accessible like that:
```php
public function entryPostCreate($event, $data) {
        /**
         * @var Entry $entry;
         */
        $entry = $data['entry'];
        print_r($entry->url);
    }
```

#### CRUD Methods

The `create`, `updateById` and `delete` methods are all write protected with the Sail ACL system.

As mentioned before, the homepage setting is updated each time the `isHomepage` flag is provided in the update
as well as if you delete an entry with the `isHomepage` set to *true*.

The `one`, `getCount`, `all` and `countEntries` public methods are not read protected because the entries are the public
content of the application.

These getter methods will only search on the Entry Type that is joined to the Entry constructor, not on all types.

The `findByUrl` and `findByCategoryId` static methods are also public and opposite to the getter methods, this will search
in all entry types.

## Entry Version

The versioning system use this model to store the entry at creation and on each update.
Then, it's possible to apply any version except the current version.

There is no possibility to update an entry version for obvious reasons and
when an entry is deleted, all related versions are deleted.

### Utilities

Here is a list of utility notes to help you work with entry versions.

#### Get methods

The `getById`, `getVersionsByEntryId` and `getLastVersionByEntryId` are all read protected with the Sail ACL system.

#### Apply a version

The `applyVersion` method is written protected with the Sail ACL system.
By only passing the entry version id, the related entry will be updated with the new version.

::: warning
If the entry version id is the same as the last version, there will be an Exception because we forbid to apply the current version.
:::
 
## Entry Publication

When your entry is ready for the public, you need to publish it. This is where entry publications come in.
Obviously, a publication has a `dates.published` date and can have an `dates.expired` date.

There is only one entry publication per entry, so when we create a new publication, all others publications are deleted.
And it's why there is no update possible on entry publication.

### Utilities

Here is a list of utility notes to help you work with entry publications.

#### CRUD methods

The `create` method, which is called by the entry model via the `publish` method, is written protected with the Sail ACL system.

The `deleteAllByEntryId` method, which is called among others process by the `unpublish` method, is also written protected.