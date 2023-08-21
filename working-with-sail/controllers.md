# Controllers

SailCMS, being a MVC based CMS, has controllers that implement the `AppController` contract. But you can also run
a controller that is not implementing any contract, but it's not recommended.

You can create a controller using Commander:

```sh
php sail create:controller <containerName> <controllerName>
```

## What AppController provides

Every controller that implements the `AppController` contract gets an instance of the `Router`, `Request`, `Response` and 
`Locale` classes.

By default, the `response` property is set to return an html response and sets the mime type to `text/html`.

It also provides a nifty `redirect` method if you ever need it.


