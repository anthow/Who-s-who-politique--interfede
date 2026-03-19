import React, { useState, useEffect } from 'react';
import Layout from "../components/layout";

const CommentairesPage = () => {
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer tous les commentaires de toutes les personnes
    const getAllComments = () => {
      const comments = [];
      
      // Parcourir tout le localStorage pour trouver les commentaires
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('comments_')) {
          const personneId = key.replace('comments_', '');
          const personneComments = JSON.parse(localStorage.getItem(key) || '[]');
          
          // Ajouter l'ID de la personne à chaque commentaire
          personneComments.forEach(comment => {
            comments.push({
              ...comment,
              personneId: personneId
            });
          });
        }
      }
      
      // Trier par date de publication (plus récents en premier)
      return comments.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
    };

    setAllComments(getAllComments());
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPersonneName = (personneId) => {
    // Essayer de récupérer le nom de la personne depuis le localStorage
    // ou afficher l'ID si pas de nom disponible
    return personneId || 'Personne inconnue';
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des commentaires...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de la page */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tous les commentaires
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les commentaires et remarques partagés par les visiteurs du site
          </p>
        </div>

        {/* Statistiques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{allComments.length}</div>
              <div className="text-sm text-gray-600">Total des commentaires</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {new Set(allComments.map(c => c.personneId)).size}
              </div>
              <div className="text-sm text-gray-600">Personnes commentées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {new Set(allComments.map(c => c.nomComplet)).size}
              </div>
              <div className="text-sm text-gray-600">Auteurs uniques</div>
            </div>
          </div>
        </div>

        {/* Liste des commentaires */}
        {allComments.length > 0 ? (
          <div className="space-y-6">
            {allComments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{comment.nomComplet}</h3>
                      <p className="text-sm text-gray-600">
                        Commentaire sur : <span className="font-medium">{getPersonneName(comment.personneId)}</span>
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                      {formatDate(comment.datePublication)}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 leading-relaxed">{comment.commentaire}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun commentaire pour le moment</h3>
            <p className="text-gray-600">
              Les premiers commentaires apparaîtront ici une fois que les visiteurs commenceront à partager leurs avis.
            </p>
          </div>
        )}

        {/* Bouton retour */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default CommentairesPage;

export const Head = () => (
  <>
    <title>Tous les commentaires - Who's Who politique</title>
    <meta name="description" content="Découvrez tous les commentaires et remarques partagés par les visiteurs du site Who's Who politique." />
  </>
);
