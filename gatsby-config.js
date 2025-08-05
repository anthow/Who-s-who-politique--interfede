
module.exports = {
  siteMetadata: {
    title: `Who's Who politique de l'Interfédé`,
    description: `Découvrez les acteurs politiques de la Wallonie et de Bruxelles. Gouvernement, parlement, commissions et plus encore.`,
    author: `Interfédération des CISP`,
    siteUrl: `https://whoswho-politique.be`,
    image: `/gatsby-icon.png`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`, // TailwindCSS plugin

    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN || `ef8b11eb04f95a34f545c89f1d3f01`,
        environment: `main`,
        previewMode: false,
        disableLiveReload: false,
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto\:400,500,700`,
          `Montserrat\:400,500,600,700`,
        ],
        display: 'swap',
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Who's Who politique`,
        short_name: `Who's Who`,
        description: `Découvrez les acteurs politiques de la Wallonie et de Bruxelles`,
        start_url: `/`,
        background_color: `#a40044`,
        theme_color: `#a40044`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`,
      },
    },

    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
        queries: require("./src/utils/algolia-queries"),
        chunkSize: 10000,
      },
    },
  ],
}
