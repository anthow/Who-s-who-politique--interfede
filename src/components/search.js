import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch-hooks-web";

// Vérification des variables d'environnement
const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchApiKey = process.env.GATSBY_ALGOLIA_SEARCH_API_KEY;
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;

// Connexion à Algolia avec gestion d'erreur
const searchClient = appId && searchApiKey 
  ? algoliasearch(appId, searchApiKey)
  : null;

// Composant pour afficher les résultats
const Hit = ({ hit }) => (
  <div 
    className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
    role="article"
    aria-label={`Résultat: ${hit.prNom} ${hit.nom}`}
  >
    <h4 className="font-semibold text-lg mb-1">
      <Highlight attribute="prNom" hit={hit} /> <Highlight attribute="nom" hit={hit} />
    </h4>
    {hit.statut?.nom && (
      <p className="text-gray-600 mb-1">
        <Highlight attribute="statut.nom" hit={hit} />
      </p>
    )}
    {hit.ministRe && (
      <p className="text-gray-600 mb-1">
        <Highlight attribute="ministRe" hit={hit} />
      </p>
    )}
    {hit.circonscription?.nom && (
      <p className="text-gray-600">
        <Highlight attribute="circonscription.nom" hit={hit} />
      </p>
    )}
  </div>  
);

const Search = () => {
  const [hasError, setHasError] = useState(false);

  // Vérification des variables d'environnement
  if (!appId || !searchApiKey || !indexName) {
    if (!hasError) {
      console.warn("Variables d'environnement Algolia manquantes");
      setHasError(true);
    }
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-yellow-800">
          La recherche n'est pas configurée. Veuillez vérifier les variables d'environnement.
        </p>
      </div>
    );
  }

  if (!searchClient) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <p className="text-red-800">
          Erreur de connexion à Algolia. Veuillez réessayer plus tard.
        </p>
      </div>
    );
  }

  return (
    <div className="search-container">
      <InstantSearch 
        searchClient={searchClient} 
        indexName={indexName}
        aria-label="Recherche de personnes politiques"
      >
        <SearchBox
          placeholder="Rechercher une personne..."
          className="search-box"
          submit={
            <button 
              type="submit" 
              className="search-submit"
              aria-label="Lancer la recherche"
            >
              🔍
            </button>
          }
        />
        <div className="search-results">
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
      
      <style jsx>{`
        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .search-box {
          width: 100%;
          padding: 12px 20px;
          border-radius: 25px;
          border: 2px solid #e5e7eb;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        
        .search-box:focus {
          border-color: #a40044;
          box-shadow: 0 0 0 3px rgba(164, 0, 68, 0.1);
        }
        
        .search-submit {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
        }
        
        .search-results {
          margin-top: 20px;
          max-height: 400px;
          overflow-y: auto;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
        }
      `}</style>
    </div>
  );
};

export default Search;
