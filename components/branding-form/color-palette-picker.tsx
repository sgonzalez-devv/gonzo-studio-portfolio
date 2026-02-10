"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface ColorItem {
  name: string;
  hex: string;
}

interface ColorPalettePickerProps {
  value?: ColorItem[];
  onChange: (colors: ColorItem[]) => void;
  maxColors?: number;
}

export function ColorPalettePicker({ value = [], onChange, maxColors = 10 }: ColorPalettePickerProps) {
  const [colors, setColors] = useState<ColorItem[]>(value.length > 0 ? value : []);

  const addColor = () => {
    if (colors.length < maxColors) {
      const newColors = [...colors, { name: `Color ${colors.length + 1}`, hex: "#000000" }];
      setColors(newColors);
      onChange(newColors);
    }
  };

  const updateColor = (index: number, field: keyof ColorItem, value: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
    onChange(newColors);
  };

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    onChange(newColors);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Paleta de colores</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addColor}
          disabled={colors.length >= maxColors}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Agregar color
        </Button>
      </div>

      {colors.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground text-sm">
            No has agregado colores aún. Haz clic en "Agregar color" para empezar.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {colors.map((color, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                {/* Color Preview */}
                <div className="relative group">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-border shadow-sm cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  />
                  <Input
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateColor(index, "hex", e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Color Details */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`color-name-${index}`} className="text-sm">
                      Nombre
                    </Label>
                    <Input
                      id={`color-name-${index}`}
                      value={color.name}
                      onChange={(e) => updateColor(index, "name", e.target.value)}
                      placeholder="Ej: Primary, Accent"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`color-hex-${index}`} className="text-sm">
                      Código HEX
                    </Label>
                    <Input
                      id={`color-hex-${index}`}
                      value={color.hex}
                      onChange={(e) => updateColor(index, "hex", e.target.value)}
                      placeholder="#000000"
                      className="h-9 font-mono uppercase"
                      maxLength={7}
                    />
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeColor(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {colors.length} de {maxColors} colores · Haz clic en el cuadrado para seleccionar un color
      </p>
    </div>
  );
}
