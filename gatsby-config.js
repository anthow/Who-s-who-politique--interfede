module.exports = {
  siteMetadata: {
    title: `Who's Who politique de l'Interfédé`,
    description: `Your site description.`,
    author: `@yourhandle`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`, // TailwindCSS plugin

    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: `ef8b11eb04f95a34f545c89f1d3f01`, // Your DatoCMS read-only API token
        environment: `main`, // Replace with your environment if not 'main'
        previewMode: false, // Enable for draft content
        disableLiveReload: false, // Disable live reload on content changes
      },
    },

    // Add other plugins here
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto\:400,700`,
          `Montserrat\:400,700`,
        ],
        display: 'swap',
      },
    },
     // Add other plugins here
  ],
}
