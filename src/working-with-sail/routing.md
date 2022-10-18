# Routing

For example, if you would like your container to provider the `/hello-world` route, you need to put
the following code in the `routes` method of your container:

```php
$this->router->get('/hello-world', Spec::class, 'helloWorld');
```

The above code tells the router that the route `/hello-world` will be taken care of by the `Spec` controller
using the `helloWorld` method.

The controller's method needs to provider a `Response` object to render out to the client. You have a choice
of 3 types of output, `html`, `json` or `csv`. You only need to return the response object, the rendering
of that response will be taken care of for you.

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

For example, take the example above. `/hello-world` would pick up when that url is requested instead of `/hello-:any` 
because of route precedence. If you invert the 2 routes, `/hello-world` would never be called because the url would match
the `/hello-:any` route. Always be mindful of that when creating routes that are close to being the same.