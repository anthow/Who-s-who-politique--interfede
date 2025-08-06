import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const CommentEditor = ({ comment, personneId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedComment(comment);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Appel à l'API DatoCMS pour mettre à jour le commentaire
      const response = await fetch('/api/update-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personneId,
          remarquesCommentaires: editedComment,
        }),
      });

      if (response.ok) {
        onUpdate(editedComment);
        setIsEditing(false);
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du commentaire');
    } finally {
      setIsLoading(false);
    }
  };

  if (!comment) return null;

  return (
    <div className="comment-section">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 border-b-2 border-red-600 pb-2">
          Remarques / Commentaires
        </h3>
        <button
          onClick={handleEdit}
          className="text-blue-600 hover:text-blue-800 transition-colors p-2"
          title="Modifier le commentaire"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            rows="6"
            placeholder="Entrez vos remarques ou commentaires..."
          />
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faSave} />
              <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
              <span>Annuler</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4">
          <p className="text-gray-700 leading-relaxed">{comment}</p>
        </div>
      )}
    </div>
  );
};

export default CommentEditor; 