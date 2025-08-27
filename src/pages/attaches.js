import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import ExcelExport from "../components/ExcelExport";

const Attaches = ({ data }) => {
  // Fonction pour filtrer par parti
  const filterByParty = (partyName) =>
    data.allDatoCmsPersonne.edges.filter(
      ({ node }) => node.parti && node.parti.nom === partyName
    )

  const mrMembers = filterByParty("MR")
  const lesEngagesMembers = filterByParty("Les engagés")
  const psMembers = filterByParty("PS")
  const ptbMembers = filterByParty("PTB")
  const ecoloMembers = filterByParty("Ecolo")

  const renderMembers = (members, partyClass, partyName) => {
    if (!members || members.length === 0) return null

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl ${partyClass} text-white w-max p-2 rounded font-bold`}>
            {partyName}
          </h2>
          <ExcelExport 
            data={members} 
            filename="attaches" 
            sectionName={partyName.toLowerCase().replace(/\s+/g, '_')} 
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
                {node.attach && node.attach.length > 0 ? (
                  node.attach.map((attaché, index) => (
                    <h3 key={index} className="text-sm text-gray-600">
                      {attaché.prNom || "Prénom"} {attaché.nom || "Nom"}
                    </h3>
                  ))
                ) : (
                  <h3 className="text-gray-500">Pas de données d'attaché</h3>
                )}
                {node.fonctionAttach && <h4 className="text-sm text-gray-600">{node.fonctionAttach}</h4>}
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {/* Bouton d'export pour toute la page */}
        <div className="flex justify-end mb-6">
          <ExcelExport 
            data={data.allDatoCmsPersonne.edges} 
            filename="attaches_complet" 
          />
        </div>
        
        {/* Affichage normal par parti */}
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
        actifInactif: {eq: false}
        statut: {elemMatch: {nom: {eq: "attaché parlementaire"}}}
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
          attach {
            prNom
            nom
          }
          parti {
            nom
            logo {
              gatsbyImageData(height: 20)
            }
          }
          celluleCabinet {
            nom
          }
        }
      }
    }
  }
`;

export default Attaches;
