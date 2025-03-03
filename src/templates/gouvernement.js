import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons"; // Icônes de marques
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Icônes solides (Téléphone, Email)

const GouvernementPage = ({ data }) => {
  if (!data || !data.datoCmsPersonne || !data.allDatoCmsPersonne.nodes) {
    return <Layout>Data is not available</Layout>;
  }

  const personne = data.datoCmsPersonne;
  const attach = data.allDatoCmsPersonne.nodes[0]?.attach;

  return (
    <Layout>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "40px" }}>
          <article style={{ display: "flex", gap: "40px" }}>
            {/* Section gauche */}
            <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <figure style={{ marginBottom: "20px" }}>
                {personne.photo && (
                  <GatsbyImage
                    image={personne.photo.gatsbyImageData}
                    alt={personne.photo.alt || "Photo de la personne"}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </figure>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                {personne.facebook && (
                  <a href={personne.facebook}>
                    <FontAwesomeIcon icon={faFacebook} size="1x" aria-label="Facebook" />
                  </a>
                )}
                {personne.instagram && (
                  <a href={personne.instagram}>
                    <FontAwesomeIcon icon={faInstagram} size="1x" aria-label="Instagram" />
                  </a>
                )}
                {personne.linkedin && (
                  <a href={personne.linkedin}>
                    <FontAwesomeIcon icon={faLinkedin} size="1x" aria-label="LinkedIn" />
                  </a>
                )}
                {personne.xTwitter && (
                  <a href={personne.xTwitter}>
                    <FontAwesomeIcon icon={faTwitter} size="1x" aria-label="Twitter" />
                  </a>
                )}
                {personne.tikTok && (
                  <a href={personne.tikTok}>
                    <FontAwesomeIcon icon={faTiktok} size="1x" aria-label="TikTok" />
                  </a>
                )}
              </div>
              {(personne.numRoDeTLPhone || personne.numRoDeTLPhone2) && (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <FontAwesomeIcon icon={faPhone} size="1x" aria-label="Téléphone" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {personne.numRoDeTLPhone && <span>{personne.numRoDeTLPhone}</span>}
                    {personne.numRoDeTLPhone2 && <span>{personne.numRoDeTLPhone2}</span>}
                  </div>
                </div>
              )}
              {personne.mail && (
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px" }}>
                  <FontAwesomeIcon icon={faEnvelope} size="1x" aria-label="Email" />
                  <p>{personne.mail}</p>
                </div>
              )}
              {personne.mail2 && (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <p>{personne.mail2}</p>
                </div>
              )}
              {personne.adressePostale && (
                <p style={{ marginTop: "10px" }}>
                  Adresse pro:
                  <br /> {personne.adressePostale}
                </p>
              )}
              {personne.remarqueCoordonnEs && (
                <p style={{ fontStyle: "italic", color: "gray", marginTop: "10px" }}>
                  Remarque Coordonnées: {personne.remarqueCoordonnEs}
                </p>
              )}
            </section>

            {/* Section droite */}
            <article style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "100%" }}>
              <section style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "100%" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {personne.prNom} {personne.nom}
                </h1>
                <figure>
                  {personne.parti?.logo && (
                    <GatsbyImage
                      image={personne.parti.logo.gatsbyImageData}
                      alt={personne.parti.logo.alt || ""}
                      style={{ width: "60px", height: "auto" }}
                    />
                  )}
                </figure>
              </section>
              <h2 style={{ fontSize: "20px", width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {personne.statut?.nom}
              </h2>
              <h3
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  minWidth: "200px",
                  maxWidth: "100%",
                }}
              >
                {personne.ministRe}
              </h3>

              {personne.remarquesCommentaires && (
                <div style={{ marginTop: "50px" }}>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#a40044",
                      borderBottom: "1px solid #a40044",
                      paddingBottom: "5px",
                      marginBottom: "15px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Remarques / Commentaires
                  </h3>
                  <p>{personne.remarquesCommentaires}</p>
                </div>
              )}
            </article>
          </article>
        </div>

        {/* Attaché à cette personne */}
        <section style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Attaché à cette personne :</h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {data.allDatoCmsPersonne.nodes.map((attachedPerson) => (
              <li key={attachedPerson.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  to={`/attaches/${attachedPerson.url}`}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
                >
                  <GatsbyImage
                    image={attachedPerson.photo.gatsbyImageData}
                    alt={attachedPerson.photo.alt}
                    style={{ width: "50px", height: "auto", borderRadius: "50%" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      <p style={{ fontWeight: "bold" }}>{attachedPerson.nom}</p>
                      <p style={{ fontWeight: "bold" }}>{attachedPerson.prNom}</p>
                    </div>
                    <p style={{ fontSize: "14px" }}>{attachedPerson.fonctionAttach}</p>
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
      mail2
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
      commision {
        commision
      }
      circonscription {
        nom
      }
      remarquesCommentaires
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
