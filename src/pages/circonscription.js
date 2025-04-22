import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const PARTY_ORDER = ["MR", "Les engagés", "PS", "PTB", "Ecolo"];

const CIRCONSCRIPTION_CLASSES = {
  "Nivelles": "fondNivelles",
  "Namur": "fondNamur",
  "Dinant-Philippeville": "fondDinantPhilippeville",
  "Arlon-Marche-en-Famenne-Bastogne-Neufchâteau-Virton": "fondArlonMarche",
  "Soignies-La Louvière": "fondSoigniesLaLouviere",
  "Mons": "fondMons",
  "Tournai-Ath-Mouscron": "fondTournaiAthMouscron",
  "Charleroi-Thuin": "fondCharleroiThuin",
  "Huy-Waremme": "fondHuyWaremme",
  "Liège": "fondLiege",
  "Verviers": "fondVerviers"
};

const Parlement = ({ data }) => {
  const membersByCirconscription = data.allDatoCmsPersonne.edges.reduce((acc, { node }) => {
    const circonscriptionName = node.circonscription.nom;
    if (!acc[circonscriptionName]) {
      acc[circonscriptionName] = [];
    }
    acc[circonscriptionName].push(node);
    return acc;
  }, {});

  const renderMembers = (members, circonscriptionClass, circonscriptionName) => {
    const sortedMembers = members.sort((a, b) => PARTY_ORDER.indexOf(a.parti.nom) - PARTY_ORDER.indexOf(b.parti.nom));

    return (
      <>
        <h2 className={`text-xl ${circonscriptionClass} text-black w-max p-2 rounded font-bold mb-4`}>
          {circonscriptionName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedMembers.map((node) => (
            <div
              key={node.id}
              className="flex flex-col bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={`../parlement/${node.url}`}
                className="flex flex-col items-center text-center"
              >
                <figure className="m-auto">
                  <GatsbyImage
                    image={node.photo.gatsbyImageData}
                    alt={node.photo.alt}
                    className="rounded-full mb-4"
                  />
                </figure>
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-semibold">
                    {node.prNom} {node.nom}
                  </h3>
                  <GatsbyImage
                    image={node.parti.logo.gatsbyImageData}
                    alt={`${node.parti.nom} logo`}
                    className="w-full h-auto max-w-[50px]" // Ajustez la largeur maximale selon vos besoins
                  />
                </div>
              </Link>
              <p className="text-sm text-gray-600 mt-2 text-center">{node.mail}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto py-10">
        {Object.entries(membersByCirconscription).map(([circonscriptionName, members]) =>
          members.length > 0 ? renderMembers(members, CIRCONSCRIPTION_CLASSES[circonscriptionName], circonscriptionName) : null
        )}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsPersonne(
      sort: { nom: ASC }
      filter: { actifInactif: { eq: false }, statut: { elemMatch: { nom: { eq: "Député wallon" } } } }
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
          mail
          parti {
            nom
            logo {
              gatsbyImageData(height: 20)
            }
          }
          circonscription {
            nom
          }
        }
      }
    }
  }
`;

export default Parlement;
