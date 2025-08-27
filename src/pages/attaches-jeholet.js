import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import ExcelExport from "../components/ExcelExport";

const AttachesJeholet = ({ data }) => {
  // Récupérer toutes les cellules disponibles
  const availableCellules = data.allDatoCmsCelluleCabinet.edges || []
  
  // Récupérer les attachés par cellule directement depuis GraphQL
  const secretariatCabinetMembers = data.secretariatCabinetMembers.edges || []
  const secretariatMinistreMembers = data.secretariatMinistreMembers.edges || []
  const transversaleMembers = data.transversaleMembers.edges || []
  const formationMembers = data.formationMembers.edges || []
  const communicationMembers = data.communicationMembers.edges || []
  const economieMembers = data.economieMembers.edges || []
  const emploiMembers = data.emploiMembers.edges || []
  

  
  // Trier chaque cellule : chefs en premier, puis par ordre alphabétique
  const sortMembers = (members) => {
    return members.sort((a, b) => {
      const aNode = a.node
      const bNode = b.node
      
      // Fonctions de chef en premier
      const aIsChef = aNode.fonctionAttach && (
        aNode.fonctionAttach.toLowerCase().includes("chef de cabinet") ||
        aNode.fonctionAttach.toLowerCase().includes("chef cabinet adjoint")
      )
      const bIsChef = bNode.fonctionAttach && (
        bNode.fonctionAttach.toLowerCase().includes("chef de cabinet") ||
        bNode.fonctionAttach.toLowerCase().includes("chef cabinet adjoint")
      )
      
      if (aIsChef && !bIsChef) return -1
      if (!aIsChef && bIsChef) return 1
      
      // Puis par ordre alphabétique
      return aNode.nom.localeCompare(bNode.nom)
    })
  }

  const sortedSecretariatCabinetMembers = sortMembers([...secretariatCabinetMembers])
  const sortedSecretariatMinistreMembers = sortMembers([...secretariatMinistreMembers])
  const sortedTransversaleMembers = sortMembers([...transversaleMembers])
  const sortedFormationMembers = sortMembers([...formationMembers])
  const sortedCommunicationMembers = sortMembers([...communicationMembers])
  const sortedEconomieMembers = sortMembers([...economieMembers])
  const sortedEmploiMembers = sortMembers([...emploiMembers])
  
  const renderMembers = (members, celluleName) => {
    if (!members || members.length === 0) return null;

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl fondMR text-white w-max p-2 rounded font-bold">
            {celluleName}
          </h2>
          <ExcelExport 
            data={members} 
            filename="attaches_jeholet" 
            sectionName={celluleName.toLowerCase().replace(/\s+/g, '_')} 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map(({ node }) => (
            <Link
              to={`../attaches/${node.url}`}
              key={node.id}
              className="flex flex-col bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <figure className="m-auto">
                {node.photo && node.photo.gatsbyImageData ? (
                  <GatsbyImage
                    image={node.photo.gatsbyImageData}
                    alt={node.photo.alt || "Photo"}
                    className="rounded-full mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                )}
              </figure>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold">
                  {node.prNom || "Prénom"} {node.nom || "Nom"}
                </h3>
                {node.fonctionAttach && (
                  <h4 className={`text-sm ${isChefFunction(node.fonctionAttach) ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                    {node.fonctionAttach}
                  </h4>
                )}
                
                
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  // Fonction pour vérifier si c'est une fonction de chef
  const isChefFunction = (fonction) => {
    if (!fonction) return false
    return fonction.toLowerCase().includes("chef de cabinet") || 
           fonction.toLowerCase().includes("chef cabinet adjoint")
  }

  // Combiner tous les membres pour l'export global
  const allMembers = [
    ...secretariatCabinetMembers, 
    ...secretariatMinistreMembers,
    ...transversaleMembers,
    ...formationMembers,
    ...communicationMembers,
    ...economieMembers,
    ...emploiMembers
  ]

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">




        {/* Bouton d'export pour toute la page */}
        <div className="flex justify-end mb-6">
          <ExcelExport 
            data={allMembers} 
            filename="attaches_jeholet_complet" 
          />
        </div>
        
        {/* Cellule emploi en premier */}
        {sortedEmploiMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedEmploiMembers, "Cellule emploi")}
          </div>
        )}

        {/* Cellule Formation en deuxième */}
        {sortedFormationMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedFormationMembers, "Cellule Formation")}
          </div>
        )}

        {/* Secrétariat de Cabinet */}
        {sortedSecretariatCabinetMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedSecretariatCabinetMembers, "Secrétariat de Cabinet")}
          </div>
        )}

        {/* Secrétariat du Ministre */}
        {sortedSecretariatMinistreMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedSecretariatMinistreMembers, "Secrétariat du Ministre")}
          </div>
        )}

        {/* Cellule transversale */}
        {sortedTransversaleMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedTransversaleMembers, "Cellule transversale")}
          </div>
        )}

        {/* Cellule communication */}
        {sortedCommunicationMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedCommunicationMembers, "Cellule communication")}
          </div>
        )}

        {/* Cellule économie */}
        {sortedEconomieMembers.length > 0 && (
          <div className="mb-12">
            {renderMembers(sortedEconomieMembers, "Cellule économie")}
          </div>
        )}

        {/* Message si aucun attaché Jeholet trouvé */}
        {allMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Aucun attaché Jeholet trouvé.</p>
            <p className="text-sm text-gray-400 mt-2">
              Vérifiez que la requête GraphQL retourne des données et que le filtre "JEHOLET" fonctionne.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    # Cellules disponibles
    allDatoCmsCelluleCabinet {
      edges {
        node {
          nom
        }
      }
    }

    # Secrétariat de Cabinet - Attachés Jeholet
    secretariatCabinetMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Secrétariat de Cabinet"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }

    # Secrétariat du Ministre - Attachés Jeholet
    secretariatMinistreMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Secrétariat du Ministre"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }

    # Cellule transversale - Attachés Jeholet
    transversaleMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Cellule transversale"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }

    # Cellule Formation - Attachés Jeholet
    formationMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Cellule Formation"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }

    # Cellule communication - Attachés Jeholet
    communicationMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Cellule communication"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }

    # Cellule économie - Attachés Jeholet
    economieMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Cellule économie"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }

    # Cellule emploi - Attachés Jeholet
    emploiMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
        attach: {elemMatch: {nom: {eq: "JEHOLET"}}}
        celluleCabinet: {elemMatch: {nom: {eq: "Cellule emploi"}}}
      }
    ) {
      edges {
        node {
          photo {
            alt
            gatsbyImageData(height: 100, width: 100)
          }
          url
          nom
          id
          fonctionAttach
          prNom
          celluleCabinet {
            nom
          }
        }
      }
    }
  }
`;

export default AttachesJeholet;

export const Head = () => (
  <>
    <title>Cabinet Jeholet - Who's Who politique</title>
    <meta name="description" content="Découvrez le cabinet de Jeholet classé par cellules spécialisées." />
  </>
);
