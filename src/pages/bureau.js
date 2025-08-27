import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ExcelExport from "../components/ExcelExport"

const Bureau = ({ data }) => {
  // Récupérer directement les données filtrées par parti
  const mrMembers = data.mrMembers.edges || []
  const lesEngagesMembers = data.lesEngagesMembers.edges || []
  const psMembers = data.psMembers.edges || []
  const ptbMembers = data.ptbMembers.edges || []
  const ecoloMembers = data.ecoloMembers.edges || []

  const renderMembers = (members, partyClass, partyName) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl ${partyClass} text-white w-max p-2 rounded font-bold`}>
          {partyName}
        </h2>
        {members.length > 0 && (
          <ExcelExport
            data={members}
            filename="bureau"
            sectionName={partyName.toLowerCase().replace(/\s+/g, '_')}
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {members.map(({ node }) => (
          <Link
            to={`../bureau/${node.url}`}
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
            </div>
          </Link>
        ))}
      </div>
    </>
  )

  // Combiner tous les membres pour l'export global
  const allMembers = [
    ...mrMembers,
    ...lesEngagesMembers,
    ...psMembers,
    ...ptbMembers,
    ...ecoloMembers
  ]

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {/* Bouton d'export pour toute la page */}
        <div className="flex justify-end mb-6">
          <ExcelExport 
            data={allMembers} 
            filename="bureau_complet" 
          />
        </div>
        
        {mrMembers.length > 0 && renderMembers(mrMembers, "fondMR", "MR")}
        {lesEngagesMembers.length > 0 && renderMembers(lesEngagesMembers, "fondengage", "Engagés")}
        {psMembers.length > 0 && renderMembers(psMembers, "fondPS", "PS")}
        {ptbMembers.length > 0 && renderMembers(ptbMembers, "fondPTB", "PTB")}
        {ecoloMembers.length > 0 && renderMembers(ecoloMembers, "fondEcolo", "Ecolo")}
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    # MR - Bureau de parti
    mrMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "bureau de parti"}}}
        parti: {nom: {eq: "MR"}}
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
          prNom
        }
      }
    }

    # Les Engagés - Bureau de parti
    lesEngagesMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "bureau de parti"}}}
        parti: {nom: {eq: "Les engagés"}}
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
          prNom
        }
      }
    }

    # PS - Bureau de parti
    psMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "bureau de parti"}}}
        parti: {nom: {eq: "PS"}}
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
          prNom
        }
      }
    }

    # PTB - Bureau de parti
    ptbMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "bureau de parti"}}}
        parti: {nom: {eq: "PTB"}}
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
          prNom
        }
      }
    }

    # Ecolo - Bureau de parti
    ecoloMembers: allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "bureau de parti"}}}
        parti: {nom: {eq: "Ecolo"}}
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
          prNom
        }
      }
    }
  }
`

export default Bureau

export const Head = () => (
  <>
    <title>Bureau de parti - Who's Who politique</title>
    <meta name="description" content="Découvrez les membres du bureau de parti." />
  </>
)
