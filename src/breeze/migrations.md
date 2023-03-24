# Migrations

Breeze supports database migrations to help teams build awesome projects without the headache of having to have the same
database. 

## First step

To create your first migration, go to the CLI and run the following command:

```sh
php sail create:migration
```

This will create `Migration_0001.php` in the migrations directory. You can run this command whenever you want to create
a new migration. Breeze will keep track of your current version when creating a new migration and when running migrations.

Once you are ready to run migrations (either one or many), you simply have to run this command in the CLI:

```sh
php sail db:migrate
```

This will detect your current version and run all subsequent migrations to get you up to date.

In the case that you want to run your migrations from scratch, you can add the `seed` argument to the `db:migrate`
command:

```sh
php sail db:migrate seed
```
In the case that you are running into problems and want to revert, you add the `rollback` argument to the `db:migrate`
command:

```sh
php sail db:migrate rollback
```

This will roll back to the previous version. If you provide a number after rollback, you can revert to the version you need.

```sh
php sail db:migrate rollback 3
```

This would roll back to migration 3.

## How to write a migration

Every migration has 2 methods, `up` and `down`. The `up` method is executed when running a migration. When you request
a rollback, the `down` method is executed.

Here is an example for the `up` method:

```php
public function up(): void
{
    // Add an index
    Migration\Schema::index('collection_name', [
        ['key' => ['fieldname1' => 1]], 
        ['key' => ['fieldname2' => 1]]
    ]);
    
    // Add a missing property to all documents that do not have it
    Migration\Schema::addIfNotSet('collection_name', 'fieldname3', 'value_here');
    
    // Rename a field
    Migration\Schema::rename('collection_name', 'original_name', 'new_name');
}
```

The `down` method should the opposite of what your up is doing. This enables the rollback feature.

## Available methods

### rename

Allows you to rename a field in all documents within the selected collection.

### add

Allows you to add a field in all documents within the selected collection.

### addIfNotSet

Allows you to add a field in all documents that don't have that field within the selected collection.

### remove

Allows you to remove a field in all documents within the selected collection.

### index

Allows you to create an index on the selected collection.

### dropIndex

Allows you to drop an index on the selected collection.

### addRecord

Allows you to add a record to given collection.

### removeRecord

Allows you to remove a record from the given collection.