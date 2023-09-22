import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SailCMS",
  description: "Documentation",
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    lastUpdated: true,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Leeroy', link: 'https://leeroy.ca'}
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: '&copy 2023-present Leeroy Creative Agency'
    },

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/getting-started/' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Configuration', link: '/getting-started/configuration', collapsed: true, items: [
              { text: 'General', link: '/getting-started/configurations/general'},
              { text: 'Cache', link: '/getting-started/configurations/cache'},
              { text: 'Emails', link: '/getting-started/configurations/emails'},
              { text: 'Passwords', link: '/getting-started/configurations/passwords'},
              { text: 'CSRF', link: '/getting-started/configurations/csrf'},
              { text: 'GraphQL', link: '/getting-started/configurations/graphql'},
              { text: 'CORS', link: '/getting-started/configurations/cors'},
              { text: 'Session', link: '/getting-started/configurations/session'},
              { text: 'Templating', link: '/getting-started/configurations/templating'},
              { text: 'Two-Factor Authentication', link: '/getting-started/configurations/tfa'},
              { text: 'Logging', link: '/getting-started/configurations/logging'},
              { text: 'Assets', link: '/getting-started/configurations/assets'},
              { text: 'Entry', link: '/getting-started/configurations/entry'},
              { text: 'Users', link: '/getting-started/configurations/users'}
            ]}
        ]
      },
      {
        text: 'Content Management',
        collapsed: false,
        items: [
          { text: 'Entries', link: '/cms/entries' },
          { text: 'Fields', link: '/cms/fields' },
          { text: 'Categories', link: '/cms/categories' },
          { text: 'Users', link: '/cms/users/', items: [
              { text: 'Authentication', link: '/cms/users/authentication'},
              { text: 'User Meta', link: '/cms/users/meta'},
              { text: 'Roles', link: '/cms/users/roles'}
          ]}
        ]
      },
      {
        text: 'Working with SailCMS',
        collapsed: false,
        items: [
          { text: 'Boot', link: '/working-with-sail/boot'},
          { text: 'Request / Response', link: '/working-with-sail/request-response' },
          { text: 'Controllers', link: '/working-with-sail/controllers'},
          { text: 'Errors / Debugging', link: '/working-with-sail/errors-and-debugging' },
          { text: 'Logging', link: '/working-with-sail/logging' },
          { text: 'Routing', link: '/working-with-sail/routing' },
          { text: 'Dependency Injection', link: '/working-with-sail/di'},
          { text: 'Roles and Permissions', link: '/working-with-sail/roles-acl'},
          { text: 'Filesystem I/O', link: '/working-with-sail/io'},
          { text: 'Emails', link: '/working-with-sail/emails'},
          { text: 'Sessions', link: '/working-with-sail/sessions'},
          { text: 'Text', link: '/working-with-sail/text'},
          { text: 'Collections', link: '/working-with-sail/collections'},
          { text: 'Assets', link: '/working-with-sail/assets'},
          { text: 'Queue', link: '/working-with-sail/queue'},
          { text: 'Caching', link: '/working-with-sail/caching'},
          { text: 'Developer Tools', link: '/working-with-sail/devtools'},
        ]
      },
      {
        text: 'Commander (CLI)',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/cli/' },
          { text: 'Cron Jobs', link: '/cli/cron'}
        ]
      },
      {
        text: 'Extending SailCMS',
        collapsed: false,
        items: [
          { text: 'Containers', link: '/extending-sailcms/containers' },
          { text: 'Modules', link: '/extending-sailcms/modules' },
          { text: 'Middleware', link: '/extending-sailcms/middleware'},
          { text: 'Commander', link: '/extending-sailcms/cli' },
          { text: 'UI / SDK', link: '/extending-sailcms/ui'},
          { text: 'Package Development', link: '/extending-sailcms/package-dev'}
        ]
      },
      {
        text: 'Breeze',
        collapsed: false,
        items: [
          { text: 'ODM', link: '/breeze/odm' },
          { text: 'ActiveRecord', link: '/breeze/activerecord' },
          { text: 'Migrations', link: '/breeze/migrations'},
          { text: 'Views', link: '/breeze/views'}
        ]
      },
      {
        text: 'Sail-forms',
        collapsed: false,
        items: [
          { text: 'Form', link: '/forms/form' }
        ]
      },
      {
        text: 'Security',
        collapsed: false,
        items: [
          { text: 'Inputs', link: '/security/inputs' },
          { text: 'CSRF', link: '/security/csrf' },
          { text: 'Encryption', link: '/security/encryption'},
          { text: 'Two-Factor Authentication', link: '/security/two-factor'},
          { text: 'Basic Authentication', link: '/security/basic-auth'}
        ]
      },
      {
        text: 'Connectivity',
        collapsed: false,
        items: [
          { text: 'GraphQL', link: '/connectivity/graphql' },
          { text: 'REST', link: '/connectivity/rest' },
          { text: 'HTML (Twig)', link: '/connectivity/html' }
        ]
      },
      {
        text: 'Search',
        items: [
          { text: 'How it works', link: '/search/' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LeeroyLabs/sailcms' }
    ]
  }
})
