# Attributed Routing <Badge type="tip" text="3.0.0" />

Attributed routing is the easiest way to add routes to your application. There a as close to your route handler as it
can be.

Here is a example of a route for `/about-us`:

```php
#[Route('/about-us', Http:GET)]
public function aboutUs(): void
{
    // Your code
}
```
## Anatomy of the route attribute

The route attribute takes up to 4 arguments. The first one is the url, the second is the http method to accept. The third
is the locale to use for that route and finally the fourth is the internal name.

```php
#[Route('/blog/:any', Http::GET, 'en', 'blog-single')]
public function blogSingle(string $slug): void
{
    // Your code
}
```

You can create many routes for the same controller method. You can also define the same route but with different arguments.

```php
#[Route('/blog/:any', Http::GET, 'en', 'blog-single-en')]
#[Route('/blogue/:any', Http::GET, 'fr', 'blog-single-fr')]
public function blogSingle(string $slug): void
{
    // Your code
}
```

:::warning
It's important to know that only container controllers are parsed for attributes for attributed routes.
:::