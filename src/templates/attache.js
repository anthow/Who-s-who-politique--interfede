import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";

const GouvernementPage = ({ data }) => {
  if (!data || !data.datoCmsPersonne) {
    return <Layout>Data is not available</Layout>;
  }

  const {
    photo,
    facebook,
    instagram,
    linkedin,
    xTwitter,
    tikTok,
    numRoDeTLPhone,
    numRoDeTLPhone2,
    mail,
    adressePostale,
    remarqueCoordonnEs,
    prNom,
    nom,
    parti,
    statut,
    attach,
    fonctionAttach,
    remarquesCommentaires,
  } = data.datoCmsPersonne;

  return (
    <Layout>
      <div className="grid grid-cols-2 w-10/12 main m-auto mt-20">
        <article className="flex gap-20 col">
          <section className="flex flex-col gap-5">
            <figure className="mb-10 photo">
              {photo && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`${prNom} ${nom}`}
                />
              )}
            </figure>
            <div className="flex gap-2">
              {facebook && (
                <a href={facebook}>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860465/logo%20RS/Facebook_Logo_2023_bosach.png"
                    alt="Facebook"
                  />
                </a>
              )}
              {instagram && (
                <a href={instagram}>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860751/logo%20RS/Instagram_icon_p86ytx.png"
                    alt="Instagram"
                  />
                </a>
              )}
              {linkedin && (
                <a href={linkedin}>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860791/logo%20RS/LinkedIn_logo_initials_qgiyo2.png"
                    alt="LinkedIn"
                  />
                </a>
              )}
              {xTwitter && (
                <a href={xTwitter}>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720861003/logo%20RS/sl_z_072523_61700_01_fjkzoq.jpg"
                    alt="Twitter"
                  />
                </a>
              )}
              {tikTok && (
                <a href={tikTok}>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1720867814/logo%20RS/TikTok_logo.svg_ccgee3.png"
                    alt="TikTok"
                  />
                </a>
              )}
            </div>
            {(numRoDeTLPhone || numRoDeTLPhone2) && (
              <div className="flex gap-2 items-center">
                <figure>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1721915558/samples/tel-removebg-preview_aq5nhh.png"
                    alt="Phone"
                  />
                </figure>
                <div className="flex flex-col gap-2">
                  {numRoDeTLPhone && <span>{numRoDeTLPhone}</span>}
                  {numRoDeTLPhone2 && <span>{numRoDeTLPhone2}</span>}
                </div>
              </div>
            )}
            {mail && (
              <div className="flex gap-2 items-center">
                <figure>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png"
                    alt="Email"
                  />
                </figure>
                <p>{mail}</p>
              </div>
            )}
            {adressePostale && (
              <p>
                Adresse pro:
                <br /> {adressePostale}
              </p>
            )}
            {remarqueCoordonnEs && (
              <p>Remarque Coordonnées: {remarqueCoordonnEs}</p>
            )}
          </section>
          <article className="flex flex-col gap-5">
            <section className="flex items-center gap-2">
              <h1 className="page">
                {prNom} {nom}
              </h1>
              <figure>
                {parti && parti.logo && (
                  <GatsbyImage
                    image={parti.logo.gatsbyImageData}
                    alt={`${parti.nom} logo`}
                  />
                )}
              </figure>
            </section>
            <h2 className="page">{statut && statut.nom}</h2>
          
            {attach && attach.length > 0 && (
              <section className="flex gap-2">
                {attach.map((attache, index) => (
                  <p className="head text-white p-2" key={index}>
                    {attache.prNom} {attache.nom}
                  </p>
                ))}
                <p className="headbleu text-white p-2">{fonctionAttach}</p>
              </section>
            )}
            <p>{remarquesCommentaires}</p>
          </article>
        </article>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PersonnePageQuery($id: String!) {
    datoCmsPersonne(id: { eq: $id }) {
      prNom
      nom
      photo {
        gatsbyImageData(width: 200)
      }
      facebook
      instagram
      linkedin
      xTwitter
      tikTok
      numRoDeTLPhone
      numRoDeTLPhone2
      fonctionAttach
      mail
      adressePostale
      remarqueCoordonnEs
      parti {
        logo {
          gatsbyImageData(width: 50)
        }
      }
      statut {
        nom
      }
      ministRe
      attach {
        prNom
        nom
      }
      remarquesCommentaires
    }
  }
`;

export default GouvernementPage;
