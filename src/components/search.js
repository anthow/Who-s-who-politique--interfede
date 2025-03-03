import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
);

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
      <SearchBox placeholder="Rechercher une personne..." />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

export default Search;
