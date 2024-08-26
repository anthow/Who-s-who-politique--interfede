import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";

const GouvernementPage = ({ data }) => {
  if (!data || !data.datoCmsPersonne || !data.allDatoCmsPersonne.nodes) {
    return <Layout>Data is not available</Layout>;
  }

  const personne = data.datoCmsPersonne;
  const attach = data.allDatoCmsPersonne.nodes[0]?.attach;

  return (
    <Layout>
      <div className="w-10/12 m-auto">
        <div className="grid grid-cols-2 w-10/12 main m-auto mt-20 gap-10">
          <article className="flex gap-20">
            <section className="flex flex-col gap-5">
              <figure className="mb-10">
                {personne.photo && (
                  <GatsbyImage
                    image={personne.photo.gatsbyImageData}
                    alt={personne.photo.alt || ""}
                    className="rounded-lg shadow-lg"
                  />
                )}
              </figure>
              <div className="flex gap-2 flex-wrap">
                {personne.facebook && (
                  <a href={personne.facebook} aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860465/logo%20RS/Facebook_Logo_2023_bosach.png"
                      alt="Facebook"
                    />
                  </a>
                )}
                {personne.instagram && (
                  <a href={personne.instagram} aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860751/logo%20RS/Instagram_icon_p86ytx.png"
                      alt="Instagram"
                    />
                  </a>
                )}
                {personne.linkedin && (
                  <a href={personne.linkedin} aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860791/logo%20RS/LinkedIn_logo_initials_qgiyo2.png"
                      alt="LinkedIn"
                    />
                  </a>
                )}
                {personne.xTwitter && (
                  <a href={personne.xTwitter} aria-label="Twitter" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720861003/logo%20RS/sl_z_072523_61700_01_fjkzoq.jpg"
                      alt="Twitter"
                    />
                  </a>
                )}
                {personne.tikTok && (
                  <a href={personne.tikTok} aria-label="TikTok" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1720867814/logo%20RS/TikTok_logo.svg_ccgee3.png"
                      alt="TikTok"
                    />
                  </a>
                )}
              </div>
              {(personne.numRoDeTLPhone || personne.numRoDeTLPhone2) && (
                <div className="flex gap-2 items-center">
                  <figure>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1721915558/samples/tel-removebg-preview_aq5nhh.png"
                      alt="Phone"
                    />
                  </figure>
                  <div className="flex flex-col gap-1">
                    {personne.numRoDeTLPhone && <span className="text-gray-700">{personne.numRoDeTLPhone}</span>}
                    {personne.numRoDeTLPhone2 && <span className="text-gray-700">{personne.numRoDeTLPhone2}</span>}
                  </div>
                </div>
              )}
              {personne.mail && (
                <div className="flex gap-2 items-center">
                  <figure>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png"
                      alt="Email"
                    />
                  </figure>
                  <p className="text-gray-700">{personne.mail}</p>
                </div>
              )}
              {personne.adressePostale && (
                <p className="text-base font-medium text-gray-700">
                  Adresse pro:
                  <br /> {personne.adressePostale}
                </p>
              )}
              {personne.remarqueCoordonnEs && (
                <p className="text-base font-medium text-gray-500 italic">Remarque Coordonnées: {personne.remarqueCoordonnEs}</p>
              )}
            </section>
            <article className="flex flex-col gap-5">
              <section className="flex items-center gap-2">
                <h1 className="text-4xl font-bold text-gray-900">{personne.prNom} {personne.nom}</h1>
                <figure>
                  {personne.parti && personne.parti.logo && (
                    <GatsbyImage
                      image={personne.parti.logo.gatsbyImageData}
                      alt={personne.parti.logo.alt || ""}
                      className="w-10 h-10"
                    />
                  )}
                </figure>
              </section>
              <h2 className="text-3xl font-semibold text-gray-800">{personne.statut && personne.statut.nom}</h2>
              <h3 className="text-2xl font-bold headbleu p-2 text-white">{personne.ministRe}</h3>

              {attach && (
                <section className="flex flex-row gap-2">
                </section>
              )}
              <p className="text-lg font-medium text-gray-700">Nombre de Mandats: {personne.nombreDeMandats}</p>
              <p className="text-lg font-medium text-gray-700">Remarques: {personne.remarquesCommentaires}</p>
            </article>
          </article>
        </div>
        {attach && (
          <div className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-lg mt-10">
            <p className="font-medium">
              {attach.prNom} {attach.nom}
            </p>
            <p className="italic">{data.allDatoCmsPersonne.nodes[0].fonctionAttach}</p>
          </div>
        )}
        <section className="mt-10 flex flex-col gap-5">
          <h2 className="text-xl font-bold mb-5">Attaché à cette personne :</h2>
          <ul className="flex flex-wrap ml-5 gap-5">
            {data.allDatoCmsPersonne.nodes.map(attachedPerson => (
              <li key={attachedPerson.id} className="flex items-center gap-4 mt-4">
                <Link to={`/attaches/${attachedPerson.url}`} className="flex flex-col items-center gap-4">
                  <GatsbyImage
                    image={attachedPerson.photo.gatsbyImageData}
                    className="w-16 h-16 "
                    alt={attachedPerson.photo.alt}
                  />
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{attachedPerson.prNom} {attachedPerson.nom}</p>
                    <p className="text-sm text-gray-600">{attachedPerson.fonctionAttach}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PersonnePageQuery($id: String!) {
    datoCmsPersonne(id: { eq: $id }) {
      age
      circonscription {
        nom
        province {
          nom
        }
      }
      adressePostale
      commision {
        commision
      }
      facebook
      instagram
      id
      linkedin
      mail
      nom
      nomDeLaStructure
      nombreDeMandats
      numRoDeTLPhone
      ministRe
      numRoDeTLPhone2
      parti {
        logo {
          gatsbyImageData(width: 50)
        }
      }
      photo {
        gatsbyImageData(width: 200)
      }
      prNom
      remarqueCoordonnEs
      remarquesCommentaires
      siteInternet
      tikTok
      statut {
        nom
      }
      url
      ville {
        nom
      }
      xTwitter
    }
    allDatoCmsPersonne(filter: { attach: { elemMatch: { id: { eq: $id } } } }) {
      nodes {
        id
        url
        nom
        prNom
        fonctionAttach
        attach {
          nom
          prNom
        }
        photo {
          alt
          gatsbyImageData(height: 150)
        }
      }
    }
  }
`;

export default GouvernementPage;
