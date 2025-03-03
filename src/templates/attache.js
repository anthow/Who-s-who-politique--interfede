import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons"; // Icônes de marques
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Icônes solides (Téléphone, Email)

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
           <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                           {facebook && (
                             <a href={facebook}>
                               <FontAwesomeIcon icon={faFacebook} size="1x" aria-label="Facebook" />
                             </a>
                           )}
                           {instagram && (
                             <a href={instagram}>
                               <FontAwesomeIcon icon={faInstagram} size="1x" aria-label="Instagram" />
                             </a>
                           )}
                           {linkedin && (
                             <a href={linkedin}>
                               <FontAwesomeIcon icon={faLinkedin} size="1x" aria-label="LinkedIn" />
                             </a>
                           )}
                           {xTwitter && (
                             <a href={xTwitter}>
                               <FontAwesomeIcon icon={faTwitter} size="1x" aria-label="Twitter" />
                             </a>
                           )}
                           {tikTok && (
                             <a href={tikTok}>
                               <FontAwesomeIcon icon={faTiktok} size="1x" aria-label="TikTok" />
                             </a>
                           )}
                         </div>
                         {(numRoDeTLPhone || numRoDeTLPhone2) && (
                           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                             <FontAwesomeIcon icon={faPhone} size="1x" aria-label="Téléphone" />
                             <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                               {numRoDeTLPhone && <span>{numRoDeTLPhone}</span>}
                               {numRoDeTLPhone2 && <span>{numRoDeTLPhone2}</span>}
                             </div>
                           </div>
                         )}
                         {mail && (
                           <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                             <FontAwesomeIcon icon={faEnvelope} size="1x" aria-label="Email" />
                             <p>{mail}</p>
                           </div>
                         )}
                         {mail2 && (
                           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                             <FontAwesomeIcon icon={faEnvelope} size="1x" aria-label="Email 2" />
                             <p>{mail2}</p>
                           </div>
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
                marginBottom: "16px",
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
