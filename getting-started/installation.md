---
description: Installing SailCMS
---
# Installation and Update

We have worked hard to make sure the installation process is as smooth as possible. This is why SailCMS 3
has been built in 2 parts. The Core project is a composer library, we'll get to what this means in a minute. 
The other part is what we call "userland" where you build your application without having the structure
of the cms in your way.

## install Sail using composer

```shell
composer create-project leeroy/sailcms-app <yourfoldername>
```

This will install the `userland` part and the cms itself. From there you can run the installation 
process by using the following command:

```shell
php sail run:install
```

Once this process is completed, you can go to your browser and load the default site. If you see
the welcome page, you are ready to go.

## Updating Sail

To update sail, it's as easy as using the very familiar

```shell
composer update
```