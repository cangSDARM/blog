const esmRequire = require("./fuckNode");

module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    title: `Allen Lee@Blog`,
    description: `This is a personal blog.`,
    author: `@allenEyes`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet-async`,
    //https://www.gatsbyjs.org/packages/gatsby-plugin-templated-files/ 有bug
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              disableBgImage: true,
              wrapperStyle: (fluidResult) =>
                `margin: 5px 10px; border: 0px solid transparent; display: block; position: relative;`,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { isIconAfterHeader: true },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              languageExtensions: [
                {
                  language: "ShaderLab",
                  extend: "glsl",
                  definition: {
                    ShaderLab_types: /(ShaderLab)/,
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
        ],
        remarkPlugins: [
          esmRequire("remark-html-katex"),
          esmRequire("remark-math"),
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 80,
          placeholder: `blurred`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `allen-blog`,
        short_name: `blog`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {},
    },
  ],
};
