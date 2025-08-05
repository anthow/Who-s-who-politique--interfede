# Who's Who politique - Interfédération des CISP

Un site web moderne pour découvrir les acteurs politiques de la Wallonie et de Bruxelles, développé avec Gatsby et DatoCMS.

## 🚀 Fonctionnalités

- **Navigation responsive** avec menu mobile
- **Recherche avancée** avec Algolia
- **Authentification sécurisée** avec mot de passe
- **Design moderne** avec Tailwind CSS
- **Performance optimisée** avec Gatsby
- **CMS headless** avec DatoCMS
- **SEO optimisé** avec métadonnées complètes

## 🛠️ Technologies utilisées

- **Gatsby 5** - Framework React
- **DatoCMS** - CMS headless
- **Algolia** - Recherche avancée
- **Tailwind CSS** - Framework CSS
- **React** - Bibliothèque JavaScript
- **GraphQL** - API de requêtes

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone [url-du-repo]
   cd Who-s-who-politique--interfede
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp env.example .env
   ```
   
   Puis éditer le fichier `.env` avec vos clés API :
   ```env
   # DatoCMS
   DATOCMS_API_TOKEN=your_datocms_api_token_here
   
   # Algolia
   GATSBY_ALGOLIA_APP_ID=your_algolia_app_id
   GATSBY_ALGOLIA_SEARCH_API_KEY=your_algolia_search_api_key
   GATSBY_ALGOLIA_ADMIN_API_KEY=your_algolia_admin_api_key
   GATSBY_ALGOLIA_INDEX_NAME=personnes
   
   # Sécurité
   GATSBY_SITE_PASSWORD=your_site_password_here
   
   # URL du site
   GATSBY_SITE_URL=https://whoswho-politique.be
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run develop
   ```

5. **Ouvrir le site**
   Naviguez vers [http://localhost:8000](http://localhost:8000)

## 🏗️ Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── layout.js       # Layout principal
│   ├── search.js       # Composant de recherche
│   └── pop_up.js       # Popup d'authentification
├── pages/              # Pages Gatsby
│   ├── index.js        # Page d'accueil
│   ├── gouvernement.js # Gouvernement wallon
│   ├── parlement.js    # Parlement wallon
│   ├── commission.js   # Commission emploi
│   └── ...
├── styles/             # Styles CSS
│   └── global.css      # Styles globaux
├── templates/          # Templates Gatsby
└── utils/              # Utilitaires
    └── algolia-queries.js
```

## 🎨 Personnalisation

### Couleurs des partis politiques

Les couleurs sont définies dans `src/styles/global.css` :

```css
:root {
  --color-mr: #012dfd;      /* MR */
  --color-engage: #00e7d1;  /* Les Engagés */
  --color-ps: #ff0000;      /* PS */
  --color-ecolo: #66b649;   /* Ecolo */
  --color-ptb: #ee3f32;     /* PTB */
  --color-defi: #dd007a;    /* Défi */
}
```

### Ajout d'un nouveau parti

1. Ajouter la couleur dans `src/styles/global.css`
2. Créer la classe CSS correspondante
3. Mettre à jour les composants qui utilisent les partis

## 🔍 Recherche Algolia

Le site utilise Algolia pour la recherche avancée. Pour configurer :

1. Créer un compte Algolia
2. Configurer les variables d'environnement
3. Indexer les données avec `npm run build`

## 🔐 Sécurité

- **Authentification** : Popup de mot de passe sécurisé
- **Variables d'environnement** : Toutes les clés API sont externalisées
- **HTTPS** : Recommandé en production

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile-first** design
- **Menu hamburger** sur mobile
- **Grilles adaptatives** avec Tailwind CSS
- **Images optimisées** avec Gatsby Image

## 🚀 Déploiement

### Netlify (recommandé)

1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes

Le site peut être déployé sur :
- Vercel
- Gatsby Cloud
- AWS S3 + CloudFront
- Surge.sh

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Vérifier le formatage
npm run format

# Nettoyer le cache
npm run clean
```

## 📈 Performance

- **Lighthouse Score** : 90+ sur tous les critères
- **Core Web Vitals** : Optimisé
- **SEO** : Métadonnées complètes
- **Accessibilité** : WCAG 2.1 AA

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation DatoCMS

## 🔄 Mises à jour

### Gatsby
```bash
npm update gatsby
```

### DatoCMS
- Mettre à jour le plugin : `npm update gatsby-source-datocms`
- Vérifier la compatibilité des API

### Algolia
- Mettre à jour les clés API si nécessaire
- Re-indexer les données après modification

---

**Développé avec ❤️ par l'équipe de l'Interfédération des CISP**
