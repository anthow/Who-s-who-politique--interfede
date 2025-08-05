import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ExcelExport from "../components/ExcelExport"

const Commission = ({ data }) => {
  const mrMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "MR"
  )

  const lesEngagesMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "Les engagés"
  )

  const psMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "PS"
  )

  const ptbMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "PTB"
  )

  const ecoloMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "Ecolo"
  )

  const renderMembers = (members, partyClass, partyName) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl ${partyClass} text-white w-max p-2 rounded font-bold`}>
          {partyName}
        </h2>
        {members.length > 0 && (
          <ExcelExport 
            data={members} 
            filename="commission" 
            sectionName={partyName.toLowerCase().replace(/\s+/g, '_')} 
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {members.map(({ node }) => (
          <Link
            to={`../commission/${node.url}`}
            key={node.id}
            className="flex flex-col bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <figure className="m-auto">
              <GatsbyImage
                image={node.photo.gatsbyImageData}
                alt={node.photo.alt}
                className="rounded-full mb-4"
              />
            </figure>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold">
                {node.prNom} {node.nom}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {/* Bouton d'export pour toute la page */}
        <div className="flex justify-end mb-6">
          <ExcelExport 
            data={data.allDatoCmsPersonne.edges} 
            filename="commission_complet" 
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
    allDatoCmsPersonne(
      sort: {nom: ASC}
      filter: {
        commision: { commision: { eq: "COMMISSION DE L'ÉCONOMIE, DE L'EMPLOI ET DE LA FORMATION" } }
        actifInactif: { eq: false }
        statut: { elemMatch: { nom: { eq: "Député wallon" } } }
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
          numRoDeTLPhone
          numRoDeTLPhone2
          mail
          mail2
          facebook
          instagram
          linkedin
          xTwitter
          tikTok
          remarquesCommentaires
          statut {
            nom
          }
          parti {
            nom
            logo {
              gatsbyImageData(height: 20)
            }
          }
        }
      }
    }
  }
`

export default Commission

export const Head = () => (
  <>
    <title>Commission emploi - Who's Who politique</title>
    <meta name="description" content="Découvrez les membres de la commission de l'économie, de l'emploi et de la formation du parlement wallon." />
  </>
) 