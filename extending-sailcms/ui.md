# UI <Badge type="tip" text="3.0.0" />

SailCMS offers way to extend the management panel with your custom UI. You can develop your UI in any popular framework,
you want or use Twig.

## Getting Started

First off, you need to configure this part of the `.env` file

```.dotenv
EXTENSION_HANDSHAKE_KEY="GENERATE USING: php sail create:password"
EXTENSION_MINIMUM_LEVEL_REQUIRED=100
```

To generate the handshake key, run the `php sail create:password` cli command and set the result in the 
`EXTENSION_HANDSHAKE_KEY` variable.

The next variable `EXTENSION_MINIMUM_LEVEL_REQUIRED` is set to the lowest value possible of `100`. This is what level
the user is requried to have to view/use your UI. Value ranges from `100` to `1000`.

## Instructing SailCMS to make your UI available

To make your UI available to the user, you must do 1 of 2 things (or both). You can either have your UI listed on the
right-hand side navigation or listed in the `Settings` page.

To add your UI to the navigation, in your container's `init` method:

```php
UI::addNavigationElement(new NavigationElement(
    'name_of_your_ui',
    'mdi_compatible_icon_name', // see notes
    '/your-url-here',
    new LocaleField(['fr' => 'Nom du lien', 'en' => 'Link Name']),
    'parent_url', // see notes
    'permission_name' // see notes
));
```

To add your extension to the `Settings` page, in your container's `init` method:

```php
UI::addSettingsElement(new SettingsElement(
    'name_of_your_ui',
    'mdi_compatible_icon_name', // see notes
    '/your-url-here',
    new LocaleField(['fr' => 'Nom du lien', 'en' => 'Link Name']),
    'permission_name' // see notes
    SettingsElement::SECTION_OTHERS // see notes
));
```

## Creating your UI

SailCMS will expect you to have a `ui` folder in your extension with a `index.html` or `index.twig` file to run. So when
the frontend requires your UI, it will respond with the content of that file.

## Authorizing your UI

To authorize your UI to the management panel, you are required to use the SailCMS Javascript SDK to authenticate your application
at the minimum.

```html
<script>
    // store the handshake key
    window.handshakeKey = '{{ handshakeKey }}'; // Using Twig
</script>

<script type="module">
    import SailCMS from './assets/sailcms.sdk.js';

    SailCMS.init((action, result) =>
    {
        // All events a received here. The switch below is to have 
        // a case for all the events you support
        switch (action)
        {
            case 'hasPermission':
                if (result) {
                    // User has permission
                }
                break;
        } 
    }).then(() => {
        // You have access to SailCMS here
        // run your init here
    });
</script>
```

### Available Properties in the SailCMS object

Once your UI is authenticated, you have access to the following list of properties, methods and events.

::: warning
Your extension runs in an isolated view and does not have access to anything more than what the SailCMS SDK offers. It
was made this way for obvious security reasons.
:::

<Badge text="Property"></Badge> <b>locale</b> &mdash; string 
Access the current locale value of the panel.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>locales</b> &mdash; array
All available locales in the CMS.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>currentUser</b> &mdash; object
Information about the current user.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>version</b> &mdash; string
Current version of the cms.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>majorVersion</b> &mdash; int 
Current major version of the cms.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>minorVersion</b> &mdash; int
Current minor version of the cms.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>baseURL</b> &mdash; string
URL of the panel.
<div style="height: 10px;"></div>

<Badge text="Property"></Badge> <b>theme</b> &mdash; string 
current theme color (light or dark).
<div style="height: 10px;"></div>

<Badge text="Method" type="info"></Badge> <b>setReady</b>
inform the panel that your page is ready.

```js
SailCMS.setReady(true);
```
<div style="height: 10px;"></div>

<Badge text="Method" type="info"></Badge> <b>hasPermission</b>
Request to check if current user has requested permission.

