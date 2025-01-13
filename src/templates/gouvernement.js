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
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "40px" }}>
          <article style={{ display: "flex", gap: "40px" }}>
            {/* Section gauche */}
            <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <figure style={{ marginBottom: "20px" }}>
                {personne.photo && (
                  <GatsbyImage
                    image={personne.photo.gatsbyImageData}
                    alt={personne.photo.alt || ""}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </figure>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                {personne.facebook && (
                  <a href={personne.facebook}>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860465/logo%20RS/Facebook_Logo_2023_bosach.png"
                      alt="Facebook"
                    />
                  </a>
                )}
                {personne.instagram && (
                  <a href={personne.instagram}>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860751/logo%20RS/Instagram_icon_p86ytx.png"
                      alt="Instagram"
                    />
                  </a>
                )}
                {personne.linkedin && (
                  <a href={personne.linkedin}>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720860791/logo%20RS/LinkedIn_logo_initials_qgiyo2.png"
                      alt="LinkedIn"
                    />
                  </a>
                )}
                {personne.xTwitter && (
                  <a href={personne.xTwitter}>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,w_20/v1720861003/logo%20RS/sl_z_072523_61700_01_fjkzoq.jpg"
                      alt="Twitter"
                    />
                  </a>
                )}
                {personne.tikTok && (
                  <a href={personne.tikTok}>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1720867814/logo%20RS/TikTok_logo.svg_ccgee3.png"
                      alt="TikTok"
                    />
                  </a>
                )}
              </div>
              {(personne.numRoDeTLPhone || personne.numRoDeTLPhone2) && (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <figure>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1721915558/samples/tel-removebg-preview_aq5nhh.png"
                      alt="Phone"
                    />
                  </figure>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {personne.numRoDeTLPhone && <span>{personne.numRoDeTLPhone}</span>}
                    {personne.numRoDeTLPhone2 && <span>{personne.numRoDeTLPhone2}</span>}
                  </div>
                </div>
              )}
              {personne.mail && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                  <figure>
                    <img
                      src="https://res.cloudinary.com/docshhbla/image/upload/c_pad,h_20/v1722242440/email_q68wma.png"
                      alt="Email"
                    />
                  </figure>
                  <p>{personne.mail}</p>
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
            <article style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h1   style={{
    fontSize: "32px",
    width: "100%",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}>
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
              <h2 style={{ fontSize: "16px", fontWeight: "600" }}>{personne.statut?.nom}</h2>
              <h3 style={{ fontSize: "16px", fontWeight: "700", padding: "10px", backgroundColor: "#1e90ff", color: "white", borderRadius: "5px" }}>
                {personne.ministRe}
              </h3>

         
              <h3 style={{ fontSize: "18px", marginTop: "40px", fontWeight: "500" }}>
              Remarques: {personne.remarquesCommentaires}
</h3>
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
                  <div>
                    <p style={{ fontWeight: "bold" }}>{attachedPerson.prNom} {attachedPerson.nom}</p>
                    <p style={{ fontSize: "14px", color: "gray" }}>{attachedPerson.fonctionAttach}</p>
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
