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