import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const Parlement = ({ data }) => {
  const mrMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "MR"
  );

  const lesEngagesMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "Les engagés"
  );

  const psMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "PS"
  );

  const ecoloMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "Ecolo"
  );

  const defiMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "Défi"
  );

  const ptbMembers = data.allDatoCmsPersonne.edges.filter(
    ({ node }) => node.parti.nom === "PTB"
  );

  const renderMembers = (members, partyClass, partyName) => (
    <>
      <h2 className={`text-xl ${partyClass} text-white w-max p-2 rounded font-bold mb-4`}>
         {partyName}
      </h2>
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
  );

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {mrMembers.length > 0 && renderMembers(mrMembers, "fondMR", "MR")}
        {lesEngagesMembers.length > 0 && renderMembers(lesEngagesMembers, "fondengage", "Engagés")}
        {psMembers.length > 0 && renderMembers(psMembers, "fondPS", "PS")}
        {ecoloMembers.length > 0 && renderMembers(ecoloMembers, "fondEcolo", "Ecolo")}
        {defiMembers.length > 0 && renderMembers(defiMembers, "fondDefi", "Défi")}
        {ptbMembers.length > 0 && renderMembers(ptbMembers, "fondPTB", "PTB")}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsPersonne(
            sort: {nom: ASC}
    filter: {commision: {commision: {eq: "COMMISSION DE L'ÉCONOMIE, DE L'EMPLOI ET DE LA FORMATION"}}, statut: {elemMatch: {nom: {eq: "Député wallon"}}}}
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
