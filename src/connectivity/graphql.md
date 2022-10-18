# GraphQL

Normally working with graphql in php is not that easy or requires a lot of boilerplate code to make it work. With Sail,
we made it super easy to get started and get everything rolling without too much code. We kept Developer Experience in
mind the whole time.

When using graphql, you must use the POST method on the `/graphql` URL.

## Important Note

Unlike the other ways to get content out of Sail, GraphQL __does not__ use the Request/Response mechanism. Whatever you do
in your controller method, return a raw value like string, integer, array, etc.

## Types & GraphQL Types

Since everything in GraphQL is typed, you must use the system types and define your own types. Sail provides the basics
for the root types and all types for what SailCMS provides in terms of database content.

All of the root types offer required or optional formats depending on the call you make. They all work the same. You
only need to provide `true` to the method to get it as optional. Providing false or nothing will return a required formatted
type.

### ID

This is a string but that indicates clearly that it represents an id.

```php
// Required
SailCMS\GraphQL\Types::ID();

// Optional
SailCMS\GraphQL\Types::ID(true);
```

### String

Standard string.

```php
// Required
SailCMS\GraphQL\Types::string();

// Optional
SailCMS\GraphQL\Types::string(true);
```

### Int

Standard integer number.

```php
// Required
SailCMS\GraphQL\Types::int();

// Optional
SailCMS\GraphQL\Types::int(true);
```

### Float

Standard floating decimal number.

```php
// Required
SailCMS\GraphQL\Types::float();

// Optional
SailCMS\GraphQL\Types::float(true);
```

### Boolean

Standard boolean.

```php
// Required
SailCMS\GraphQL\Types::boolean();

// Optional
SailCMS\GraphQL\Types::boolean(true);
```

## Defining a custom type

Let's say you want to implement a custom graphql type that looks like this:

```graphql
type MyCustomType {
    name: Locale!
    optionalValue: String
    requiredValue: Int!
    arrayValue: [String!]!
} 
```

You would implement it like this:

```php
use GraphQL\Type\Definition\Type;
use SailCMS\GraphQL\Types as GTypes;

public function customType(): Type
{
    return new ObjectType([
        'name' => 'MyCustomType',
        'fields' => [
            'name'          => ['type' => Type::nonNull($this->locale())],
            'optionalValue' => ['type' => GTypes::string(true)],
            'requiredValue' => ['type' => GTypes::int()],
            'arrayValue'    => ['type' => Type::listOf(Gtypes::string())],
        ]
    ]);
}

public static function locale(): Type
{
    return new ObjectType([
        'name' => 'Locale',
        'fields' => [
            'fr' => ['type' => GTypes::string()],
            'en' => ['type' => GTypes::string()]
        ]
    ]);
}
```

As you can see, the heavy lifting is done the basic types but is to be done by you for your custom types. This is the
code heavy part of GraphQL in SailCMS. Unless you have very complex objects, it should not be to much work to do.

## Queries

Queries are all the calls that do not perform any changes to the data. You can see this as all the `GET` calls from a
REST Api.

Since GraphQL is viewed as being an outlet for you application, we recommend using a Container to add your graphql
queries and mutations. Your container has a `graphql` method that is executed when your container is loaded.

To add a query to the available queries, You can run something like the following (within your graphql method):

```php
use SailCMS\GraphQL\Query;
use SailCMS\GraphQL;

GraphQL::addQuery(
    Query::init(
        'operationName',                        // name used for the query
        [ControllerName::class, 'methodName'],  // controller and method to call
        [],                                     // arguments if any
        'return'                                // return type
    )
);
```

Here is a real example of this method in use

```php
use SailCMS\GraphQL\Query;
use SailCMS\GraphQL;

GraphQL::addQuery(
    Query::init(
        'user', 
        [UserGraphqlController::class, 'getUser'], 
        ['id' => GTypes::string()], 
        Types::user()
    )
);
```

The previous example will add the `user` query that expected an argument of type string called `id` to be passed. It will
return a type `User`. In this case `User` is nullable since the call might not find a user for the id.

## Mutations