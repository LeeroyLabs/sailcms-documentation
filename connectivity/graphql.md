# GraphQL <Badge type="tip" text="3.0.0" />

Normally working with graphql in php is not that easy or requires a lot of boilerplate code to make it work. With Sail,
we made it super easy to get started and get everything rolling without too much code. We kept Developer Experience in
mind the whole time.

When using graphql, you must use the POST method on the `/graphql` URL.

## Important Note

Unlike the other ways to get content out of Sail, GraphQL __does not__ use the Request/Response mechanism. Whatever you do
in your controller method, return a raw value like string, integer, array, etc.

## Framework Mode

If you wish to use SailCMS just as a framework, you can disable the CMS from the GraphQL api. By turning
it off, you will not be able to call any of the GraphQL queries and mutations provided by SailCMS.

To turn it on or off, in your `general.<env>.php` file, in the `graphql` section, you can set the
`hideCMS` config to true or false.

## Defining your custom schema parts

SailCMS comes with a bunch of ready-made queries, mutations, types and resolvers. But you can add your own with ease. When
you create a container or module, you get a `Graphql` folder with 3 files already created. Those files are `queries.graphql`,
`mutations.graphql` and `types.graphql`. Within each file is where you define your graphql schema.

#### NOTE
You must not wrap your queries and mutations in their parent `type Query` and `type Mutation`. This will be
done for you.

Once you have defined your queries and mutations, you need to bind them with their php counterpart.

### Attributed Linking

Attributed linking is the quickest and easiest way to link your GraphQL schema to your application code. Here are 4 examples
of how it works.

Query Attribute
```php
#[Query('myCall')]
public function myCall(mixed $obj, Collection $args, Context $context): bool
{
    return true;
}
```

Mutation Attribute
```php
#[Mutation('myCall')]
public function myMutation(mixed $obj, Collection $args, Context $context): bool
{
    return true;
}
```

Type Resolver Attribute
```php
#[Resolver('myType')]
public function myType(mixed $obj, Collection $args, Context $context, ResolveInfo $info): mixed
{
    return $obj->{$info->fieldName};
}
```

Custom (probably Union) Resolver Attribute
```php
#[CustomResolver('myUnion')]
public function myUnion(mixed $obj, Collection $args, Context $context, ResolveInfo $info): mixed
{
    if (isset($obj->someField)) {
        return 'TypeA';
    } 
   
    return 'TypeB';
}
```

### Manual Linking

This way of linking your schema and code together is a bit more verbose and can be done from anywhere that is executed
before the GraphQL engine is started. **We recommend using the attributed linking method**.

In your container or module's `graphql` method, you can define something like this:

```php
GraphQL::addQueryResolver('mySuperCall', MyClass::class, 'myCall');
```

From there you can write your method in the controller. Here are the signatures for all types of resolvers:

Query & Mutation Resolver
```php
public function myCall(mixed $obj, Collection $args, Context $context): bool
{
    // do whatever

    return true;
}
```

Type Resolver
```php
public function myCall(mixed $obj, Collection $args, Context $context, ResolveInfo $info): mixed
{
    // do whatever

    return true;
}
```

Custom Resolver
```php
public function myCall(mixed $obj, Collection $args, Context $context, ResolveInfo $info): mixed
{
    // Determine 
    return 'TypeA';
}
```

## Getting ready for production

When you are ready to go to production, you must not forget to compile your GraphQL Schema. The reason you have to do that
is for performance. Compiling it will build an AST and make it a lot more performant on production environments.

## Framework Mode

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

When you activate introspection (should really only be used in development) it forces depth limiting to `11` instead of your configured value.

## Testing your GraphQL api

If you do not have a tool specialized for GraphQL (ex: postman, RapidAPI, Altair) or you do not want to install one,
you can install the official package "GraphQLPlayground" which is a web UI for GraphQL. You can check out the details
on [GitHub](https://github.com/LeeroyLabs/sail-graphql-playground).