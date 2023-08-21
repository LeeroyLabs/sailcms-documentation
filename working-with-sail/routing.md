# Routing <Badge type="tip" text="3.0.0" />

For example, if you would like your container to provider the `/hello-world` route, you need to put
the following code in the `routes` method of your container:

```php
$this->router->get(
    '/hello-world', 
    'en', 
    Spec::class, 
    'helloWorld', 
    'internal_name',
    false
);
```

The above code tells the router that the route `/hello-world` will be taken care of by the `Spec` controller
using the `helloWorld` method. 

The last argument is for cases where you want the route to be secure or not. Secure routes require
the user to be logged in to the system otherwise, a 403 page will be served. By default, the routes are not secured.

The controller's method needs to provider a `Response` object to render out to the client. You have a choice
of 3 types of output, `html`, `json` or `csv`. You only need to return the response object, the rendering
of that response will be taken care of for you.

__NOTE__: If you do not give your route a name, the url will be used has a name. This can get very hard to deal
with if you are looking to do alternate finding and other route related tasks.

## Static routes

Static routes are simple routes like `/hello-world`. Nothing dynamic about it, straight to the point.

## Dynamic routes

Dynamic routes enables you to have dynamically set routes. For example `/blog/:any` would resolve any
url that start with `/blog/` to this route. So this would enable you to have `/blog/my-first-post`.
The router will send to your handler method the dynamic parts of your urls.

Here is a list of the supported dynamic indicators:

### :any

The `:any` indicator allows the url to have any length of numbers, letters and special url characters
`-` and `/`. It does not allow for special characters that are not URL characters (ex: $, @, #, etc.)

### :num

The `:num` indicator allows for numbers only.

### :id

The `:id` indicator allows for mongodb compatible id string. This means 24 character alphanumeric string.

### :all

The `:all` indicator means anything that is possible to put in a url.

## Redirect routes

In Sail, you can create redirects in code instead of using the traditional .htaccess method. You can easily
create static or dynamic redirects like the following:

```php
$this->router->redirect('/hello-world', '/new/location/hello-world');
$this->router->redirect('/hello-:any', '/new/location/hello-$1');
```

## Route precedence

Take the example above, `/hello-world` would pick up when that url is requested instead of `/hello-:any` 
because of route precedence. If you invert the 2 routes, `/hello-world` would never be called because the url would match
the `/hello-:any` route. Always be mindful of that when creating routes that are close to being the same.

## Getting a route by its name and http method

The router offers you a quick way to get a route by its name nad method:

```php
$route = Router::retrieve('name', 'get');       // get english by default
$route = Router::retrieve('name', 'get', 'fr'); // Get the locale you want
```

If the route is not found, you will receive `null`.

But wait! what if the route has dynamic parts to it, how can i get a nice url? Like this;

```php
$route = Router::retrieve('name', 'get', 'en', ['my-string', '1234567890']);
```

This will return you the route, the route being `/your-dynamic/:string/:id` will be returned as 
`/your-dynamic/my-string/1234567890`. Awesome right?! But wait! there's more!

You can fetch all routes by name and method and replace all dynamic placeholders with real data to form awesome urls!

```php
$routes = Router::retrieveAll('name', 'get', ['my-string', '1234567890']);
```

This will return you a collection of all routes under that name in that given method. Something like this:

```php
[
    'fr' => '/votre/url/avec-les-parties-dynamiques-remplacees',
    'en' => '/your/url/with-dynamic-placeholders-changed'
]
```

## Getting alternate routes

Let's say you have set 2 routes to be the opposite of one another locally speaking. You have 1 for English and 1 for 
French. To link them together, simply give them the same name when you declare them.

If you are in one or the other you can ask the router for the alternate using the `alternate` method:

In a controller:

```php
$list = $this->router->alternate($this->route);
```

This will get you all the available routes that are linked to the current url. But it's important to know that it will
only return the routes that are using the same HTTP method.

## Getting all routes that match a name

You can always get all routes that match the name you want to target.

```php
$router = new Router();
$router->retrieveAllByName('your_name');
```