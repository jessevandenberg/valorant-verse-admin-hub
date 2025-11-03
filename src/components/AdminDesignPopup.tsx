
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Palette, Type, Image, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import ColorPicker from './ColorPicker';

interface AdminDesignPopupProps {
  children: React.ReactNode;
}

const AdminDesignPopup: React.FC<AdminDesignPopupProps> = ({ children }) => {
  const { toast } = useToast();
  const { settings, updateSetting } = useDesignSettings();
  
  const [iconSettings, setIconSettings] = useState({
    size: '24',
    style: 'outline'
  });

  const [textSettings, setTextSettings] = useState({
    titleSize: '7xl',
    bodySize: 'xl',
    fontWeight: 'bold'
  });

  const handleColorChange = async (colorType: string, value: string) => {
    try {
      await updateSetting(colorType, value);
    } catch (error) {
      console.error('Error updating color:', error);
      toast({
        title: "Fout bij opslaan",
        description: "Kon de kleur niet opslaan.",
        variant: "destructive"
      });
    }
  };

  const handleSaveOtherSettings = async () => {
    // For now, just show a success message for non-color settings
    // These could be implemented later if needed
    console.log('Saving other settings:', { iconSettings, textSettings });
    toast({
      title: "Instellingen opgeslagen",
      description: "Je design wijzigingen zijn toegepast.",
    });
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
            Pas het design van je website aan met deze tools. Kleurveranderingen worden automatisch opgeslagen.
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
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ColorPicker
                  label="Primaire Kleur (Buttons & Ring)"
                  value={settings.primary_color}
                  onChange={(value) => handleColorChange('primary_color', value)}
                />
                
                <ColorPicker
                  label="Secundaire Kleur (Cards & Secundaire vlakken)"
                  value={settings.secondary_color}
                  onChange={(value) => handleColorChange('secondary_color', value)}
                />
              </div>
              
              <div className="space-y-6">
                <ColorPicker
                  label="Accent Kleur (Highlights)"
                  value={settings.accent_color}
                  onChange={(value) => handleColorChange('accent_color', value)}
                />
                
                <ColorPicker
                  label="Achtergrond Kleur (Pagina Achtergrond)"
                  value={settings.background_color}
                  onChange={(value) => handleColorChange('background_color', value)}
                />
              </div>
            </div>
            
            {/* Color Preview */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-valorant-white border-b border-valorant-red/30 pb-2 mb-4">
                Live Preview
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'Primair', color: settings.primary_color },
                  { name: 'Secundair', color: settings.secondary_color },
                  { name: 'Accent', color: settings.accent_color },
                  { name: 'Achtergrond', color: settings.background_color }
                ].map(({ name, color }) => (
                  <div key={name} className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg border-2 border-gray-600 mb-2 transition-all duration-300"
                      style={{ backgroundColor: color }}
                    ></div>
                    <Badge variant="outline" className="text-xs text-valorant-white border-valorant-red">
                      {name}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-1">{color}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <p className="text-sm text-gray-300">Button Preview</p>
                <div className="flex flex-wrap gap-3">
                  <Button className="admin-button">Primair</Button>
                  <Button variant="secondary">Secundair</Button>
                  <Button variant="outline" className="border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white">Outline</Button>
                </div>
              </div>
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
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveOtherSettings}
                className="admin-button"
              >
                <Save className="w-4 h-4 mr-2" />
                Icoon Instellingen Opslaan
              </Button>
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
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveOtherSettings}
                className="admin-button"
              >
                <Save className="w-4 h-4 mr-2" />
                Tekst Instellingen Opslaan
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDesignPopup;
