
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Palette, Type, Image, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminDesignPopupProps {
  children: React.ReactNode;
}

const AdminDesignPopup: React.FC<AdminDesignPopupProps> = ({ children }) => {
  const { toast } = useToast();
  const [colors, setColors] = useState({
    primary: '#FF4656',
    secondary: '#0F1419',
    accent: '#F94555',
    background: '#1E2328'
  });

  const [iconSettings, setIconSettings] = useState({
    size: '24',
    style: 'outline'
  });

  const [textSettings, setTextSettings] = useState({
    titleSize: '7xl',
    bodySize: 'xl',
    fontWeight: 'bold'
  });

  const handleSaveChanges = () => {
    // In een echte app zou dit de CSS variabelen updaten
    console.log('Saving design changes:', { colors, iconSettings, textSettings });
    toast({
      title: "Design opgeslagen",
      description: "Je design wijzigingen zijn toegepast.",
    });
  };

  const handleColorChange = (colorType: string, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-valorant-light border-valorant-red/30 text-valorant-white">
        <DialogHeader>
          <DialogTitle className="text-2xl valorant-text-glow">Design Aanpassen</DialogTitle>
          <DialogDescription className="text-gray-300">
            Pas het design van je website aan met deze tools.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="colors" className="mt-4">
          <TabsList className="bg-valorant-dark">
            <TabsTrigger value="colors" className="data-[state=active]:bg-valorant-red">
              <Palette className="w-4 h-4 mr-2" />
              Kleuren
            </TabsTrigger>
            <TabsTrigger value="icons" className="data-[state=active]:bg-valorant-red">
              <Image className="w-4 h-4 mr-2" />
              Iconen
            </TabsTrigger>
            <TabsTrigger value="typography" className="data-[state=active]:bg-valorant-red">
              <Type className="w-4 h-4 mr-2" />
              Tekst
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-valorant-white">Primaire Kleur</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
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
                  <Label className="text-valorant-white">Secundaire Kleur</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
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
                  <Label className="text-valorant-white">Accent Kleur</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
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
                  <Label className="text-valorant-white">Achtergrond Kleur</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
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
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              {Object.entries(colors).map(([name, color]) => (
                <div key={name} className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg border-2 border-gray-600"
                    style={{ backgroundColor: color }}
                  ></div>
                  <Badge variant="outline" className="mt-2 text-xs text-valorant-white border-valorant-red">
                    {name}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="icons" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-valorant-white">Icoon Grootte</Label>
                <Input
                  value={iconSettings.size}
                  onChange={(e) => setIconSettings(prev => ({ ...prev, size: e.target.value }))}
                  className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                  placeholder="24"
                />
              </div>
              
              <div>
                <Label className="text-valorant-white">Icoon Stijl</Label>
                <div className="flex gap-2 mt-2">
                  {['outline', 'filled', 'duotone'].map((style) => (
                    <Button
                      key={style}
                      onClick={() => setIconSettings(prev => ({ ...prev, style }))}
                      variant={iconSettings.style === style ? "default" : "outline"}
                      className={iconSettings.style === style ? "admin-button" : "border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white"}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label className="text-valorant-white">Titel Grootte</Label>
                <Input
                  value={textSettings.titleSize}
                  onChange={(e) => setTextSettings(prev => ({ ...prev, titleSize: e.target.value }))}
                  className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                  placeholder="7xl"
                />
              </div>
              
              <div>
                <Label className="text-valorant-white">Tekst Grootte</Label>
                <Input
                  value={textSettings.bodySize}
                  onChange={(e) => setTextSettings(prev => ({ ...prev, bodySize: e.target.value }))}
                  className="mt-2 bg-valorant-dark border-valorant-red/30 text-valorant-white"
                  placeholder="xl"
                />
              </div>
              
              <div>
                <Label className="text-valorant-white">Font Weight</Label>
                <div className="flex gap-2 mt-2">
                  {['normal', 'bold', 'semibold'].map((weight) => (
                    <Button
                      key={weight}
                      onClick={() => setTextSettings(prev => ({ ...prev, fontWeight: weight }))}
                      variant={textSettings.fontWeight === weight ? "default" : "outline"}
                      className={textSettings.fontWeight === weight ? "admin-button" : "border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white"}
                      size="sm"
                    >
                      {weight}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-valorant-red/30">
          <Button 
            onClick={handleSaveChanges}
            className="admin-button"
          >
            <Save className="w-4 h-4 mr-2" />
            Wijzigingen Opslaan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDesignPopup;
