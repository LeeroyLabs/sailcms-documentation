# GraphQL

This configuration helps you configure GraphQL for sail.

<Br/>

Defaults:
```php
'graphql' => [
    'active' => true,
    'trigger' => 'graphql',
    'depthLimit' => 5,
    'introspection' => true,
    'hideCMS' => false
]
```

## active

Is GraphQL active or not.

## trigger

The URL fragment that triggers the graphql api. You can set this to whatever you want.

## depthLimit

Depth limiting to provide security against the n+1 attack. We normally recommend to set this around 5.

::: tip
If you ever get errors about the depth and that you are getting this during normal development. You
can set this value higher but just to the level that your code works again, do not set it to a ludicrous level
that will not provide security at all.
:::

## introspection

Allow GraphQL clients to ask for the whole schema.

::: tip
It is recommended to turn this off in production.
:::

## hideCMS

This is seting is useful if you want to use SailCMS as a framework only. This setting removes everything
graphql queries, mutations and types from the GraphQL api.