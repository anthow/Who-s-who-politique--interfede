import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments || comments.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
        Commentaires ({comments.length})
      </h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
                             <div className="flex items-center space-x-2">
                 <span className="font-semibold text-gray-900">
                   {comment.nomComplet}
                 </span>
                 <span className="text-gray-400">•</span>
                 <span className="text-sm text-gray-500">
                   {formatDate(comment.datePublication)}
                 </span>
               </div>
            </div>
            
            <div className="text-gray-700 leading-relaxed">
              {comment.commentaire}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
