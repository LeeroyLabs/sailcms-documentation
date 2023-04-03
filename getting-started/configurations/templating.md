# Templating (TWIG)

Performance and compatibility settings for templates.

<br/>

Defaults:
```php
'templating' => [
    'cache' => false,
    'vueCompat' => false
]
```

## cache

Use caching for the templates? For heavy structured projects, this can be very useful to cache your html
pages.

## vueCompat

This changes the Twig tags to enable it to coexist with Vue,Svelte and other frontend frameworks.