```js
SailCMS.hasPermission('readwrite_myext');
```
<div style="height: 10px;"></div>

<Badge text="Method" type="info"></Badge> <b>addAction</b>
Enables you to add an action button in the page to perform an action. This helps blur the line for the user to make
your ui more like the rest of the panel.

```js
// use "primary", "secondary", "warning", "error" 
// or any named color (ex: red, green, blue)
// TailwindCSS colors are also supported with `tw-` prefix (ex: tw-bg-red-500)
SailCMS.addAction(
    'id', 
    {fr: 'libellé', en: 'label'}, 
    'permission', 
    'color'
);
```
<div style="height: 10px;"></div>

<Badge text="Method" type="info"></Badge> <b>redirect</b> (string)
Ask the panel to redirect to given url. Note that for security reasons, you cannot redirect anywhere else than
within the panel itself. If you provide a full url to somewhere else, only the path will be used to redirect.

```js
SailCMS.redirect('/other-url');
```
<div style="height: 10px;"></div>

<Badge text="Method" type="info"></Badge> <b>api.query</b> (string)
Leverage the GraphQL client from the panel to perform your own graphql queries.

```js
const variables = {id: 'xxxx'};
const query = `
    query yourMethodName($id: ID!) {
        yourMethodName(id: $id) {
            whatever_you_need_from_response
        }
    }
`;

SailCMS.api.query('firstcall', 'yourMethodName', query, variables);
```
<div style="height: 10px;"></div>

<Badge text="Method" type="info"></Badge> <b>api.mutation</b> (string)
Leverage the GraphQL client from the panel to perform your own graphql mutations.

```js
const variables = {id: 'xxxx', field: 'abcdefgh'};
const mutation = `
    query yourMethodName($id: ID!, $field: String!) {
        yourMethodName(id: $id, field: $field) {
            whatever_you_need_from_response
        }
    }
`;

SailCMS.api.mutation('mutationcall', 'yourMethodName', mutation, variables);
```
<div style="height: 10px;"></div>

<Badge text="Event" type="warning"></Badge> <b>hasPermission</b> (string)
Received when the `hasPermission` method is called. A boolean value is returned.
<div style="height: 10px;"></div>

<Badge text="Event" type="warning"></Badge> <b>localeChange</b> (string)
Received when the user changes the active locale.
<div style="height: 10px;"></div>

<Badge text="Event" type="warning"></Badge> <b>themeChange</b> (string)
Received when the user changes the active theme. SDK takes care of changing color-scheme.
<div style="height: 10px;"></div>

<Badge text="Event" type="warning"></Badge> <b>actionPerformed</b> (string)
Received when the user clicks on one of your actions. ID of the button is returned.
<div style="height: 10px;"></div>

<Badge text="Event" type="warning"></Badge> <b>queryResult</b> (string)
Received after a GraphQL query was performed on your behalf. Returns the ID of the query and its result.
<div style="height: 10px;"></div>

<Badge text="Event" type="warning"></Badge> <b>mutationResult</b> (string)
Received after a GraphQL mutation was performed on your behalf. Returns the ID of the mutation and its result.

## Notes

### Icon

The official UI for SailCMS supports Material Icons (mdi). Visit the [Pictogrammers](https://pictogrammers.com/library/mdi/) 
website to look up the names. You do not need to add the `mdi-` prefix.

### Parent URL

Add the parent url of your UI if any is required. If you do not have one, leave it empty. This is useful when your extension
adds a feature to another extension.

### Permission

This is the permission required to see your extension. For example `readwrite_user` or anything you might need for your
extension to work as intended. If you do not need any permission, set to `any`.

### Section

When adding an extension to the `Settings` page, SailCMS allows you to choose where you add it to. By default, it's added
to the `others` section. But you can add to any of the 3 offered. `entries`, `emails` or `others`. Use the `SettingsElement` class
to define this in your call, this will always have the latest values and will avoid any invalid selection.