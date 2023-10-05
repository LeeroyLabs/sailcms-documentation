# Templating <Badge type="tip" text="3.0.0" />

Templating in SailCMS is done using the very powerful and popular engine called Twig. Twig is deeply integrated in SailCMS and you won't need to know how to set it up because it is all done for you.

If you read the section about [Request & Response](/working-with-sail/request-response.html), you will know how to set variables in your template using the response's `set` method.

SailCMS provides an easy for you to implement your own extensions, functions and filters in the following ways:

```php
use Sail\Templating\Engine;

//...

// Passing a function as callback
Engine::addFilter('filterName', function($param)
{
  // Do something and return the value
  return $param;
});

// Passing a callable
Engine::addFunction('name', [new YourClass(), 'methodName']);
```

OR Build an extension that provides many things at once

```php
<?php
  
namespace Your\Namespace;

use SailCMS\Debug;
use SailCMS\Locale;
use SailCMS\Sail;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class YourExtension extends AbstractExtension
{
  	public function getFunctions(): array
    {
        return [
            new TwigFunction('yourfunc', [$this, 'myfunc']),
        ];
    }

    public function getFilters(): array
    {
        return [];
    }
  
  	public function myfunc(mixed $data): mixed
    {
      	// implement your code
      	return $data;
    }
}
```

SailCMS provides a few extra features using the Extension system in Twig. Here is a list of what comes for free to help you in your templating.

## debug

debug will let your output nicely formatted debugging information about the given variable

![debug from twig](/debug.jpg)

## env

env will fetch a variable from your `.env` file so it can be used in your template.

## publicPath

publicPath is the public path of your application for the web server. From that url you can build the url to your file.

## locale

locale returns the current locale value in ISO-639-1 format. That mean `en` or `fr` or whatever other language you have in your application.

## __

`__` translates the given string path to what is mapped in your language `.yaml` files. So for example, if you would like to print out what is in this file

```yaml
general:
	homepage:
		title: Hello World!
```

You would type 

```twig
{{ __('general.homepage.title') }}		
```

## twoFactor

twoFactor is the convience method to display the two-factor authentication UI to enable it for a user account. It provides fully reponsive and neutral ui and takes care of all of the feature for you. For example, the QR Code, the validation of the set up, rescue code generation and display. 

See [Two-Factor Authentication](/security/two-factor.html) section for more details.

## paths

`paths` is not a function but a variable built-in to all renders of Twig, if has a list of all important paths to things on your site. it has:

| Path   | Location                       |
| ------ | ------------------------------ |
| images | /web/public/`<project>`/images |
| css    | /web/public/`<project>`/css    |
| js     | /web/public/`<project>`/js     |
| fonts  | /web/public/`<project>`/fonts  |
| public | /web/public/`<project>`        |

For more information on how to use and extend Twig, please visit the [website](https://twig.symfony.com/).


## Extend the rendering process

SailCMS comes with support for Twig for html, json and csv formats. But you can always extend it by writing your own Renderer. This means that if you don't lile Twig for HTML, you can use any other templating engine like Laravel's Blade engine or Smarty or any other that you wish. You can also add more output types and still use Twig to render it. For Example, here Is an implementation to output XML documents.

```php
<?php
 
  // Renderer.php in your container or module's root directory 
  //(filename can be anything)
  
namespace YourContainer;

use SailCMS\Contracts\Renderer;

class XMLRenderer implements Renderer
{
    public function identifier(): string
    {
        return 'xml';
    }

    public function contentType(): string
    {
        return 'Content-Type: text/xml; charset=utf-8';
    }

    public function useTwig(): bool
    {
        return false;
    }

    public function render(string $template, object $data): string
    {
      	// This is just to explain what to do, don't do this!
        return <<<EOF
        <?xml version="1.0" encoding="UTF-8"?>
       	<note>
          <to>John</to>
          <From>Bob</from>
          <heading>Reminder</heading>
          <body>This is greate XML!</body>
        </note>
        EOF;
    }
}
```

As you can see, we implement the `Renderer` contract and provide information about what and how we are rendering.

The `identifier` method is to identify the renderer to use if you wish to use it. This will be explain a bit later. The second method is `contentType` that tells the system what content-type to send back.

 Third is `useTwig`, if this is set to `true` twig will load a twig template and renderer everything for you. This is used when you only want to add a content-type and format to the rendering system. If you set this to false, the `render` method is called by the engine.

### How to tell the engine that your renderer exists

In your container or module's `init` method, you can register your renderer.

```php
public function init(): void
{
    Engine::addRenderer(XMLRenderer::class);
}
```

### How to tell the engine to use it on a specific route

To use your renderer on a specific route, you would call the `useRenderer` method.

```php
$this->response->useRenderer('xml'); 
// xml is the identifier you set in your renderer class
```

### Using your custom renderer all the time

If you wish to use your own renderer on all of your routes and files, you can set it's identifier name in your configuration file, under the `templating` property.

```php
'templating' => [
    'cache' => false,
    'vueCompat' => false,
    'renderer' => 'Twig' // <- your identifier here
],
```