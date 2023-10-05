# Navigations

Navigations help you to create navigations for your website.

A navigation is formed with a `title`, a `slug`, a `structure`, a `locale` and a `site_id`.
The `slug` is always unique.

`site_id` and `locale` serve to know which region or language of the entry.

`structure` ...

### Utilities

#### CRUD Methods

The `create`, `update`, `delete` and `deleteByName` methods are all write protected with the Sail ACL system.

The `getBySlug`, `getById` and `getList` public static methods are all read protected.

However, the `getBySlug`, `getList` and `getById` methods have a special parameter to enable the read protection
in case it is required. It's called `api` and is a boolean.

The group of permission for the task is `navigation`.