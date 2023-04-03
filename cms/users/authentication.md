# Authentication <Badge type="tip" text="3.0.0" />

SailCMS offers great support for classic application and SPA for authentication. By default, SailCMS uses the Stateless adapter to 
handle authentication. This enables you to put your application behind a load balancer and not have problems with sessions.

But if you prefer to use the classic php sessions, SailCMS got you covered.

## How to maintain a session active using stateless

For that you either have a cookie or a token given by the authentication process. If you are not in SPA mode, you will
have a cookie that is safe from javascript attacks and is super strict on security. Otherwise you will get a Json Web Token
(JWT). 

If you want to do less code on the front and let the api do the work, in your SPA, you can call the `userWithToken` query
to get the user information from the token you have the frontend side. As long as you provide `x-access-token` in the your
request's headers, SailCMS will authenticate you.

### For Cookies

Cookies should be sent by your ajax call automatically. the cookie name is `sc_jwt`. 

### For SPA, 
For SPA there is no cookie, it's a header called `x-access-token`. The reason is that in headless mode, the cookie is
set too strict and requires your app to be on the same domain, otherwise it won't work. To prevent issues with that,
SailCMS gives out the token when login in and looks for it in the headers on each request.

## Login Flow

![Login Flow](/loginflow.jpg)

To get started, you need to call the `authenticate` GraphQL query. This expects you to send an email and password.

SailCMS will respond with a `LoginResult` object that contains 2 things, a user id and next step to perform. The next
step will depend on user account settings. If Two-Factor Authentication is activated, you will receive '2fa' as a message.
Otherwise you will receive a token in the `message` field. If you get `error`, that means the login is not valid.

## Reauthenticating after full browser reload

When you are developing a Single Page Application (SPA), SailCMS requires you to reauthenticate on each freshly loaded 
pages (from reload or direct browser access via url bar). If you already have a token (JWT), you can simply make a call
to the `userWithToken` call. You only need to provide a valid JWT token in the `x-access-token` header.