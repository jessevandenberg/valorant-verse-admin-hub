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

  const applyAllColors = (settings: DesignSettings) => {
    Object.entries(settings).forEach(([key, value]) => {
      if (key.includes('_color')) {
        applyCSSVariables(key, value);
      }
    });
  };

  const loadSettings = async () => {
    try {
      console.log('Loading settings...');
      const { data, error } = await supabase
        .from('design_settings')
        .select('setting_name, setting_value');

      if (error) throw error;

      if (data) {
        console.log('Settings data:', data);
        const settingsObj: any = {};
        data.forEach(item => {
          settingsObj[item.setting_name] = item.setting_value;
        });
        setSettings(settingsObj);
        applyAllColors(settingsObj);
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
      console.log('Updating setting:', settingName, settingValue);
      const { error } = await supabase
        .from('design_settings')
        .upsert({ 
          setting_name: settingName, 
          setting_value: settingValue 
        });

      if (error) throw error;

      const newSettings = {
        ...settings,
        [settingName]: settingValue
      };
      
      setSettings(newSettings);
      applyAllColors(newSettings);

      toast({
        title: "Instelling opgeslagen",
        description: "De wijziging is succesvol opgeslagen en toegepast.",
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
    const rgb = hexToRgb(settingValue);
    
    if (!rgb) {
      console.error('Invalid color value:', settingValue);
      return;
    }

    console.log('Applying color:', settingName, settingValue, rgb);
    
    switch (settingName) {
      case 'primary_color':
        root.style.setProperty('--primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--ring', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-ring', `${rgb.r} ${rgb.g} ${rgb.b}`);
        break;
      case 'secondary_color':
        root.style.setProperty('--secondary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-accent', `${rgb.r} ${rgb.g} ${rgb.b}`);
        break;
      case 'accent_color':
        root.style.setProperty('--accent', `${rgb.r} ${rgb.g} ${rgb.b}`);
        break;
      case 'background_color':
        root.style.setProperty('--background', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--card', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--popover', `${rgb.r} ${rgb.g} ${rgb.b}`);
        root.style.setProperty('--sidebar-background', `${rgb.r} ${rgb.g} ${rgb.b}`);
        
        // Calculate a slightly lighter version of the background color for the gradient
        const lighterR = Math.min(rgb.r + 20, 255);
        const lighterG = Math.min(rgb.g + 20, 255);
        const lighterB = Math.min(rgb.b + 20, 255);
        
        const gradientStyle = `linear-gradient(135deg, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) 0%, rgb(${lighterR}, ${lighterG}, ${lighterB}) 100%)`;
        console.log('Applying gradient:', gradientStyle);
        
        // Update the body background gradient
        document.body.style.background = gradientStyle;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
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

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('design_settings_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'design_settings' 
        }, 
        (payload) => {
          console.log('Real-time update received:', payload);
          const { setting_name, setting_value } = payload.new as { setting_name: string; setting_value: string };
          const newSettings = {
            ...settings,
            [setting_name]: setting_value
          };
          setSettings(newSettings);
          applyAllColors(newSettings);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    settings,
    loading,
    updateSetting,
    loadSettings
  };
};
