const { SiteClient } = require('datocms-client');

exports.handler = async (event, context) => {
  // Autoriser les requêtes CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Vérifier que c'est une requête POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  try {
    const { nomComplet, commentaire, personneId } = JSON.parse(event.body);

    // Validation des données
    if (!nomComplet || !commentaire || !personneId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Données manquantes' }),
      };
    }

    // Initialiser le client DatoCMS
    const client = new SiteClient(process.env.DATOCMS_API_TOKEN);

    // Créer le commentaire dans DatoCMS
    const comment = await client.items.create({
      itemType: 'commentaire', // Assurez-vous que ce modèle existe dans DatoCMS
      nomComplet: nomComplet,
      commentaire: commentaire,
      personne: personneId, // Relation vers la personne
      datePublication: new Date().toISOString(),
      statut: 'published'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        comment: {
          id: comment.id,
          nomComplet: comment.nomComplet,
          commentaire: comment.commentaire,
          datePublication: comment.datePublication,
          personne: comment.personne
        }
      }),
    };

  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erreur interne du serveur',
        details: error.message 
      }),
    };
  }
};
