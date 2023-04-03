# Middleware

Middleware is its own topic because of the importance it has. First up, this document will explain how it works and then
show you how to implement your own for your application.

## What is a middleware?

See a complete application lifecycle like 2 people exchanging a piece of data. A middleware in this case would be a third
person taking that piece of data before it reaches the hands of the receiving person. That middleware can change what that
piece of data is before giving it to the receiving person.

Here again, you can see the application lifecycle

![Lifecycle](/lifecycle.jpg)

Every turquoise round elements on that graphic is a middleware event. That means whatever points to it is actively calling
a middleware event and whatever middleware is registered to that event will get it's chance to get and change the data
given by that caller.

With this said, you will probably see that a few middleware calls are made before any data is available to play with.
That is because these are `request middleware` calls. That means you can affect the request before it gets to the actual
handling of the request. Everything after a request handler is a `response middleware`. A middleware can be both without
any problems.

## Important Note

Very important note about Middlewares. If a middleware event sends data, it expects the data to be returned, so it can pass
it along to other middlewares. 

You should never change the basic structure of the data you receive. For example, if you
receive an array, do not return a string or object or anything that is different. A middleware normally adds to whatever
is there or changes existing values, but it never removes any structural data.

## GraphQL Related Events

#### BeforeQuery
---
This event is called before a GraphQL query is executed. It passes the query and the variables.

#### BeforeMutation
---
This event is called right after the execution a query. It passes the data returned by that query.

#### AfterQuery
---
This event is called right before a GraphQL mutation is executed. It passes the mutation and variables.

#### AfterMutation
---
This event is called right after the execution a mutation. It passes the data returned by the mutation.


## HTTP Events

TODO

## Login Events

TODO

## How do I Create a Middleware?

To create a middleware, you must create either a container or a module. 

If you create a container, you will see that the created scaffold already has a `Middleware.php` file, but it 
doesn't do anything and is not loaded by default. If you which to load it, in your container's `middleware` method, you
can register it. Here is an example:

```php
public function middleware(): void
{
    Middleware::register(new \Spec\Middleware());
}
```

If you created a module, the same thing is true, you have an empty middleware created and your module has a `middleware`
method that will be called automatically. You just need to register your middleware if you want to use it.

## How do I Register to an Event?

Once you have a middleware in your container or module, this is the basic structure you will find

```php
<?php

namespace Spec;

use SailCMS\Contracts\AppMiddleware;
use SailCMS\Middleware\Http;
use SailCMS\Types\MiddlewareType;
use SailCMS\Middleware\Data;

class Middleware implements AppMiddleware
{
    public function type(): MiddlewareType
    {
        return MiddlewareType::HTTP;
    }

    public function process(Data $data): Data
    {
        switch ($data->event)
        {
            case Http::BeforeRender:
                // Before a round gets rendered
                break;

            case Http::AfterRender:
                // After a route was rendered
                break;

            default:
            case Http::BeforeRoute:
                // Before a route is executed
                break;
                
            // More when CMS is completed
        }
        
        return $data;
    }
}
```

If you wish to create a GraphQL middleware, just change the `type` method to return `MiddlewareType::GRAPHQL` instead. This
will tell the middleware system the type of event you are registered for. A middleware cannot be registered in both
types. The reason behind this is clarity and maintainability. If you have to separate files, one for each, it's easier
to understand what is going on when something goes wrong.

Within the process method, this is where you select to what specific event you to respond to. You can do whatever you
want in this method as long as you respect the __important note__ that you read at the top of this page.