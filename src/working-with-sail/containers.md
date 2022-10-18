# Containers

Containers are the components that make up an application. Each container is responsible for providing
it's related routes, controllers and search settings.

You recommend creating your container using the SailCMS CLI tool by calling:

```bash
php sail create:container <containerName>
```

The following is an example of an empty container.

```php
<?php

namespace Spec;

use SailCMS\Types\ContainerInformation;
use SailCMS\Blueprints\AppContainer;
use Spec\Controllers\Spec;

class Container extends AppContainer
{
    public function info(): ContainerInformation
    {
        return new ContainerInformation(name: 'Spec Container', sites: ['*'], version: 1.0, semver: '1.0.0');
    }

    public function routes(): void
    {
    }

    public function configureSearch(): void
    {
    }
    
    public function cli(): Collection
    {
        return new Collection([]);
    }
}
```

What is declared in the `info` method is the name of the container, on what sites its loaded, it's float
value version (ex: 1.0) and it's semver version (ex: 1.2.12).

If you provide `['*']` that means it's loaded on all sites. If you want to load only on one site in
particular, provide the name of the site. Something like `['sitename']`. The name needs to match what has 
been set in `app.env.php` file.

The `routes` method will be explained in the next page. The `configureSearch` method is explained in the 
[Search](/extend-sail/search) page.

We recommend using the SailCMS CLI application to generate your containers to make sure everything
required to make it work is done for you. If you wish to do it manually you need to know the following:

Every container must have its own directory and have a `Container.php` file. That file needs to be a `PSR-4`
valid namespace and class name. You need to extend the `AppContainer` Blueprint class and implement the
basic required methods, which are `info`, `routes` and `configureSearch`.

When generating a container, every little detail is taken care of for you. It will update your composer.json file
and tell composer to update it's autoload file. That means, you don't have to do anything else than develop your
container and use it.

When your container is created, you will see that the controller folder is empty. This because you need to create your
custom code, and we cannot pre-generate it for you. You can generate a custom controller for your container using the CLI

```bash
php sail create:controller <containerName> <controllerName>
```