
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

  return (
    <div className="space-y-3">
      <Label className="text-valorant-white">{label}</Label>
      
      {/* Preset Colors Grid */}
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <Button
            key={color}
            onClick={() => onChange(color)}
            className={`w-12 h-12 p-0 border-2 transition-all ${
              value === color 
                ? 'border-valorant-red shadow-lg scale-110' 
                : 'border-gray-600 hover:border-valorant-red/50'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          >
            {value === color && (
              <div className="w-3 h-3 bg-white rounded-full shadow-md"></div>
            )}
          </Button>
        ))}
      </div>

      {/* Custom Color Input */}
      <div className="flex gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-10 p-1 border-valorant-red/30"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-valorant-dark border-valorant-red/30 text-valorant-white"
          placeholder="#FF4656"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
