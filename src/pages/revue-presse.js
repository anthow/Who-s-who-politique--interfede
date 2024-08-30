import React from "react";
import { graphql } from "gatsby";

// Fonction pour décoder les entités HTML
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Page = ({ data }) => {
  const articles = data.allDatoCmsRevueDePresse.edges;

  return (
    <div className="revue-de-presse-page container">
      {/* Titre de la page */}
      {articles.length > 0 && (
        <h1 className="title">Revue de presse</h1>
      )}

      {articles.map(({ node }, index) => (
        <div key={index} className="article">
          {/* Décodage et affichage du contenu de chaque article */}
          <div
            dangerouslySetInnerHTML={{ __html: decodeHTML(node.contenuNode.internal.content) }}
            className="article-content"
          />
        </div>
      ))}
    </div>
  );
};

export const query = graphql`
  query MyQuery {
    allDatoCmsRevueDePresse(sort: {meta: {createdAt: DESC}}, limit: 1) {      
      edges {
        node {
          contenuNode {
            internal {
              content
            }
          }
        }
      }
    }
  }
`;

export default Page;
