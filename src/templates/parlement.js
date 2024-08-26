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
      <div className="grid grid-cols-2  main m-auto mt-20">
        <article className="flex gap-20 col">
          <section className="flex flex-col gap-5">
            <figure className="mb-10 photo">
              {personne.photo && (
                <GatsbyImage
                  image={personne.photo.gatsbyImageData}
                  alt={personne.photo.alt || ''}
                  className=""
                />
              )}
            </figure>
            <div className="flex gap-2">
              {personne.facebook && (
                <a href={personne.facebook}>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860465/logo%20RS/Facebook_Logo_2023_bosach.png" alt="Facebook" className="" />
                </a>
              )}
              {personne.instagram && (
                <a href={personne.instagram}>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860751/logo%20RS/Instagram_icon_p86ytx.png" alt="Instagram" className="" />
                </a>
              )}
              {personne.linkedin && (
                <a href={personne.linkedin}>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860791/logo%20RS/LinkedIn_logo_initials_qgiyo2.png" alt="LinkedIn" className="" />
                </a>
              )}
              {personne.xTwitter && (
                <a href={personne.xTwitter}>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720861003/logo%20RS/sl_z_072523_61700_01_fjkzoq.jpg" alt="Twitter" className="" />
                </a>
              )}
              {personne.tikTok && (
                <a href={personne.tikTok}>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1720867814/logo%20RS/TikTok_logo.svg_ccgee3.png" alt="TikTok" className="" />
                </a>
              )}
            </div>
            {(personne.numRoDeTLPhone || personne.numRoDeTLPhone2) && (
              <div className="flex gap-2 items-center">
                <figure>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1721915558/samples/tel-removebg-preview_aq5nhh.png" alt="Phone" className="" />
                </figure>
                <div className="flex flex-col gap-2">
                  {personne.numRoDeTLPhone && <span>{personne.numRoDeTLPhone}</span>}
                  {personne.numRoDeTLPhone2 && <span>{personne.numRoDeTLPhone2}</span>}
                </div>
              </div>
            )}
            {personne.mail && (
              <div className="flex gap-2 items-center">
                <figure>
                  <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png" alt="Email" className="" />
                </figure>
                <p>{personne.mail}</p>
              </div>
            )}
            {personne.adressePostale && (
              <p>Adresse pro:<br /> {personne.adressePostale}</p>
            )}
            {personne.remarqueCoordonnEs && (
              <p>Remarque Coordonnées: {personne.remarqueCoordonnEs}</p>
            )}
          </section>
          <article className="flex flex-col gap-5">
            <section className="flex items-center gap-2">
              <h1 className="page">{personne.prNom} {personne.nom}</h1>
              <figure className="">
                {personne.parti && personne.parti.logo && (
                  <GatsbyImage
                    image={personne.parti.logo.gatsbyImageData}
                    alt={personne.parti.logo.alt || ''}
                    className=""
                  />
                )}
              </figure>
            </section>
            <h2 className="page">{personne.statut && personne.statut.nom}</h2>
            <h3 className="page">{personne.ministRe}</h3>

            {attach && (
              <section className="flex flex-row gap-2">
              </section>
            )}
            <p>Nombre de Mandats: {personne.nombreDeMandats}</p>
            <p>Remarques: {personne.remarquesCommentaires}</p>
          </article>
        </article>
      </div>
      {attach && (
        <div className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-lg">
          <p className="font-medium">
            {attach.prNom} {attach.nom}
          </p>
          <p className="italic">{data.allDatoCmsPersonne.nodes[0].fonctionAttach}</p>
        </div>
      )}
      <section>
        <h2 className="text-xl mt-10">Attaché à cette personne :</h2>
        <ul className="flex flex-wrap ml-5 gap-5">
          {data.allDatoCmsPersonne.nodes.map(attachedPerson => (
            <li key={attachedPerson.id} className="flex items-center gap-4 mt-4">
              <Link to={`/attaches/${attachedPerson.url}`} className="flex flex-col items-center gap-4">
                <GatsbyImage
                  image={attachedPerson.photo.gatsbyImageData}
                  className="w-10 h-10 rounded-full"
                  alt={attachedPerson.photo.alt}
                />
                <div>
                  <p className="font-semibold">{attachedPerson.nom}</p>
                  <p className="text-sm">{attachedPerson.fonctionAttach}</p>
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
