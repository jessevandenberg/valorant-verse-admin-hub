# Valorant Info Website

## Overzicht
Deze website dient als een moderne, interactieve platform voor Valorant-informatie en -updates. Gebouwd met moderne webtechnologieën, biedt het een aantrekkelijke gebruikerservaring met vloeiende animaties en een strakke, intuïtieve interface. Het project toont Valorant game-data, agent-informatie en updates op een toegankelijke en visueel aantrekkelijke manier.

## Belangrijkste functies
- **Interactieve animaties**: Vloeiende, scroll-gebaseerde animaties met Framer Motion
- **Responsief ontwerp**: Geoptimaliseerd voor alle apparaten, van mobiel tot desktop
- **Moderne UI-componenten**: Gemaakt met React en gestyled met Tailwind CSS
- **Prestaties geoptimaliseerd**: Snelle laadtijden en soepele interacties
- **Dynamische content**: Real-time updates via Supabase-integratie
- **Aanpasbaar thema**: Dynamisch kleurbeheer via het admin-paneel

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
- Supabase
  - Real-time abonnementen
  - Databasemanagement
  - Authenticatie

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
