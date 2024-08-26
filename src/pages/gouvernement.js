import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const Gouvernement = ({ data }) => {
  // Filtrer les personnes par parti
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

  return (
    <Layout className="">
      <section className="w-10/12 flex flex-col gap-20 m-auto">
        {mrMembers.length > 0 && (
          <>
            <h2 className="text-xl fondMR text-white w-max p-2 rounded font-bold mb-4">Membres du MR</h2>
            
            <div className="flex flex-row gap-10">
              {mrMembers.map(({ node }) => (
                <Link to={`../gouvernement/${node.url}`} key={node.id} className="flex flex-col">
                  <figure className="m-auto">
                    <GatsbyImage
                      image={node.photo.gatsbyImageData}
                      alt={node.photo.alt}
                      className=""
                    />
                  </figure>
                  <div className="flex flex-row gap-2">
                    <h3>
                      {node.prNom} {node.nom}
                    </h3>
                    {node.parti?.logo && (
                      <figure className="">
                        <GatsbyImage
                          image={node.parti.logo.gatsbyImageData}
                          alt={`${node.nom} logo`}
                          className=""
                        />
                      </figure>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {lesEngagesMembers.length > 0 && (
          <>
        <h2 className="text-xl fondengage text-white w-max p-2 rounded font-bold mb-4">Membres des Engagés</h2>
        <div className="flex flex-row gap-10">
              {lesEngagesMembers.map(({ node }) => (
                <Link to={`../gouvernement/${node.url}`} key={node.id} className="flex flex-col">
                  <figure className="m-auto">
                    <GatsbyImage
                      image={node.photo.gatsbyImageData}
                      alt={node.photo.alt}
                      className=""
                    />
                  </figure>
                  <div className="flex flex-row gap-2">
                    <h3>
                      {node.prNom} {node.nom}
                    </h3>
                    {node.parti?.logo && (
                      <figure className="">
                        <GatsbyImage
                          image={node.parti.logo.gatsbyImageData}
                          alt={`${node.nom} logo`}
                          className=""
                        />
                      </figure>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {psMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Membres du parti PS</h2>
            <div className="flex flex-row gap-10">
              {psMembers.map(({ node }) => (
                <Link to={`../gouvernement/${node.url}`} key={node.id} className="flex flex-col">
                  <figure className="m-auto">
                    <GatsbyImage
                      image={node.photo.gatsbyImageData}
                      alt={node.photo.alt}
                      className=""
                    />
                  </figure>
                  <div className="flex flex-row gap-2">
                    <h3>
                      {node.prNom} {node.nom}
                    </h3>
                    {node.parti?.logo && (
                      <figure className="">
                        <GatsbyImage
                          image={node.parti.logo.gatsbyImageData}
                          alt={`${node.nom} logo`}
                          className=""
                        />
                      </figure>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {ptbMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Membres du parti PTB</h2>
            <div className="flex flex-row gap-10">
              {ptbMembers.map(({ node }) => (
                <Link to={`../gouvernement/${node.url}`} key={node.id} className="flex flex-col">
                  <figure className="m-auto">
                    <GatsbyImage
                      image={node.photo.gatsbyImageData}
                      alt={node.photo.alt}
                      className=""
                    />
                  </figure>
                  <div className="flex flex-row gap-2">
                    <h3>
                      {node.prNom} {node.nom}
                    </h3>
                    {node.parti?.logo && (
                      <figure className="">
                        <GatsbyImage
                          image={node.parti.logo.gatsbyImageData}
                          alt={`${node.nom} logo`}
                          className=""
                        />
                      </figure>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {ecoloMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Membres du parti Ecolo</h2>
            <div className="flex flex-row gap-10">
              {ecoloMembers.map(({ node }) => (
                <Link to={`../gouvernement/${node.url}`} key={node.id} className="flex flex-col">
                  <figure className="m-auto">
                    <GatsbyImage
                      image={node.photo.gatsbyImageData}
                      alt={node.photo.alt}
                      className=""
                    />
                  </figure>
                  <div className="flex flex-row gap-2">
                    <h3>
                      {node.prNom} {node.nom}
                    </h3>
                    {node.parti?.logo && (
                      <figure className="">
                        <GatsbyImage
                          image={node.parti.logo.gatsbyImageData}
                          alt={`${node.nom} logo`}
                          className=""
                        />
                      </figure>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {defiMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Membres du parti Défi</h2>
            <div className="flex flex-row gap-10">
              {defiMembers.map(({ node }) => (
                <Link to={`../gouvernement/${node.url}`} key={node.id} className="flex flex-col">
                  <figure className="m-auto">
                    <GatsbyImage
                      image={node.photo.gatsbyImageData}
                      alt={node.photo.alt}
                      className=""
                    />
                  </figure>
                  <div className="flex flex-row gap-2">
                    <h3>
                      {node.prNom} {node.nom}
                    </h3>
                    {node.parti?.logo && (
                      <figure className="">
                        <GatsbyImage
                          image={node.parti.logo.gatsbyImageData}
                          alt={`${node.nom} logo`}
                          className=""
                        />
                      </figure>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allDatoCmsPersonne(
      filter: { statut: { elemMatch: { nom: { eq: "Ministre du gouverment wallon" } } } }
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

export default Gouvernement;
