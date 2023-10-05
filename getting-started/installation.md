---
description: Installing SailCMS
---
# Installation and Update

We have worked hard to make sure the installation process is as smooth as possible. This is why SailCMS 3
has been built in 2 parts. The Core project is a composer library, we'll get to what this means in a minute. 
The other part is what we call "userland" where you build your application without having the structure
of the cms in your way.

## install Sail using composer

```bash
you@yourhost: composer create-project leeroy/sailcms-app <yourfoldername>
```

This will install the `userland` part and the cms itself. From there you can run the installation 
process by using the following command:

```bash
you@yourhost: php sail run:install
```

Once this process is completed, you can go to your browser and load the default site. If you see
the welcome page, you are ready to go.

## Updating Sail

To update sail, it's as easy as using the very familiar

```bash
you@yourhost: composer update
```

## Running sail in Framework Mode

If you wish to use Sail's framework but you don't need or are reimplementing some of the things SailCMS already does (users for example). You can run Sail in Framework Mode. To do this, you can set the `hideCMS` key in the `graphql` section of your configuration file. Here is an example

````php
'graphql' => [
    'active' => true,
    'trigger' => 'graphql',
    'depthLimit' => 5,
    'introspection' => false,
    'hideCMS' => true // Set this to true to disable the CMS features
],
````

When you are ready to run your application on production, use the `build:schema` command from Sail's CLI. See the [Deploying](/getting-started/deploying) section for details.

