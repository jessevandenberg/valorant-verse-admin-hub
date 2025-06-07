# Valorant Info Website

## Overview
This website serves as a modern, interactive platform for Valorant information and updates. Built with cutting-edge web technologies, it provides an engaging user experience through smooth animations and a clean, intuitive interface. The project showcases Valorant game data, agent information, and updates in an accessible and visually appealing manner.

## Key Features
- **Interactive Animations**: Smooth scroll-based animations using Framer Motion
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI Components**: Built with React and styled using Tailwind CSS
- **Performance Optimized**: Fast loading times and smooth interactions
- **Dynamic Content**: Real-time updates through Supabase integration
- **Customizable Theme**: Dynamic color scheme management through admin panel

## Technology Stack
### Frontend
- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Shadcn UI Components

### Backend & Database
- Supabase
  - Real-time subscriptions
  - Database management
  - Authentication

### Development Tools
- Visual Studio Code
- Git & GitHub
- NPM

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version)
- npm (comes with Node.js)

### Steps
1. Clone the repository
```bash
git clone https://github.com/yourusername/valorant-info.git
cd valorant-info
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`

## Configuration
- Environment variables can be added in `.env` file
- Vite configuration can be modified in `vite.config.ts`
- Tailwind CSS configuration is available in `tailwind.config.js`

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Runs the linter to check code quality |

## Project Structure
```
valorant-info/
├── src/              # Source files
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── styles/       # Global styles
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── public/           # Static assets
└── ...
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License.

## Contact
For any questions or suggestions, please open an issue in the GitHub repository.

## Acknowledgments
- Riot Games for Valorant game assets and information
- All contributors who have helped shape this project
