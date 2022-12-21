# Modules

Modules are another way to add features to Sail. Unlike Containers, Modules only add "backend" facing 
features. They do not provide routing, controllers or anything.

For example, adding CRM communication between Sail and a CRM Service, this would be the perfect time to
use a Module and not a Container.

## Writing your own module

To create a module, we suggest using the SailCMS CLI tool by calling:

```bash
php sail create:module <moduleName>
```

The following is an example of an empty module.

```php
<?php

namespace Spec;

use SailCMS\Types\ModuleInformation;
use SailCMS\Blueprints\ModuleContainer;
use Spec\Controllers\Spec;

class Spec extends AppModule
{
    public function info(): ModuleInformation
    {
        return new ModuleInformation(name: 'Spec Module', sites: ['*'], version: 1.0, semver: '1.0.0');
    }
    
    public function cli(): Collection
    {
        return new Collection([]);
    }
    
    public function middleware(): void
    {
        // Middleware::register(new \YourMiddle\Ware());
    }
}
```
Like the containers, once the module is created, your composer.json file is updated and composer is told to update
it's autoload file.

## Accessing your module in the code

Once that is done, you can access your module instance using the `Register` class. For this example, we
are using `moduleName`:

```php
$module = Register::module('moduleName');
$module->yourCall();
```
This way you get the same instance of your module every time you run `Register::module`. You can always create
new instances by instantiating the module manually.

## Checking if a container exists

To check if another module (yours or third-party) exists, you can use the `Register` to check if it's there.

```php
Register::moduleExists('name');
```

You can optionally request a specific minimum version like this:

```php
Register::moduleExists('name', 1.2);
```

The register will respond true if the container exists and is at least version 1.2.