module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Allen Lee@Blog`,
    description: `This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@allenEyes`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              sizeByPixelDensity: true,
              disableBgImage: true,
              wrapperStyle: fluidResult =>
                `margin: 5px 10px; border: 0px solid transparent; display: block; position: relative;`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
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
            },
          },
        ],
        remarkPlugins: [require("remark-grid-tables")],
      },
    },
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
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
      options: {
        theme: {
          // material-ui theme
          palette: {
            primary: {
              main: "#BA3D3B", // or whatever colors you need
            },
          },
        },
      },
    },
  ],
};
