# SEO <Badge type="tip" text="3.0.0" />

TODO

## Global SEO

TODO

## Entry SEO

The `EntrySEO` model is automatically created when an Entry is created regardless of the [Entry](/cms/entries#entry).

This model is based on a create or update method, so there will be only one EntrySEO by entry. 
In the same way, when an entry is deleted, the linked Entry SEO will be also deleted.

### Utilities

Here is a list of utility notes to help you work with entry seo.

#### CRUD METHOD

The `getByEntryId` method is read protected with the Sail ACL system.

The `getSEO`, that is implemented in the [Entry](/cms/entries#entry), use the method `getOrCreateByEntryId` that is 
read and written protected with the Sail ACL system.

The `createOrUpdate` and `deleteByEntryId` method is also written protected.