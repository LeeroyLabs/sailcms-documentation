# CMS

SailCMS comes with models to help to structure your page contents.

## Entry Type

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

Here is a list of utilities to help you work with entry type

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
