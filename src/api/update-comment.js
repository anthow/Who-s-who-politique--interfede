// API endpoint pour mettre à jour les commentaires dans DatoCMS
// Netlify Function

const DATOCMS_API_TOKEN = process.env.DATOCMS_API_TOKEN;

exports.handler = async (event, context) => {
  // Vérifier que c'est une requête POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  try {
    const { personneId, remarquesCommentaires } = JSON.parse(event.body);

    if (!personneId || !remarquesCommentaires) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Données manquantes' }),
      };
    }

    // Appel à l'API DatoCMS pour mettre à jour la personne
    const response = await fetch(`https://site-api.datocms.com/items/${personneId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${DATOCMS_API_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Version': '2',
      },
      body: JSON.stringify({
        item: {
          remarques_commentaires: remarquesCommentaires,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur DatoCMS:', errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Erreur lors de la mise à jour dans DatoCMS',
          details: errorData 
        }),
      };
    }

    const updatedData = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        data: updatedData,
      }),
    };

  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erreur interne du serveur',
        message: error.message 
      }),
    };
  }
}; 