# Who's Who politique de l'Interfédé

Site web pour découvrir les acteurs politiques de la Wallonie et de Bruxelles.

## 🚀 Fonctionnalités

- **Pages de profils** : Gouvernement, parlement, commission, bureau, fédération, attachés
- **Commentaires modifiables** : Édition en temps réel des remarques/commentaires
- **Export Excel** : Export des données de contact
- **Design responsive** : Adaptation mobile/desktop
- **Recherche** : Fonction de recherche (temporairement désactivée)

## 📝 Commentaires modifiables

Les commentaires sont maintenant modifiables directement depuis le site :

1. **Bouton d'édition** : Cliquez sur l'icône d'édition à côté de "Remarques / Commentaires"
2. **Zone de texte** : Modifiez le contenu dans la zone de texte
3. **Sauvegarde** : Cliquez sur "Sauvegarder" pour envoyer à DatoCMS
4. **Annulation** : Cliquez sur "Annuler" pour revenir à l'état précédent

## 🔧 Configuration

### Variables d'environnement Netlify

Ajoutez ces variables dans les paramètres Netlify :

```bash
DATOCMS_API_TOKEN=your_datocms_api_token
```

### API Token DatoCMS

1. Allez dans votre projet DatoCMS
2. Settings > API tokens
3. Créez un token avec les permissions :
   - Read/Write access to content
   - Read access to content types

## 🛠️ Développement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run develop

# Build pour production
npm run build
```

## 📁 Structure

```
src/
├── components/
│   ├── CommentEditor.js    # Éditeur de commentaires
│   ├── ExcelExport.js      # Export Excel
│   └── layout.js           # Layout principal
├── templates/
│   ├── parlement.js        # Template parlement
│   ├── gouvernement.js     # Template gouvernement
│   ├── bureau.js          # Template bureau
│   ├── federation.js      # Template fédération
│   └── attache.js         # Template attaché
└── api/
    └── update-comment.js   # API pour mettre à jour les commentaires
```

## 🔒 Sécurité

- Les API tokens sont stockés dans les variables d'environnement Netlify
- Validation des données côté serveur
- Gestion des erreurs et feedback utilisateur

## 🎨 Design

- **Framework** : Gatsby + React
- **Styling** : Tailwind CSS
- **CMS** : DatoCMS
- **Déploiement** : Netlify
