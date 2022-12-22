const { description } = require('../../package');

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'SailCMS 3.0.0',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,
    dest: './dist',

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', { name: 'theme-color', content: '#1d4ed8' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],

    theme: 'default-prefers-color-scheme',

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: '',
        editLinks: false,
        prefersTheme: 'light',
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        activeHeaderLinks: false,
        nav: [
            {
                text: 'Guide',
                link: '/getting-started/'
            }
        ],
        sidebar: [
            {
                title: 'Getting Started',
                path: '/getting-started/',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/getting-started/',
                    '/getting-started/installation',
                    '/getting-started/configuration'
                ]
            },
            {
                title: 'Working with Sail',
                path: '/working-with-sail/errors-and-debugging',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/working-with-sail/request-response',
                    '/working-with-sail/errors-and-debugging',
                    '/working-with-sail/logging',
                    '/working-with-sail/containers',
                    '/working-with-sail/routing',
                    '/working-with-sail/modules',
                    '/working-with-sail/cli',
                    '/working-with-sail/database-models',
                    '/working-with-sail/roles-acl',
                    '/working-with-sail/io',
                    '/working-with-sail/emails',
                    '/working-with-sail/sessions',
                    '/working-with-sail/text',
                    '/working-with-sail/collections',
                    '/working-with-sail/assets',
                    '/working-with-sail/queue',
                    '/working-with-sail/caching',
                    '/working-with-sail/devtools'
                ]
            },
            {
                title: 'Connectivity',
                path: '/connectivity/graphql',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/connectivity/graphql',
                    '/connectivity/rest'
                ]
            },
            {
                title: 'Security',
                path: '/security/two-factor',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/security/two-factor',
                    '/security/inputs',
                    '/security/encryption',
                    '/security/csrf'
                ]
            },
            {
                title: 'Templating',
                path: '/templating/',
                collapsable: false,
                sidebarDepth: 1
            },
            {
                title: 'Middleware',
                path: '/middleware/',
                collapsable: false,
                sidebarDepth: 1
            },
            {
                title: 'CMS',
                path: '/cms/entries',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/cms/entries',
                    '/cms/fields',
                    '/cms/categories',
                    '/cms/users/',
                    '/cms/users/authentication',
                    '/cms/users/meta'
                ]
            },
            {
                title: 'Search',
                path: '/search/',
                collapsable: false,
                sidebarDepth: 1
            }
        ]
    },
    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom'
    ]
};
