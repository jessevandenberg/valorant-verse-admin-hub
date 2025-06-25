
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DesignSettings {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  site_title: string;
  site_description: string;
}

const DEFAULT_SETTINGS: DesignSettings = {
  primary_color: '#FF4656',
  secondary_color: '#1E2328',
  accent_color: '#F94555',
  background_color: '#0F1419',
  site_title: 'VALORANT',
  site_description: 'Een 5v5 character-based tactical FPS waar precieze gunplay wordt gecombineerd met unieke Agent abilities.'
};

export const useDesignSettings = () => {
  const [settings, setSettings] = useState<DesignSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const applyCSSVariables = (settingName: string, settingValue: string) => {
    const root = document.documentElement;
    const rgb = hexToRgb(settingValue);
    
    if (!rgb) {
      console.error('Invalid color value:', settingValue);
      return;
    }

    console.log('Applying color:', settingName, settingValue, rgb);
    
    switch (settingName) {
      case 'primary_color':
        // Alleen button/primaire kleuren
        root.style.setProperty('--primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--ring', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-ring', `${rgb.r} ${rgb.g} ${rgb.b}`);
        break;
      case 'secondary_color':
        // Card en muted kleuren
        root.style.setProperty('--card', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--muted', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-accent', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--secondary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        break;
      case 'accent_color':
        // Alleen accent kleur
        root.style.setProperty('--accent', `${rgb.r} ${rgb.g} ${rgb.b}`);
        break;
      case 'background_color':
        // Alleen achtergrond kleuren - NIET primary of button kleuren
        root.style.setProperty('--background', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-background', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--popover', `${rgb.r} ${rgb.g} ${rgb.b}`);
        
        // Update body background gradient immediately
        const lighterR = Math.min(rgb.r + 15, 255);
        const lighterG = Math.min(rgb.g + 15, 255);
        const lighterB = Math.min(rgb.b + 15, 255);
        
        const gradientStyle = `linear-gradient(135deg, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) 0%, rgb(${lighterR}, ${lighterG}, ${lighterB}) 100%)`;
        document.body.style.background = gradientStyle;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        break;
    }
  };

  const applyAllColors = (currentSettings: DesignSettings) => {
    console.log('Applying all colors:', currentSettings);
    Object.entries(currentSettings).forEach(([key, value]) => {
      if (key.includes('_color')) {
        applyCSSVariables(key, value);
      }
    });
  };

  const loadSettings = () => {
    try {
      console.log('Loading settings from localStorage...');
      const savedSettings = localStorage.getItem('design_settings');
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        console.log('Loaded settings:', parsedSettings);
        setSettings(parsedSettings);
        // Apply colors after state is updated
        setTimeout(() => applyAllColors(parsedSettings), 100);
      } else {
        console.log('No saved settings found, using defaults');
        // Apply default colors
        setTimeout(() => applyAllColors(DEFAULT_SETTINGS), 100);
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      toast({
        title: "Fout bij laden instellingen",
        description: "Kon de design instellingen niet laden uit localStorage.",
        variant: "destructive"
      });
      // Apply default colors on error
      setTimeout(() => applyAllColors(DEFAULT_SETTINGS), 100);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingName: string, settingValue: string) => {
    try {
      console.log('Updating setting:', settingName, settingValue);
      
      // Update local state
      const newSettings = {
        ...settings,
        [settingName]: settingValue
      };
      setSettings(newSettings);
      
      // Save to localStorage
      localStorage.setItem('design_settings', JSON.stringify(newSettings));
      
      // Apply the specific color change immediately
      if (settingName.includes('_color')) {
        applyCSSVariables(settingName, settingValue);
      }

      toast({
        title: "Instelling opgeslagen",
        description: "De wijziging is succesvol opgeslagen en toegepast.",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Fout bij opslaan",
        description: "Kon de instelling niet opslaan in localStorage.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    updateSetting,
    loadSettings
  };
};
