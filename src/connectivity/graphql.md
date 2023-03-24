# GraphQL

Normally working with graphql in php is not that easy or requires a lot of boilerplate code to make it work. With Sail,
we made it super easy to get started and get everything rolling without too much code. We kept Developer Experience in
mind the whole time.

When using graphql, you must use the POST method on the `/graphql` URL.

## Important Note

Unlike the other ways to get content out of Sail, GraphQL __does not__ use the Request/Response mechanism. Whatever you do
in your controller method, return a raw value like string, integer, array, etc.

## Defining your custom schema parts

SailCMS comes with a bunch of ready-made queries, mutations, types and resolvers. But you can add your own with ease. When
you create a container or module, you get a `Graphql` folder with 3 files already created. Those files are `queries.graphql`,
`mutations.graphql` and `types.graphql`. Within each file is where you define your graphql schema.

#### NOTE
You must not wrap your queries and mutations in their parent `type Query` and `type Mutation`. This will be
done for you.

Once you have defined your queries and mutations, you need to bind them with their php counterpart.

Take this schema:

```graphql
mySuperCall(id: ID!): Boolean!
```

In your container or module's `graphql` method, you can define something like this:

```php
GraphQL::addQueryResolver('mySuperCall', MyClass::class, 'myCall');
```

And that's it!

Your method's signature should look like this:

```php
public function myCall(mixed $obj, Collection $args, Context $context): bool
{
    // do whatever

    return true;
}
```

If you create custom types in your queries or mutations, you need to provide a way to resolve those types. You
can resolve them directly in your query or mutation but the performance of resolving them only when required is
lost. To resolve on request, register a resolver to handle that job:

```php
GraphQL::addResolver('YourType', YourClass::class, 'yourResolverMethod');
```

Your php code for this resolver would look something like this:

```php
public function resolver(mixed $obj, Collection $args, Context $context, ResolveInfo $info): mixed
{
    if ($info->fieldName === 'name') {
        return $obj->name->toSimple();
    }

    return $obj->{$info->fieldName};
}
```

## Getting ready for production

When you are ready to go to production, you must not forget to compile your GraphQL Schema. The reason you have to do that
is for performance. Compiling it will build an AST and make it a lot more performant on production environments.

## Removing the CMS from GraphQL

You can tell SailCMS to remove itself from the graphQL API and act more like a framework by setting the `hideCMS` option to `true`.

```php
'graphql' => [
    'active' => true,
    'trigger' => 'graphql',
    'depthLimit' => 5,
    'introspection' => true,
    'hideCMS' => true   // <-- set this to true to hide the cms from GraphQL
]
```

__IMPORTANT NOTE__

When you activate introspection (should really only be used in development) it forces depth limiting to `11` instead
of your config's value.

## Testing your GraphQL api

If you do not have a tool specialized for GraphQL (ex: postman, RapidAPI, Altair) or you do not want to install one,
you can install the official package "GraphQLPlayground" which is a web UI for GraphQL. You can check out the details
on [GitHub](https://github.com/LeeroyLabs/sail-graphql-playground).