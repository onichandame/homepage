import { GatsbyConfig } from 'gatsby'

export default {
  siteMetadata: {
    author: 'onichandame',
  },
  jsxRuntime: `automatic`,
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `cn`],
        defaultLanguage: `en`,
        // you can pass any i18next options
        i18nextOptions: {
          preload: [`en`, `cn`],
          keySeparator: false,
          nsSeparator: false,
        },
      },
      pages: [
        {
          matchPath: '/:lang?/blogs/:uid',
          getLanguageFromPath: true,
          excludeLanguages: ['en', 'cn'],
        },
      ],
    },
  ],
} as GatsbyConfig
