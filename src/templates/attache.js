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
    mail2
  } = data.datoCmsPersonne;

  return (
    <Layout>
            <div style={{ width: "80%", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "40px" }}>
            {/* Section gauche */}
            <article style={{ display: "flex", gap: "40px" }}>
            <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <figure  style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "auto",
                overflow: "hidden"
              }}>
              {photo && (
                <GatsbyImage
                  image={photo.gatsbyImageData}
                  alt={`${prNom} ${nom}`}
                  style={{  objectFit: "contain" }}
                  imgStyle={{ objectFit: "contain",  height: "auto" }}
                />
              )}
            </figure>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
                <figure>
                  <img
                    src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png"
                    alt="Email"
                  />
                </figure>
                <p>{mail}</p>
              </div>
            )}
              {mail2 && (
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <img src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png" alt="Email 2" />
                      <p>{mail2}</p>
                    </div>
                  )}
            {adressePostale && (
                <p style={{ marginTop: "10px" }}>
                Adresse pro:
                <br /> {adressePostale}
              </p>
            )}
            {remarqueCoordonnEs && (
                <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
                Remarque Coordonnées: {remarqueCoordonnEs}
              </p>
            )}
          </section>
                      {/* Section droite */}
          <article style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "100%" }}>
          <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          {prNom} {nom}
              </h1>
              <figure>
                {parti && parti.logo && (
                  <GatsbyImage
                    image={parti.logo.gatsbyImageData}
                    alt={`${parti.nom} logo`}
                    style={{ width: "60px", height: "auto" }}
                    />
                )}
              </figure>
            </section>
            <h2 style={{ fontSize: "20px", width: "auto", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {statut && statut.nom}
            </h2>

            {attach && attach.length > 0 && (
              <section style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {attach.map((attache, index) => (
                  <p
                    key={index}
                    style={{ padding: "10px", borderRadius: "5px", backgroundColor: "black", color: "white", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}                  >
                    {attache.prNom} {attache.nom}
                  </p>
                ))}
                <p
                  style={{
                    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#1e90ff",
    color: "white",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
                  }}
                >
                  {fonctionAttach}
                </p>
              </section>
            )}
                                          <div style={{ marginTop: "50px" }} >
                                          <h3 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#a40044",
                borderBottom: "1px solid #a40044",
                paddingBottom: "5px",
                marginBottom: "15px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Remarques / Commentaires
              </h3>   
            {remarquesCommentaires && (
         
              <p >{remarquesCommentaires}</p>
            )}
                          </div>

          </article>
        </article>
      </div>
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
      mail2
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
