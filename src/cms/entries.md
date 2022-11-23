# CMS

SailCMS comes with models to help to structure your page contents. 
The models are the `Entry`, `EntryType` and the `EntryLayout`.

## Entry Type

The entry type is used to regroup the entries into the same type and in the same way,
to define the tables in the databases. Thereby, the entries of a blog type would be located
in the `blogs` table of the database.

An entry type is formed with a `title`, a `handle` and an `url_prefix`. 
The `handle` is use to get the instance or to get the related Entry model. 
The `url_prefix` is used to form the url of the entries related to the type.

> **Warning** Once the handle is set it can't be changed.

By default, SailCMS comes with an entry type named "Page".
If you want to change the default entry type,
you can change it in the `general.php` config files.

```php
use SailCMS\Assets\Transformer;

$config = [
    'dev' => [
        ...
        'entry' => [
            'defaultType' => [
                'title' => 'Page',
                'handle' => 'page',
                'url_prefix' => ''
            ]
        ]
    ...
```

You can also assign an `entry type layout` to an entry type. (TODO)

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

The `getAll`, `getDefaultType` and `getEntryModelByHandle` public static methods are all read protected as well as
the `getEntryModel`, `getById` and `getByHandle` public methods.

The group of permission for the entry type is `entrytype` and stored in a class constant named `EntryType::ACL_HANDLE`.

## Entry

An entry is used to store content of a page for your site. 
By example, it can be the homepage, blogs, orphan pages, etc.

An entry have a `locale`, a `site_id` and an `alternates` attributes to localized your entries. 
In the alternate field, you can set the related versions of your entry to generate easily the language switcher in your pages.

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
TODO category.  
TODO content.  

The two last attributes - `authors` and `dates` - are automatically sets when creating, updating and deleting an entry.
These attributes are useful to retrieve information about the life of your entry: 
when it was created and by whom, who and when it was deleted, etc.

### Utilities

Here is a list of utility notes to help you work with entries.

#### Homepage usage

The homepage is automatically stored in the configs table when you creating, updating or deleting an entry.
To retrieve the homepage you should use `Entry::getHomepage()` with your site id.