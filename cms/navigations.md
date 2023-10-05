# Navigations

SailCMS offers an easy to create and manage navigations and sub navigations for your project. You can create headers,
sidebars and footers. If you are using our official SailCMS UI, you can do all of that using a nice drag and drop interface.

## Fetching a navigation in your project

A navigation contains some information for you in the admin panel but information for you on the frontend when fetching one.

Here is an example of how to get a navigation using the Twig engine:

```twig
{% set header = navigation('header_slug') %}

{% for item in header %}
    <!-- Your HTML HERE -->
{% endfor %}
```

You can also get a navigation using GraphQL is your project is using SailCMS in headless mode using the `navigation`
query. It requires you to pass the navigation's slug. When found, it returns a structure that looks like this:

```json
[
    {
        "label": "Lorem Ipsum",
        "url": "https://othersite.com/item-url",
        "is_entry": false,
        "is_category": false,
        "entry_id": "",
        "external": true,
        "children": [
            {
                // Repeated Structure
            }
        ]
        
    }
]
```