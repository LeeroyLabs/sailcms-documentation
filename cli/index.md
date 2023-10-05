# Commander <Badge type="tip" text="3.0.0" />

Commander is the name of SailCMS' CLI tool is a powerful tool to help you extends the system really rapidly and in a standard way. You probably need to add your own commands for things like migrations, custom scripts, cron jobs, etc. The SailCMS CLI tool is extensible
using CLI Commands that the CLI can help you create.

To get a list of existing commands, simply type

```bash
php sail list
```

## build:schema

This command creates an abstract syntax tree (AST) cache of the graphql schema to have superior
performance for graphql for production. 

:::warning
__Very important Note:__

If you are running SailCMS in Framework mode, add the `--hidecms=1` flag on this command to hide
the cms graphql queries and mutations from the AST.
:::

## create:

The `create:` group is a scaffolding tool to help you focus on code and not on how to create new
building blocks for your application. This group can create the following things:

- Basic authentication user/pass
- Command (CLI)
- Container
- Module
- Controller
- Migration
- Model
- Password
- Test

## db:migrate

This command will run migrations for your database. It can either run the migrations going to latest
version or you can specify if you want to start over or rollback to a version.

To start from scratch, just add the `seed` argument. To roll back to a specific version, just add
`rollback` and the version number to rollback to.

```shell
php sail db:migrate seed
```

```shell
php sail db:migrate rollback 2
```

## install:official

The recommended way to add official 1st party modules, containers, adapters or middlewares. This
is simpler than doing it manually. It will take care of everything required to just work and save
you time.

## run:

This executes things sometimes required for better performance or simply install SailCMS.

## run:install

Installs SailCMS to get you ready to go.

## run:indexing

This is used to index all of your entries to the search system. So even if you have a lot of content
and later on in your project's lifetime you choose to had search capabilities, you can easily index
all of your content without a sweat.

## run:queue

Executes the tasks that have been queue by your application. That can be any background tasks your
application requires.