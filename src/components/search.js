import React from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch-hooks-web";

// Connexion à Algolia
const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
);

// Composant pour afficher les résultats
const Hit = ({ hit }) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
    <h4><Highlight attribute="prNom" hit={hit} /> <Highlight attribute="nom" hit={hit} /></h4>
    <p><Highlight attribute="statut.nom" hit={hit} /></p>
    <p><Highlight attribute="ministRe" hit={hit} /></p>
    <p><Highlight attribute="circonscription.nom" hit={hit} /></p>
  </div>  
);

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
      <SearchBox
        placeholder="Rechercher"
        style={{
          padding: "10px 20px",
          borderRadius: "25px",   // Bord arrondi
          border: "1px solid #ccc", // Bord gris clair
          width: "300px",  // Limite la largeur de l'input
          fontSize: "16px",
          outline: "none", // Supprime l'outline par défaut
        }}
        // Enlever l'icône de recherche (loupe) qui apparaît par défaut
        submit={<div />} 
      />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

export default Search;
