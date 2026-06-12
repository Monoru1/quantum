# QUANTUM — Computing Beyond Reality

> Le futur ne sera pas découvert. Il sera conçu.

Vitrine officielle de l'initiative **QUANTUM** : une expérience web immersive et cinématique présentant un projet technologique d'échelle civilisationnelle — univers de particules WebGL, sphère holographique interactive, frise temporelle horizontale et narration au scroll.

**Démo locale en 30 secondes :** `npm install && npm run dev` → http://localhost:3000

---

## Sommaire

1. [Présentation du projet](#présentation-du-projet)
2. [Technologies utilisées](#technologies-utilisées)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Lancement local](#lancement-local)
6. [Build de production](#build-de-production)
7. [Déploiement Netlify](#déploiement-netlify)
8. [Structure du projet](#structure-du-projet)
9. [Dépannage](#dépannage)
10. [FAQ](#faq)

---

## Présentation du projet

QUANTUM n'est pas un site d'entreprise. C'est un récit en huit actes :

| Acte | Section | Expérience |
|------|---------|------------|
| 1 | **Héros** | Écran noir total → particules révélées une par une → univers de 12 000 particules en shader GLSL réagissant à la souris → le wordmark QUANTUM est *révélé* |
| 2 | **The Wall** | L'humanité face au mur computationnel : 7 domaines au bord de la saturation (barres rouges pulsantes) |
| 3 | **Vision** | Sphère holographique 3D interactive (rotation, zoom) : les 7 systèmes de l'écosystème |
| 4 | **District** | La cité technologique : skyline générative SVG + 10 secteurs |
| 5 | **Architecture** | Les 7 couches de l'infrastructure avec flux d'énergie animés |
| 6 | **Industries** | 6 scènes cinématiques pleine largeur (pas de cartes) |
| 7 | **Timeline** | Voyage horizontal épinglé (GSAP ScrollTrigger), 8 phases, horizon sans fin |
| 8 | **Final** | Retour de l'univers, plus brillant. Message final. *Enter the future.* |

## Technologies utilisées

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** — approche CSS-first avec tokens `@theme`
- **Three.js + React Three Fiber + Drei** — particules GLSL custom, sphère réseau
- **Framer Motion** — révélations, séquences d'apparition
- **GSAP + ScrollTrigger** — frise horizontale épinglée
- **Lucide React** — icônes
- **next/font** — polices auto-hébergées (Unbounded / Instrument Sans / IBM Plex Mono)

Accessibilité : `prefers-reduced-motion` respecté (animations CSS et épinglage GSAP désactivés).

## Installation

Prérequis : **Node.js ≥ 20** et npm.

```bash
# Cloner le dépôt
git clone https://github.com/Monoru1/quantum.git
cd quantum

# Installer les dépendances
npm install
```

## Configuration

Le site fonctionne sans aucune variable d'environnement. Pour personnaliser :

```bash
cp .env.example .env.local
```

| Variable | Rôle | Défaut |
|----------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO / Open Graph) | `https://quantum.netlify.app` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Activer des analytics (optionnel) | `false` |

Tout le contenu éditorial (textes, phases, secteurs, industries) est centralisé dans **`data/content.ts`** : c'est le seul fichier à modifier pour changer le texte du site.

## Lancement local

```bash
npm run dev
```

Le site est disponible sur **http://localhost:3000**.

## Build de production

```bash
npm run build   # Compile le site
npm run start   # Sert le build en local (http://localhost:3000)
```

## Déploiement Netlify

Le projet est **pré-configuré** via `netlify.toml` (runtime Next.js officiel, headers de sécurité, cache long sur les assets). Deux méthodes :

### Méthode A — Déploiement continu via GitHub (recommandé)

1. Connectez-vous sur [app.netlify.com](https://app.netlify.com).
2. **Add new site → Import an existing project → GitHub**.
3. Autorisez Netlify puis sélectionnez le dépôt **`Monoru1/quantum`**.
4. Branche à déployer : **`main`**.
5. Netlify lit automatiquement `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `.next`
   - Plugin : `@netlify/plugin-nextjs` (installé automatiquement)
   - Node : version 20
6. Cliquez sur **Deploy site**.
7. Le **déploiement automatique** est actif par défaut : chaque `git push` sur `main` redéploie le site (vérifiable dans *Site configuration → Build & deploy → Continuous deployment*).

### Méthode B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init          # Lier le dossier au site (ou en créer un)
netlify deploy --build --prod
```

## Structure du projet

```
quantum/
├── app/
│   ├── layout.tsx              # Layout racine : polices, SEO, JSON-LD
│   └── page.tsx                # Assemblage des 8 actes
├── components/
│   ├── 3d/
│   │   ├── QuantumUniverse.tsx # Univers de particules (shader GLSL) — signature
│   │   └── VisionSphere.tsx    # Sphère holographique interactive
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation (apparaît après le héros)
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # Acte 1 — la révélation
│   │   ├── Problem.tsx         # Acte 2 — le mur
│   │   ├── Vision.tsx          # Acte 3 — la sphère
│   │   ├── District.tsx        # Acte 4 — la cité
│   │   ├── Architecture.tsx    # Acte 5 — les couches
│   │   ├── Industries.tsx      # Acte 6 — les scènes
│   │   ├── Timeline.tsx        # Acte 7 — le voyage
│   │   └── Final.tsx           # Acte 8 — le retour
│   └── ui/
│       ├── Eyebrow.tsx         # Étiquette mono de section
│       └── Reveal.tsx          # Apparition au scroll
├── data/
│   └── content.ts              # TOUT le contenu éditorial
├── hooks/
│   └── usePrefersReducedMotion.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── images/ · videos/ · models/
├── styles/
│   └── globals.css             # Tokens @theme Tailwind v4
├── types/
│   └── index.ts
├── netlify.toml                # Configuration Netlify complète
├── next.config.mjs
├── postcss.config.mjs
└── tsconfig.json
```

## Dépannage

**`npm install` échoue sur les peer dependencies**
→ Vérifiez Node ≥ 20 (`node -v`). En dernier recours : `npm install --legacy-peer-deps`.

**Écran noir au chargement, rien n'apparaît**
→ C'est voulu pendant ~1 seconde (le héros s'ouvre dans le noir). Si rien n'apparaît après 5 s, ouvrez la console : WebGL est probablement désactivé sur votre navigateur/GPU.

**Erreur Netlify « Build script returned non-zero exit code »**
→ Vérifiez dans les logs que Node 20 est utilisé (défini dans `netlify.toml`). Supprimez tout réglage manuel contradictoire dans *Site configuration → Environment variables*.

**Le plugin Next.js n'est pas détecté sur Netlify**
→ Le bloc `[[plugins]]` de `netlify.toml` suffit ; Netlify installe `@netlify/plugin-nextjs` automatiquement au build. Ne pas l'ajouter aux dépendances du projet.

**La timeline horizontale ne s'épingle pas**
→ Comportement normal sur mobile (affichage vertical) et si `prefers-reduced-motion` est activé dans votre OS.

**FPS faibles sur machine modeste**
→ Réduisez `COUNT` dans `components/3d/QuantumUniverse.tsx` (12000 → 6000).

## FAQ

**Comment modifier les textes du site ?**
Un seul fichier : `data/content.ts`.

**Comment changer les couleurs ?**
Les tokens sont dans `styles/globals.css` (bloc `@theme`) : `--color-cherenkov`, `--color-photon`, `--color-fusion`, etc.

**Puis-je ajouter une page ?**
Oui : créez `app/ma-page/page.tsx` (App Router Next.js).

**Le site fonctionne-t-il sans JavaScript ?**
Le contenu textuel est rendu côté serveur (SEO ok), mais les expériences 3D et les animations nécessitent JavaScript et WebGL.

**Pourquoi `.next` comme dossier de publication et pas `out` ?**
Le site utilise le runtime Next.js de Netlify (SSR-ready), pas un export statique. Le plugin gère tout.

---

**QUANTUM** — *Every civilization is remembered for a breakthrough. We are building the next one.*
