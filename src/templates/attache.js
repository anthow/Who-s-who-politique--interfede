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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", width: "80%", margin: "40px auto" }}>
        <article style={{ display: "flex", gap: "40px" }}>
          <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <figure style={{ marginBottom: "20px" }}>
              {photo && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`${prNom} ${nom}`}
                  style={{ borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
              )}
            </figure>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {facebook && (
                <a href={facebook} aria-label="Facebook">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860465/logo%20RS/Facebook_Logo_2023_bosach.png"
                    alt="Facebook"
                  />
                </a>
              )}
              {instagram && (
                <a href={instagram} aria-label="Instagram">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860751/logo%20RS/Instagram_icon_p86ytx.png"
                    alt="Instagram"
                  />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} aria-label="LinkedIn">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860791/logo%20RS/LinkedIn_logo_initials_qgiyo2.png"
                    alt="LinkedIn"
                  />
                </a>
              )}
              {xTwitter && (
                <a href={xTwitter} aria-label="Twitter">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720861003/logo%20RS/sl_z_072523_61700_01_fjkzoq.jpg"
                    alt="Twitter"
                  />
                </a>
              )}
              {tikTok && (
                <a href={tikTok} aria-label="TikTok">
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1720867814/logo%20RS/TikTok_logo.svg_ccgee3.png"
                    alt="TikTok"
                  />
                </a>
              )}
            </div>
            {(numRoDeTLPhone || numRoDeTLPhone2) && (
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <figure>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1721915558/samples/tel-removebg-preview_aq5nhh.png"
                    alt="Phone"
                  />
                </figure>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {numRoDeTLPhone && <span style={{ color: "#4a4a4a" }}>{numRoDeTLPhone}</span>}
                  {numRoDeTLPhone2 && <span style={{ color: "#4a4a4a" }}>{numRoDeTLPhone2}</span>}
                </div>
              </div>
            )}
            {mail && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <figure>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png"
                    alt="Email"
                  />
                </figure>
                <p style={{ color: "#4a4a4a" }}>{mail}</p>
              </div>
            )}
            {adressePostale && (
              <p style={{ color: "#4a4a4a" }}>
                Adresse pro:
                <br /> {adressePostale}
              </p>
            )}
            {remarqueCoordonnEs && (
              <p style={{ fontStyle: "italic", color: "#6b7280" }}>
                Remarque Coordonnées: {remarqueCoordonnEs}
              </p>
            )}
          </section>
          <article style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>
                {prNom} {nom}
              </h1>
              <figure>
                {parti && parti.logo && (
                  <GatsbyImage
                    image={parti.logo.gatsbyImageData}
                    alt={`${parti.nom} logo`}
                    style={{ width: "60px", height: "100%" }}
                  />
                )}
              </figure>
            </section>
            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#1f2937" }}>
              {statut && statut.nom}
            </h2>

            {attach && attach.length > 0 && (
              <section style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {attach.map((attache, index) => (
                  <p
                    key={index}
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#ffffff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {attache.prNom} {attache.nom}
                  </p>
                ))}
                <p
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {fonctionAttach}
                </p>
              </section>
            )}
            {remarquesCommentaires && (
              <p style={{ color: "#4a4a4a" }}>{remarquesCommentaires}</p>
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
