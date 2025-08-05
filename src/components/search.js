import React from "react";
// import algoliasearch from "algoliasearch";
// import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch-hooks-web";

// Configuration Algolia temporairement désactivée
// const appId = process.env.GATSBY_ALGOLIA_APP_ID;
// const searchApiKey = process.env.GATSBY_ALGOLIA_SEARCH_API_KEY;
// const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;

// const searchClient = appId && searchApiKey 
//   ? algoliasearch(appId, searchApiKey)
//   : null;

// const Hit = ({ hit }) => (
//   <div 
//     className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
//     role="article"
//     aria-label={`Résultat: ${hit.prNom} ${hit.nom}`}
//   >
//     <h4 className="font-semibold text-lg mb-1">
//       <Highlight attribute="prNom" hit={hit} /> <Highlight attribute="nom" hit={hit} />
//     </h4>
//     {hit.statut?.nom && (
//       <p className="text-gray-600 mb-1">
//         <Highlight attribute="statut.nom" hit={hit} />
//       </p>
//     )}
//     {hit.ministRe && (
//       <p className="text-gray-600 mb-1">
//         <Highlight attribute="ministRe" hit={hit} />
//       </p>
//     )}
//     {hit.circonscription?.nom && (
//       <p className="text-gray-600">
//         <Highlight attribute="circonscription.nom" hit={hit} />
//       </p>
//     )}
//   </div>  
// );

const Search = () => {
  return (
    <div className="search-container">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          🔍 Fonction de recherche
        </h3>
        <p className="text-blue-700">
          La fonction de recherche est temporairement désactivée pour maintenance. 
          Vous pouvez naviguer directement vers les différentes sections du site.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="/gouvernement" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Gouvernement
          </a>
          <a href="/parlement" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Parlement
          </a>
          <a href="/commission" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Commission
          </a>
          <a href="/bureau" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Bureau
          </a>
          <a href="/federation" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Fédération
          </a>
          <a href="/attaches" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Attachés
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Search;
