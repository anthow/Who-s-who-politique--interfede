import React, { useState, useEffect } from 'react';

const CommentModule = ({ personneId }) => {
  const [formData, setFormData] = useState({
    nomComplet: '',
    commentaire: ''
  });
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Charger les commentaires existants
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${personneId}`) || '[]');
    setComments(storedComments);
  }, [personneId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const commentData = {
        id: Date.now().toString(),
        nomComplet: formData.nomComplet,
        commentaire: formData.commentaire,
        personne: personneId,
        datePublication: new Date().toISOString(),
        statut: 'published'
      };

      // Stockage en localStorage
      const updatedComments = [...comments, commentData];
      localStorage.setItem(`comments_${personneId}`, JSON.stringify(updatedComments));
      
      // Mettre à jour l'état local
      setComments(updatedComments);

      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));

      setFormData({ nomComplet: '', commentaire: '' });
      setMessage('Commentaire ajouté avec succès !');
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de l\'ajout du commentaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="mt-8 space-y-6">
      {/* En-tête du module */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            Commentaires et remarques
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Partagez vos observations ou ajoutez des informations
          </p>
        </div>

        {/* Liste des commentaires existants */}
        {comments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <div key={comment.id} className="px-6 py-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{comment.nomComplet}</h5>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.datePublication).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.commentaire}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
            <p className="text-sm text-gray-400 mt-1">Soyez le premier à partager votre avis !</p>
          </div>
        )}
      </div>

      {/* Formulaire d'ajout */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
          <h4 className="text-md font-medium text-blue-900">
            Ajouter un commentaire
          </h4>
          <p className="text-sm text-blue-700 mt-1">
            Remplissez le formulaire ci-dessous pour partager votre avis
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700 mb-1">
                Votre nom complet *
              </label>
              <input
                type="text"
                id="nomComplet"
                name="nomComplet"
                value={formData.nomComplet}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom complet"
              />
            </div>
            
            <div>
              <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700 mb-1">
                Commentaire *
              </label>
              <textarea
                id="commentaire"
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre commentaire ou remarque..."
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Envoi...' : 'Publier le commentaire'}
              </button>
              
              {message && (
                <span className={`text-sm px-3 py-1 rounded-full ${
                  message.includes('succès') 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {message}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModule;
