const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const attacheTemplate = path.resolve('./src/templates/attache.js');
  const gouvernementTemplate = path.resolve('./src/templates/gouvernement.js');
  const parlementTemplate = path.resolve('./src/templates/parlement.js');

  // Ministres du gouvernement wallon
  const gouvernement = graphql(`
    {
      allDatoCmsPersonne(
        filter: { statut: { elemMatch: { nom: { eq: "Ministre du gouverment wallon" } } } }
      ) {
        edges {
          node {
            url
            id
          }
        }
      }
    }
  `);

  // Députés wallons
  const depute = graphql(`
    {
      allDatoCmsPersonne(
        filter: { statut: { elemMatch: { nom: { eq: "Député wallon" } } } }
      ) {
        edges {
          node {
            url
            id
          }
        }
      }
    }
  `);

  // Attachés parlementaires
  const traite = graphql(`
    {
      allDatoCmsPersonne(
        filter: { statut: { elemMatch: { nom: { eq: "attaché parlementaire" } } } }
      ) {
        edges {
          node {
            url
            id
          }
        }
      }
    }
  `);

  // Attendre que toutes les requêtes GraphQL soient résolues
  const results = await Promise.all([gouvernement, depute, traite]);

  // Vérifier les erreurs pour chaque résultat
  results.forEach(result => {
    if (result.errors) {
      throw new Error(result.errors);
    }
  });

  // Créer des pages pour les ministres
  results[0].data.allDatoCmsPersonne.edges.forEach(({ node }) => {
    createPage({
      path: `gouvernement/${node.url}/`,
      component: gouvernementTemplate,
      context: { id: node.id },
    });
  });

  // Créer des pages pour les députés
  results[1].data.allDatoCmsPersonne.edges.forEach(({ node }) => {
    createPage({
      path: `parlement/${node.url}/`,
      component: parlementTemplate,
      context: { id: node.id },
    });
  });

  // Créer des pages pour les attachés parlementaires
  results[2].data.allDatoCmsPersonne.edges.forEach(({ node }) => {
    createPage({
      path: `attaches/${node.url}/`,
      component: attacheTemplate,
      context: { id: node.id },
    });
  });
};
