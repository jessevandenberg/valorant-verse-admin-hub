# Valorant Info Website

## Overzicht
Deze website is een moderne, interactieve Valorant-site met een aanpasbaar thema en duidelijke secties voor features, media en nieuws. Hieronder lees je precies wat je kunt doen en hoe alles is gebouwd.

## Wat kun je doen?
- ️ Startpagina: lees wat VALORANT uniek maakt en bekijk gameplay-highlights.
- Media: bekijk screenshots met hover-animaties.
- Nieuws: bekijk een grid met recente nieuwsitems.
- Admin: pas live het thema aan (primaire, secundaire, accent en achtergrondkleur) en zie direct resultaat.

## Hoe werkt het thema?
- Kleuren worden beheerd via CSS-variabelen in `src/index.css` (bijv. `--primary`, `--secondary`, `--accent`, `--background`).
- De hook `useDesignSettings` slaat wijzigingen op in `localStorage` en past de variabelen direct toe op `document.documentElement`.
- Effect per kleurpalet:
  - Primaire: knoppen, links en focus-ring.
  - Secundaire: kaarten en secundaire vlakken/secties (via `bg-valorant-light-*`).
  - Accent: highlights en randen/icoonkleuren (bijv. features-kaarten).
  - Achtergrond: pagina-achtergrond (gradient), popovers en sidebar-background.

## Technologiestack
### Frontend
- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Shadcn UI-componenten

### Backend & Database
- Supabase (client aanwezig, optioneel voor real-time/data)

### Ontwikkeltools
- Visual Studio Code
- Git & GitHub
- NPM

## Installatie

### Vereisten
Zorg dat je het volgende hebt geïnstalleerd:
- Node.js (LTS-versie)
- npm (wordt meegeleverd met Node.js)

### Stappen
1. Repository klonen
```bash
git clone https://github.com/yourusername/valorant-info.git
cd valorant-info
```

2. Dependencies installeren
```bash
npm install
```

3. Development server starten
```bash
npm run dev
```
Open vervolgens je browser en ga naar `http://localhost:5173`.

## Configuratie
- Omgevingsvariabelen kunnen worden toegevoegd in het bestand `.env`.
- Vite-configuratie kan worden aangepast in `vite.config.ts`.
- Tailwind CSS-configuratie is beschikbaar in `tailwind.config.js`.

## Beschikbare scripts
| Commando | Beschrijving |
|---------|---------------|
| `npm run dev` | Start de development server |
| `npm run build` | Maakt een productie-build |
| `npm run preview` | Toont de productie-build lokaal |
| `npm run lint` | Voert de linter uit om codekwaliteit te controleren |

## Belangrijke onderdelen (hoe het is gebouwd)
- `src/hooks/useDesignSettings.ts`: laadt/slaat thema-instellingen op en zet CSS-variabelen; past ook body-gradient aan.
- `src/index.css`: kleurensysteem met CSS-variabelen en helpers zoals `bg-valorant-light-30/50/90`, `text-valorant-accent`.
- `src/components/AdminDesignPopup.tsx`: admin UI voor kleur- en typografie-instellingen; wijzigingen zijn direct zichtbaar.
- `src/components/ValorantHome.tsx`: hoofdcontent (hero, features, gameplay, media, nieuws) met themakoppeling.

## Projectstructuur (beknopt)
```
valorant-verse-admin-hub/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/                 # Shadcn UI
│   │   ├── AdminDesignPopup.tsx
│   │   └── ValorantHome.tsx
│   ├── hooks/
│   │   └── useDesignSettings.ts
│   ├── integrations/
│   │   └── supabase/
│   ├── index.css
│   └── main.tsx
└── vite.config.ts
```

## Projectstructuur
```
valorant-info/
├── src/              # Bronbestanden
│   ├── components/   # React-componenten
│   ├── pages/        # Pagina-componenten
│   ├── styles/       # Globale stijlen
│   ├── types/        # TypeScript-typen
│   └── utils/        # Hulpfuncties
├── public/           # Statische assets
└── ...
```

## Bijdragen
Bijdragen zijn welkom! Dien gerust een Pull Request in. Voor grotere wijzigingen, open eerst een issue om te bespreken wat je wilt veranderen.

## Licentie
Dit project is gelicentieerd onder de ISC-licentie.

## Contact
Voor vragen of suggesties kun je een issue openen in de GitHub-repository.

## Erkenningen
- Riot Games voor Valorant-game-assets en -informatie
- Alle bijdragers die hebben geholpen dit project vorm te geven
