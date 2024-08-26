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
      <div className="grid grid-cols-2 w-10/12 main m-auto mt-20 gap-10">
        <article className="flex gap-20">
          <section className="flex flex-col gap-5">
            <figure className="mb-10">
              {photo && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`${prNom} ${nom}`}
                  className="rounded-lg shadow-lg"
                />
              )}
            </figure>
            <div className="flex gap-2">
              {facebook && (
                <a href={facebook} aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860465/logo%20RS/Facebook_Logo_2023_bosach.png"
                    alt="Facebook"
                  />
                </a>
              )}
              {instagram && (
                <a href={instagram} aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860751/logo%20RS/Instagram_icon_p86ytx.png"
                    alt="Instagram"
                  />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860791/logo%20RS/LinkedIn_logo_initials_qgiyo2.png"
                    alt="LinkedIn"
                  />
                </a>
              )}
              {xTwitter && (
                <a href={xTwitter} aria-label="Twitter" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720861003/logo%20RS/sl_z_072523_61700_01_fjkzoq.jpg"
                    alt="Twitter"
                  />
                </a>
              )}
              {tikTok && (
                <a href={tikTok} aria-label="TikTok" className="hover:opacity-80 transition-opacity">
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
                <div className="flex flex-col gap-1">
                  {numRoDeTLPhone && <span className="text-gray-700">{numRoDeTLPhone}</span>}
                  {numRoDeTLPhone2 && <span className="text-gray-700">{numRoDeTLPhone2}</span>}
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
                <p className="text-gray-700">{mail}</p>
              </div>
            )}
            {adressePostale && (
              <p className="text-gray-700">
                Adresse pro:
                <br /> {adressePostale}
              </p>
            )}
            {remarqueCoordonnEs && (
              <p className="text-gray-500 italic">Remarque Coordonnées: {remarqueCoordonnEs}</p>
            )}
          </section>
          <article className="flex flex-col gap-5">
            <section className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {prNom} {nom}
              </h1>
              <figure>
                {parti && parti.logo && (
                  <GatsbyImage
                    image={parti.logo.gatsbyImageData}
                    alt={`${parti.nom} logo`}
                    className="w-10 h-10"
                  />
                )}
              </figure>
            </section>
            <h2 className="text-xl font-semibold text-gray-800">{statut && statut.nom}</h2>

            {attach && attach.length > 0 && (
              <section className="flex flex-wrap gap-2">
                {attach.map((attache, index) => (
                  <p className="head text-white p-2 rounded" key={index}>
                    {attache.prNom} {attache.nom}
                  </p>
                ))}
                <p className="headbleu text-white p-2 rounded">{fonctionAttach}</p>
              </section>
            )}
            {remarquesCommentaires && (
              <p className="text-gray-700">{remarquesCommentaires}</p>
            )}
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
