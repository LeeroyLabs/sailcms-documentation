# Database

This configuration is to enable the database to save the whole object on all updates instead of only what changed.

<br/>

Defaults:

```php
'database' => [
    'activerecord_save_whole_object' => false,
    'max_relationship_resolve_depth' => 3
]
```

## activerecord_save_whole_object

This indicates that when you run the `save` call, ignore changes to the object and resave the whole model. If set to
false, only the changed values will be saved.

:::warning
If you have this set to `false`, you will need to flag changes to objects and arrays by using the `setDirty` method
to flag that property has been changed.
:::

## max_relationship_resolve_depth

This indicates the limit of depth that the relationship system will resolve your relations before it stops doing it.
If this is set high, you might run into out of memory or timeouts issues in your application.