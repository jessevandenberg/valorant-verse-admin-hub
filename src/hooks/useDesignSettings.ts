
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DesignSettings {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  site_title: string;
  site_description: string;
}

export const useDesignSettings = () => {
  const [settings, setSettings] = useState<DesignSettings>({
    primary_color: '#FF4656',
    secondary_color: '#0F1419',
    accent_color: '#F94555',
    background_color: '#1E2328',
    site_title: 'VALORANT',
    site_description: 'Een 5v5 character-based tactical FPS waar precieze gunplay wordt gecombineerd met unieke Agent abilities.'
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('design_settings')
        .select('setting_name, setting_value');

      if (error) throw error;

      if (data) {
        const settingsObj: any = {};
        data.forEach(item => {
          settingsObj[item.setting_name] = item.setting_value;
        });
        setSettings(settingsObj);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Fout bij laden instellingen",
        description: "Kon de design instellingen niet laden.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingName: string, settingValue: string) => {
    try {
      const { error } = await supabase
        .from('design_settings')
        .upsert({ 
          setting_name: settingName, 
          setting_value: settingValue 
        });

      if (error) throw error;

      setSettings(prev => ({
        ...prev,
        [settingName]: settingValue
      }));

      // Apply CSS variables immediately
      applyCSSVariables(settingName, settingValue);

      toast({
        title: "Instelling opgeslagen",
        description: "De wijziging is succesvol opgeslagen.",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Fout bij opslaan",
        description: "Kon de instelling niet opslaan.",
        variant: "destructive"
      });
    }
  };

  const applyCSSVariables = (settingName: string, settingValue: string) => {
    const root = document.documentElement;
    
    switch (settingName) {
      case 'primary_color':
        const primaryRgb = hexToRgb(settingValue);
        if (primaryRgb) {
          root.style.setProperty('--primary', `${primaryRgb.r} ${primaryRgb.g} ${primaryRgb.b}`);
        }
        break;
      case 'secondary_color':
        const secondaryRgb = hexToRgb(settingValue);
        if (secondaryRgb) {
          root.style.setProperty('--secondary', `${secondaryRgb.r} ${secondaryRgb.g} ${secondaryRgb.b}`);
        }
        break;
      case 'accent_color':
        const accentRgb = hexToRgb(settingValue);
        if (accentRgb) {
          root.style.setProperty('--accent', `${accentRgb.r} ${accentRgb.g} ${accentRgb.b}`);
        }
        break;
      case 'background_color':
        const backgroundRgb = hexToRgb(settingValue);
        if (backgroundRgb) {
          root.style.setProperty('--background', `${backgroundRgb.r} ${backgroundRgb.g} ${backgroundRgb.b}`);
        }
        break;
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    // Apply all CSS variables on settings change
    Object.entries(settings).forEach(([key, value]) => {
      if (key.includes('_color')) {
        applyCSSVariables(key, value);
      }
    });
  }, [settings]);

  return {
    settings,
    loading,
    updateSetting,
    loadSettings
  };
};
