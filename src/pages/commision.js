import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";

const Parlement = ({ data }) => {
  // Groupement des membres par parti
  const partyGroups = [
    { name: "MR", className: "fondMR", members: filterMembersByParty("MR") },
    { name: "Les Engagés", className: "fondengage", members: filterMembersByParty("Les engagés") },
    { name: "PS", className: "fondPS", members: filterMembersByParty("PS") },
    { name: "Ecolo", className: "fondEcolo", members: filterMembersByParty("Ecolo") },
    { name: "PTB", className: "fondPTB", members: filterMembersByParty("PTB") },
  ];

  // Fonction pour filtrer les membres par parti et séparer effectifs/suppléants/invités
  function filterMembersByParty(partyName) {
    const allMembers = data.allDatoCmsPersonne.edges.filter(
      ({ node }) => node.parti.nom === partyName
    );
    return {
      effectifs: allMembers.filter(
        ({ node }) =>
          node.effectifOuSupplAnt && node.effectifOuSupplAnt.nom === "Effectif(ve)"
      ),
      suppleants: allMembers.filter(
        ({ node }) =>
          node.effectifOuSupplAnt && node.effectifOuSupplAnt.nom === "Suppléant(e)"
      ),
      invite: allMembers.filter(
        ({ node }) =>
          node.effectifOuSupplAnt && node.effectifOuSupplAnt.nom === "Invité(e)"
      ),
    };
  }

  // Fonction pour afficher les membres d'un groupe (effectifs/suppléants/invités)
  const renderGroupMembers = (members, title) => {
    if (members.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-6 mt-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map(({ node }) => (
            <Link
              to={`../parlement/${node.url}`}
              key={node.id}
              className="flex flex-col bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <figure className="m-auto">
                <GatsbyImage
                  image={node.photo.gatsbyImageData}
                  alt={node.photo.alt || "Photo"}
                  className="rounded-full mb-4"
                />
              </figure>
              <div className="flex flex-col items-center text-center">
                <h4 className="text-md font-semibold">
                  {node.prNom} {node.nom}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // Fonction pour afficher les membres d'un parti avec sections pour effectifs, suppléants et invités
  const renderPartyMembers = (party) => {
    const { name, className, members } = party;
    return (
      <div key={name}>
        <h2
          className={`text-xl ${className} text-white w-max p-2 rounded font-bold mb-4`}
        >
          {name}
        </h2>
        {renderGroupMembers(members.effectifs, "Effectif(ve)s")}
        {renderGroupMembers(members.suppleants, "Suppléant(e)s")}
        {renderGroupMembers(members.invite, "Invité(e)s")}
      </div>
    );
  };

  return (
    <Layout>
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {partyGroups.map((party) => renderPartyMembers(party))}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsPersonne(
      sort: { fields: [effectifOuSupplAnt___nom, nom] }
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
          effectifOuSupplAnt {
            nom
          }
          id
          prNom
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
