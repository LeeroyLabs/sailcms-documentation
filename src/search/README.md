# Search
SailCMS offers a unified search engine that is based on adapters. Out of the box we offer the
__database__ adapter. We also offer __MeiliSearch__, __Algolia__ and __ElasticSearch__ support using
first-party packages.

To enable the search system, set the value of the adapter to use in your `.env` file.

```dotenv
SEARCH_ENGINE=database
```

If you do not set a value or the variable does not exist, SailCMS will assume `database`.

## How to use the search engine

The search system offers 6 methods for you to use.

### search

This enables you to search the current adapter's database for what you are looking for. You can provide metadata for 
your search. But depending on your adapter it might or might not be used for your search.

### store

This enables you to store a document in your adapter's database. This can then be queried.

__NOTE__: SailCMS automatically store's your entries in the search system for free. You do not need to do anything
except use the search to unlock this great feature.

### remove

You can remove content from the adapter's database when you do not need it anymore or the original content is being
deleted.

__NOTE__: SailCMS also does this automatically for you when you manage your entries.

### execute

This enables you to execute some adapter specific methods if they exist and are allowed.

### getRawClient

This returns the Adapter's underlying client to the service or database. This can enable you to do more
advanced things that the search system simply does not do or handle.

### getAdapter

This returns the adapter being used to perform tasks. This is the class that the search wrapper uses to do all it's calls.

## Architecture

As a frame of reference, this is the way the system is built:

![Lifecycle](/search.jpg)

## Adapters

### MeiliSearch
The SailCMS team offer an official composer package to provide MeiliSearch support for the SailCMS search
engine. To read on how to install the package, please visit
[the package's github page](https://github.com/LeeroyLabs/sail-meilisearch)

### Algolia
TODO

### ElasticSearch
TODO

### Local Database

SailCMS comes bundled with the locale database adapter for search. 

