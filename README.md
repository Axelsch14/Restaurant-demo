# 🍽️ Restaurant Démo — Maison Kuro

Site vitrine minimaliste, prêt à déployer sur Vercel.

## 🚀 Mise en ligne (sans GitHub)

```bash
# 1. Installe les dépendances
npm install

# 2. Build le site
npm run build

# 3. Va sur vercel.com → glisse le dossier "build/" → Deploy
```

---

## ✏️ Personnaliser pour un client

### Tout est dans `src/App.jsx`

**1. Infos du restaurant** — tout en haut dans `CONFIG` :
```js
const CONFIG = {
  name: 'Maison Kuro',        // → Nom du client
  tagline: 'Paris 9e',         // → Sous-titre
  address: '24 rue des...',    // → Adresse
  phone: '01 48 00 00 00',     // → Téléphone
  email: 'bonjour@...',        // → Email
  hours: [...],                // → Horaires
}
```

**2. Le menu** — dans `MENU` :
```js
const MENU = {
  Entrées: [
    { name: 'Burrata', desc: 'Tomates...', price: 16 },
    ...
  ],
  ...
}
```

**3. Les avis** — dans `AVIS` :
```js
const AVIS = [
  { name: 'Sophie M.', stars: 5, text: '...', date: 'Avril 2025' },
  ...
]
```

**4. Couleurs** — dans `src/index.css` :
```css
--white: #ffffff;      /* fond */
--text: #1A1A1A;       /* texte */
--border: #E8E4DE;     /* bordures */
```

---

## 💼 Tarification suggérée

| Prestation | Prix |
|---|---|
| Création du site | 800 – 2 000 € |
| Nom de domaine | ~12 €/an (à refacturer) |
| Maintenance mensuelle | 50 – 120 €/mois |
| Photos professionnelles | 200 – 400 € |
