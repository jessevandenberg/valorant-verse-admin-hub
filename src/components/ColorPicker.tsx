
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const presetColors = [
    '#FF4656', // Valorant Red
    '#F94555', // Valorant Accent
    '#0F1419', // Valorant Dark
    '#1E2328', // Valorant Light
    '#FFFBF5', // Valorant White
    '#FF6B35', // Orange
    '#F7931E', // Light Orange
    '#FFD23F', // Yellow
    '#06FFA5', // Green
    '#4DABF7', // Blue
    '#9775FA', // Purple
    '#FF8CC8', // Pink
    '#495057', // Gray
    '#000000', // Black
    '#FFFFFF', // White
  ];

  const handleColorChange = (newColor: string) => {
    // Ensure color is in proper hex format
    const cleanColor = newColor.startsWith('#') ? newColor : `#${newColor}`;
    onChange(cleanColor);
  };

  return (
    <div className="space-y-3">
      <Label className="text-foreground font-medium">{label}</Label>
      
      {/* Preset Colors Grid */}
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <Button
            key={color}
            onClick={() => handleColorChange(color)}
            className={`w-12 h-12 p-0 border-2 transition-all duration-200 hover:scale-110 ${
              value === color 
                ? 'border-primary shadow-lg scale-110' 
                : 'border-border hover:border-primary/50'
            }`}
            style={{ backgroundColor: color }}
            title={color}
            type="button"
          >
            {value === color && (
              <div className="w-3 h-3 bg-white rounded-full shadow-md border border-gray-300"></div>
            )}
          </Button>
        ))}
      </div>

      {/* Custom Color Input */}
      <div className="flex gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-16 h-10 p-1 border-primary/30 cursor-pointer"
        />
        <Input
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          className="flex-1 bg-card border-primary/30 text-foreground"
          placeholder="#FF4656"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
