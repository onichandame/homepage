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
          defaultNS: `translation`,
          keySeparator: false,
          nsSeparator: `:`,
        },
      },
      pages: [
        {
          matchPath: '/:lang?/blogs/:uid',
          getLanguageFromPath: true,
        },
      ],
    },
  ],
} as GatsbyConfig
