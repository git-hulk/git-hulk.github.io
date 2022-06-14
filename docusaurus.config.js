/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hulk Dev Blog',
  url: 'https://hulkdev.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'git-hulk', // Usually your GitHub org/user name.
  projectName: 'git-hulk', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {}, 
        blog: {
          routeBasePath: '/',
          blogSidebarCount: 5,
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Engineering Hulk.`,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Engineering Hulk Blog',
        logo: {
          alt: 'Enginerring Hulk Blog',
          src: 'img/logo.svg',
        },
        items: [
          {to: 'archive', label: 'Archive', position: 'left'},
          // Please keep GitHub link to the right for consistency.
          {
            href: 'https://github.com/git-hulk',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contact',
            items: [
              {
                label: 'Weibo',
                href: 'https://weibo.com/u/2167039312',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/githulk',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/git-hulk',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Engineering Hulk, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    themes: [
        [require.resolve("@easyops-cn/docusaurus-search-local"), { hashed: true }],
    ]
};

module.exports = config;
