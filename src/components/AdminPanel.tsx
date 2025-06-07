
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, RotateCcw, Plus, Minus, Palette, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  onBack: () => void;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video';
  title: string;
  content: string;
  order: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { toast } = useToast();
  
  const [colors, setColors] = useState<ColorScheme>({
    primary: '#FF4656',
    secondary: '#0F1419',
    accent: '#F94555',
    background: '#1E2328'
  });

  const [siteContent, setSiteContent] = useState({
    title: 'VALORANT',
    description: 'Een 5v5 character-based tactical FPS waar precieze gunplay wordt gecombineerd met unieke Agent abilities.',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: '1',
      type: 'text',
      title: 'Over VALORANT',
      content: 'VALORANT is een gratis 5v5 character-based tactical shooter.',
      order: 1
    },
    {
      id: '2',
      type: 'image',
      title: 'Gameplay Screenshot',
      content: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      order: 2
    }
  ]);

  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (colorType: keyof ColorScheme, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const handleSaveSettings = () => {
    // In een echte app zou dit naar de database gaan
    console.log('Saving settings:', { colors, siteContent, contentBlocks });
    toast({
      title: "Instellingen opgeslagen",
      description: "Je wijzigingen zijn succesvol opgeslagen.",
    });
  };

  const handleResetToDefaults = () => {
    setColors({
      primary: '#FF4656',
      secondary: '#0F1419',
      accent: '#F94555',
      background: '#1E2328'
    });
    setSiteContent({
      title: 'VALORANT',
      description: 'Een 5v5 character-based tactical FPS waar precieze gunplay wordt gecombineerd met unieke Agent abilities.',
      heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    });
    toast({
      title: "Standaardwaarden hersteld",
      description: "Alle instellingen zijn teruggezet naar de standaardwaarden.",
    });
  };

  const addContentBlock = () => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: 'text',
      title: 'Nieuw Content Blok',
      content: 'Voeg hier je content toe...',
      order: contentBlocks.length + 1
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const removeContentBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== id));
  };

  const updateContentBlock = (id: string, field: keyof ContentBlock, value: string | number) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id ? { ...block, [field]: value } : block
    ));
  };

  return (
    <div className="min-h-screen bg-valorant-dark text-valorant-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar Website
            </Button>
            <div>
              <h1 className="text-3xl font-bold valorant-text-glow">Admin Paneel</h1>
              <p className="text-gray-400">Beheer je VALORANT website</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setPreviewMode(!previewMode)}
              variant="outline"
              className="border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white"
            >
              {previewMode ? 'Bewerk Mode' : 'Preview Mode'}
            </Button>
            <Button 
              onClick={handleResetToDefaults}
              variant="outline"
              className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={handleSaveSettings}
              className="admin-button"
            >
              <Save className="w-4 h-4 mr-2" />
              Opslaan
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList className="bg-valorant-light">
            <TabsTrigger value="colors" className="data-[state=active]:bg-valorant-red">
              <Palette className="w-4 h-4 mr-2" />
              Kleuren
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-valorant-red">
              <Settings className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="blocks" className="data-[state=active]:bg-valorant-red">
              <Plus className="w-4 h-4 mr-2" />
              Content Blokken
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <Card className="bg-valorant-light border-valorant-red/30">
              <CardHeader>
                <CardTitle className="text-valorant-white">Kleurenschema Aanpassen</CardTitle>
                <CardDescription className="text-gray-300">
                  Pas de kleuren van je website aan om een unieke look te creëren.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primary-color" className="text-valorant-white">Primaire Kleur</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={colors.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="w-16 h-10 p-1 border-valorant-red/30"
                        />
                        <Input
                          value={colors.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="flex-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="secondary-color" className="text-valorant-white">Secundaire Kleur</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="secondary-color"
                          type="color"
                          value={colors.secondary}
                          onChange={(e) => handleColorChange('secondary', e.target.value)}
                          className="w-16 h-10 p-1 border-valorant-red/30"
                        />
                        <Input
                          value={colors.secondary}
                          onChange={(e) => handleColorChange('secondary', e.target.value)}
                          className="flex-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accent-color" className="text-valorant-white">Accent Kleur</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="accent-color"
                          type="color"
                          value={colors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="w-16 h-10 p-1 border-valorant-red/30"
                        />
                        <Input
                          value={colors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="flex-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="background-color" className="text-valorant-white">Achtergrond Kleur</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="background-color"
                          type="color"
                          value={colors.background}
                          onChange={(e) => handleColorChange('background', e.target.value)}
                          className="w-16 h-10 p-1 border-valorant-red/30"
                        />
                        <Input
                          value={colors.background}
                          onChange={(e) => handleColorChange('background', e.target.value)}
                          className="flex-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Color Preview */}
                <div className="mt-6">
                  <Label className="text-valorant-white">Preview</Label>
                  <div className="grid grid-cols-4 gap-4 mt-2">
                    {Object.entries(colors).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div 
                          className="w-full h-16 rounded-lg border-2 border-gray-600"
                          style={{ backgroundColor: color }}
                        ></div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card className="bg-valorant-light border-valorant-red/30">
              <CardHeader>
                <CardTitle className="text-valorant-white">Hoofdcontent Bewerken</CardTitle>
                <CardDescription className="text-gray-300">
                  Bewerk de hoofdtekst en afbeeldingen van je website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="site-title" className="text-valorant-white">Website Titel</Label>
                  <Input
                    id="site-title"
                    value={siteContent.title}
                    onChange={(e) => setSiteContent(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="site-description" className="text-valorant-white">Beschrijving</Label>
                  <Textarea
                    id="site-description"
                    value={siteContent.description}
                    onChange={(e) => setSiteContent(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="hero-image" className="text-valorant-white">Hero Afbeelding URL</Label>
                  <Input
                    id="hero-image"
                    value={siteContent.heroImage}
                    onChange={(e) => setSiteContent(prev => ({ ...prev, heroImage: e.target.value }))}
                    className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                  />
                  {siteContent.heroImage && (
                    <img 
                      src={siteContent.heroImage} 
                      alt="Hero preview" 
                      className="mt-2 w-full max-w-md h-32 object-cover rounded-lg border border-valorant-red/30"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Blocks Tab */}
          <TabsContent value="blocks">
            <Card className="bg-valorant-light border-valorant-red/30">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-valorant-white">Content Blokken</CardTitle>
                    <CardDescription className="text-gray-300">
                      Voeg content blokken toe, bewerk of verwijder ze.
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={addContentBlock}
                    className="admin-button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nieuw Blok
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentBlocks.map((block) => (
                    <Card key={block.id} className="bg-valorant-dark border-valorant-red/30">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="text-valorant-red border-valorant-red">
                            {block.type}
                          </Badge>
                          <Button
                            onClick={() => removeContentBlock(block.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-valorant-white">Titel</Label>
                            <Input
                              value={block.title}
                              onChange={(e) => updateContentBlock(block.id, 'title', e.target.value)}
                              className="mt-1 bg-valorant-light border-valorant-red/30 text-valorant-white"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-valorant-white">Content</Label>
                            {block.type === 'text' ? (
                              <Textarea
                                value={block.content}
                                onChange={(e) => updateContentBlock(block.id, 'content', e.target.value)}
                                className="mt-1 bg-valorant-light border-valorant-red/30 text-valorant-white"
                                rows={3}
                              />
                            ) : (
                              <Input
                                value={block.content}
                                onChange={(e) => updateContentBlock(block.id, 'content', e.target.value)}
                                placeholder={block.type === 'image' ? 'Afbeelding URL' : 'Video URL'}
                                className="mt-1 bg-valorant-light border-valorant-red/30 text-valorant-white"
                              />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
