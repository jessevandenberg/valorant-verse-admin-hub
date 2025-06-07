
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, Target } from 'lucide-react';

interface HomeContent {
  title: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  gameplayHighlights: Array<{
    title: string;
    description: string;
  }>;
}

interface ValorantHomeProps {
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

const ValorantHome: React.FC<ValorantHomeProps> = ({ isAdmin = false, onAdminClick }) => {
  const [content, setContent] = useState<HomeContent>({
    title: "VALORANT",
    description: "Een 5v5 character-based tactical FPS waar precieze gunplay wordt gecombineerd met unieke Agent abilities.",
    features: [
      {
        icon: "shield",
        title: "Tactical Gameplay",
        description: "Strategische gameplay die teamwork en planning beloont"
      },
      {
        icon: "zap",
        title: "Unique Agents",
        description: "Kies uit een diverse selectie van Agents met unieke abilities"
      },
      {
        icon: "users",
        title: "Competitive Play",
        description: "Klimmen door de ranked ladder en bewijs je vaardigheden"
      },
      {
        icon: "target",
        title: "Precise Gunplay",
        description: "Meester de kunst van accurate schiettechnieken"
      }
    ],
    gameplayHighlights: [
      {
        title: "Plant or Defuse",
        description: "Het klassieke bomb defusal gamemode met een moderne twist"
      },
      {
        title: "13 Rounds to Victory",
        description: "First to 13 rounds wins, met de mogelijkheid voor overtime"
      },
      {
        title: "Buy Phase Strategy",
        description: "Beheers de economy en koop de juiste equipment voor je team"
      }
    ]
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return <Shield className="h-8 w-8" />;
      case 'zap': return <Zap className="h-8 w-8" />;
      case 'users': return <Users className="h-8 w-8" />;
      case 'target': return <Target className="h-8 w-8" />;
      default: return <Shield className="h-8 w-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-valorant-dark via-valorant-light to-valorant-dark text-valorant-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-valorant-red/20 to-transparent"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          {isAdmin && (
            <div className="absolute top-4 right-4">
              <Button 
                onClick={onAdminClick}
                className="admin-button"
              >
                Admin Paneel
              </Button>
            </div>
          )}
          
          <h1 className="text-7xl font-bold mb-6 valorant-text-glow animate-fade-in">
            {content.title}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300 animate-fade-in">
            {content.description}
          </p>
          
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button className="admin-button">
              Speel Nu
            </Button>
            <Button variant="outline" className="border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white">
              Bekijk Trailer
            </Button>
          </div>
        </div>
      </header>

      {/* Game Features */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 valorant-text-glow">
          Wat Maakt VALORANT Uniek
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.features.map((feature, index) => (
            <Card key={index} className="bg-valorant-light/50 border-valorant-red/30 hover:border-valorant-red transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 text-valorant-red">
                  {getIcon(feature.icon)}
                </div>
                <CardTitle className="text-valorant-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gameplay Section */}
      <section className="py-16 bg-valorant-light/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 valorant-text-glow">
            Gameplay Highlights
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.gameplayHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-valorant-red">
                  {highlight.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots/Media Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 valorant-text-glow">
          Game Screenshots
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative group overflow-hidden rounded-lg">
              <img 
                src={`https://images.unsplash.com/photo-${i === 1 ? '1526374965328-7f61d4dc18c5' : i === 2 ? '1500673922987-e212871fec22' : '1470071459604-3b5ec3a7fe05'}?w=600&h=400&fit=crop`}
                alt={`Valorant Screenshot ${i}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-valorant-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-valorant-light/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 valorant-text-glow">
            Laatste Nieuws
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Nieuwe Agent: Harbor", date: "2024-06-01", category: "Agent Release" },
              { title: "Map Update: Ascent Rework", date: "2024-05-28", category: "Map Updates" },
              { title: "Competitive Season 8", date: "2024-05-25", category: "Competitive" }
            ].map((news, index) => (
              <Card key={index} className="bg-valorant-light/50 border-valorant-red/30 hover:border-valorant-red transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-valorant-red border-valorant-red">
                      {news.category}
                    </Badge>
                    <span className="text-sm text-gray-400">{news.date}</span>
                  </div>
                  <CardTitle className="text-valorant-white">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Lees meer over de laatste updates en veranderingen in VALORANT.
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-valorant-red/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Riot Games, Inc. VALORANT en alle gerelateerde karakters zijn handelsmerken van Riot Games, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ValorantHome;
