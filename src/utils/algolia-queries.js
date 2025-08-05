// Configuration Algolia temporairement désactivée
// const queries = [
//   {
//     query: `{
//       allDatoCmsPersonne {
//         edges {
//           node {
//             id
//             prNom
//             nom
//             ministRe
//             url
//             parti {
//               nom
//             }
//             statut {
//               nom
//             }
//             circonscription {
//               nom
//             }
//             photo {
//               alt
//             }
//           }
//         }
//       }
//     }`,
//     transformer: ({ data }) =>
//       data.allDatoCmsPersonne.edges.map(({ node }) => ({
//         objectID: node.id,
//         prNom: node.prNom,
//         nom: node.nom,
//         ministRe: node.ministRe,
//         url: node.url,
//         parti: node.parti?.nom,
//         statut: node.statut?.nom,
//         circonscription: node.circonscription?.nom,
//         photo: node.photo?.alt,
//       })),
//     indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME || 'personnes',
//     settings: {
//       attributesForFaceting: ['parti', 'statut', 'circonscription'],
//       searchableAttributes: ['prNom', 'nom', 'ministRe', 'parti', 'statut', 'circonscription'],
//     },
//   },
// ];

// module.exports = queries;

// Export vide pour éviter les erreurs
module.exports = []; 