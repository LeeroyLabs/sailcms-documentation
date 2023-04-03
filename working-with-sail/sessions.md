# Sessions <Badge type="tip" text="3.0.0" />

SailCMS offers a unified API over 2 different ways of handling sessions. We have 2 adapters called `Standard` and `Stateless`.

## Standard

Standard uses the php session mechanism. This is okay for simple projects where you are not building a Single Page 
Application (SPA) and that your application will not be hosted behind a load balancer.

## Stateless

Stateless uses Json Web Tokens (JWT) to be compatible with SPAs and load balanced applications. This adapter is the 
recommended way to handle authentication. It's the most secure of the two.

<br/>

## Security Note
Both of the adapters use `https`, `samesite` and `http only` cookies to store the session id or jwt.

in both cases, the session is started for you and you do not need to do anything when it comes to Authentication, it's 
taken care of by the core's `User` model. When you come in from a fresh load, if a session cookie is found, the user
will be authenticated before anything else is executed.

In the case of the JWT, nothing else can be stored in this token. Since stateless does not keep state by definition. The
standard adapter is a different story, you can store whatever you want in the session. We still recommend not storing
important information in there.

## Set / Get information

Here are two examples of how to set and get data from the `standard` adapter:

```php
$session = new Session();
$session->set('key', $value);
```

```php
$session = new Session();
$session->get('key');
```

You can also perform 2 types of destructive actions, `remove` and `clear`:

```php
$session = new Session();
$session->remove('key');
```

```php
$session = new Session();
$session->clear();
```