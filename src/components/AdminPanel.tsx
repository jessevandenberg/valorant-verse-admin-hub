import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, RotateCcw, Plus, Minus, Palette, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import ColorPicker from './ColorPicker';

interface AdminPanelProps {
  onBack: () => void;
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
  const { settings, loading, updateSetting } = useDesignSettings();
  
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

  const handleColorChange = async (colorType: string, value: string) => {
    await updateSetting(colorType, value);
  };

  const handleContentChange = async (field: string, value: string) => {
    await updateSetting(field, value);
  };

  const handleResetToDefaults = async () => {
    const defaultSettings = {
      primary_color: '#FF4656',
      secondary_color: '#0F1419',
      accent_color: '#F94555',
      background_color: '#1E2328',
      site_title: 'VALORANT',
      site_description: 'Een 5v5 character-based tactical FPS waar precieze gunplay wordt gecombineerd met unieke Agent abilities.'
    };

    for (const [key, value] of Object.entries(defaultSettings)) {
      await updateSetting(key, value);
    }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-valorant-dark text-valorant-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-valorant-red mx-auto mb-4"></div>
          <p className="text-xl">Instellingen laden...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-gray-400">Beheer je VALORANT website - Wijzigingen worden automatisch opgeslagen</p>
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
              Reset naar Standaard
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
                  Kies uit voorgedefinieerde kleuren of voer een eigen hex code in. Wijzigingen worden automatisch opgeslagen en toegepast.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <ColorPicker
                    label="Primaire Kleur"
                    value={settings.primary_color}
                    onChange={(value) => handleColorChange('primary_color', value)}
                  />
                  
                  <ColorPicker
                    label="Secundaire Kleur"
                    value={settings.secondary_color}
                    onChange={(value) => handleColorChange('secondary_color', value)}
                  />
                  
                  <ColorPicker
                    label="Accent Kleur"
                    value={settings.accent_color}
                    onChange={(value) => handleColorChange('accent_color', value)}
                  />
                  
                  <ColorPicker
                    label="Achtergrond Kleur"
                    value={settings.background_color}
                    onChange={(value) => handleColorChange('background_color', value)}
                  />
                </div>
                
                {/* Color Preview */}
                <div className="mt-8">
                  <Label className="text-valorant-white text-lg mb-4 block">Live Preview</Label>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: 'Primair', color: settings.primary_color },
                      { name: 'Secundair', color: settings.secondary_color },
                      { name: 'Accent', color: settings.accent_color },
                      { name: 'Achtergrond', color: settings.background_color }
                    ].map(({ name, color }) => (
                      <div key={name} className="text-center">
                        <div 
                          className="w-full h-20 rounded-lg border-2 border-gray-600 mb-2"
                          style={{ backgroundColor: color }}
                        ></div>
                        <Badge variant="outline" className="text-valorant-white border-valorant-red">
                          {name}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1">{color}</p>
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
                  Bewerk de hoofdtekst van je website. Wijzigingen worden automatisch opgeslagen.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="site-title" className="text-valorant-white">Website Titel</Label>
                  <Input
                    id="site-title"
                    value={settings.site_title}
                    onChange={(e) => handleContentChange('site_title', e.target.value)}
                    className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="site-description" className="text-valorant-white">Beschrijving</Label>
                  <Textarea
                    id="site-description"
                    value={settings.site_description}
                    onChange={(e) => handleContentChange('site_description', e.target.value)}
                    className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Blocks Tab - keeping existing functionality */}
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
