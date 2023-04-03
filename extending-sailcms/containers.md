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
    public function init()
    {
        // This is optional
    }

    public function info(): ContainerInformation
    {
        return new ContainerInformation(
            'Name of Container',
            'your description',
            1.0,
            '1.0.0',
            'Author Name',
            'Link to Website'
        );
    }

    public function routes(): void
    {
    }

    public function configureSearch(): void
    {
    }
    
    public function events(): void
    {
    }

    public function fields(): Collection
    {
        return Collection::init();
    }
    
    public function cli(): Collection
    {
        return new Collection([]);
    }
    
    public function permissions(): Collection
    {
        return Collection::init();
    }
}
```

The `routes` method will be explained in the next page. The `configureSearch` method is explained in the 
[Search](/search/) page.

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

## Checking if a container exists

To check if another container (yours or third-party) exists, you can use the `Register` to check if it's there.

```php
Register::containerExists('name');
```

You can optionally request a specific minimum version like this:

```php
Register::containerExists('name', 1.2);
```

The register will respond true if the container exists and is at least version 1.2.

## Providing templates

Your container can use its own templates to provide a UI to the user. To do that, in
your `info` method, you can add this line to tell the rendering engine (twig)
that you are providing a new path.

```php
\SailCMS\Templating\Engine::addTemplatePath(__DIR__ . '/templates');
```

Just make sure you create the `templates` directory and that you create
`.twig` files.

Then in your controller, you can tell the response property to use whatever
template you want.

```php
$this->response->template = 'your_local_template';
```