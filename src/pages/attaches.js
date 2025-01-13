import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const Parlement = ({ data }) => {
  // Fonction utilitaire pour filtrer les membres par parti
  const filterByParty = (partyName) =>
    data.allDatoCmsPersonne.edges.filter(
      ({ node }) => node.parti && node.parti.nom === partyName
    );

  // Fonction pour prioriser les membres avec "JEHOLET" dans attach.nom
  const prioritizeJeholet = (members) => {
    return members.sort(({ node: a }, { node: b }) => {
      const aHasJeholet = a.attach.some((attaché) => attaché.nom === "JEHOLET");
      const bHasJeholet = b.attach.some((attaché) => attaché.nom === "JEHOLET");

      if (aHasJeholet && !bHasJeholet) return -1;
      if (!aHasJeholet && bHasJeholet) return 1;
      return a.nom.localeCompare(b.nom); // Sinon, trier par ordre alphabétique
    });
  };

  // Filtrage et tri par parti
  const partyMembers = {
    MR: prioritizeJeholet(filterByParty("MR")),
    LesEngages: prioritizeJeholet(filterByParty("Les engagés")),
    PS: prioritizeJeholet(filterByParty("PS")),
    Ecolo: prioritizeJeholet(filterByParty("Ecolo")),
    Defi: prioritizeJeholet(filterByParty("Défi")),
    PTB: prioritizeJeholet(filterByParty("PTB")),
  };

  // Fonction pour afficher les membres d'un parti
  const renderMembers = (members, partyClass, partyName) => {
    if (!members || members.length === 0) return null;

    return (
      <>
        <h2 className={`text-xl ${partyClass} text-white w-max p-2 rounded font-bold mb-4`}>
          {partyName}
        </h2>
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
                    <h3 key={index}>
                      {attaché.prNom || "Prénom"} {attaché.nom || "Nom"}
                    </h3>
                  ))
                ) : (
                  <h3 className="text-gray-500">Pas de données d'attaché</h3>
                )}
                {node.fonctionAttach && <h4>{node.fonctionAttach}</h4>}
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <Layout>
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {Object.entries(partyMembers).map(([partyName, members]) =>
          renderMembers(
            members,
            `fond${partyName}`,
            partyName.replace(/([A-Z])/g, " $1").trim()
          )
        )}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsPersonne(
      sort: { attach: { nom: ASC } }
      filter: { statut: { elemMatch: { nom: { eq: "attaché parlementaire" } } } }
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
        }
      }
    }
  }
`;

export default Parlement;
