# Entry

Configure defaults for entries.
 
<br/>

Defaults:
```php
'entry' => [
    'defaultType' => [
        'title' => 'Page',
        'urlPrefix' => [
            'en' => '',
            'fr' => ''
        ],
        'entryLayoutId' => null
    ],
    'cacheTtl' => \SailCMS\Cache::TTL_WEEK,
    'seo' => [
        'defaultDescription' => 'SailCMS site',
    ]
]
```

## defaultType

Configures the default entry type for content. By default, we set it to `Page` with no URL prefix and no preset layout.

## cacheTtl

If using cache, the `time-to-live` value of the cache. By default, we set to 1 week.

## seo

The default description for entries.