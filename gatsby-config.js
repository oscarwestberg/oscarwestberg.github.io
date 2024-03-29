module.exports = {
  siteMetadata: {
    siteUrl: "https://oscarwestberg.se",
    title: "Oscar Westberg's portfolio",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `comics`,
        path: `${__dirname}/comics`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `work`,
        path: `${__dirname}/work`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      }
    },
    `gatsby-remark-images`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Oscar Westberg's portfolio",
        short_name: "Oscar Westberg",
        start_url: "/",
        icon: "src/images/logo.png",
      },
    },
    "gatsby-transformer-sharp",
    "@browniebroke/gatsby-image-gallery",
  ],
};
