"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { BRAND_DESCRIPTORS } from "@/lib/branding-form-types";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step2Personality({ data, updateData }: StepProps) {
  const handleDescriptorToggle = (descriptor: string) => {
    const current = data.brandDescriptors || [];
    const updated = current.includes(descriptor)
      ? current.filter((d) => d !== descriptor)
      : [...current, descriptor];
    updateData({ brandDescriptors: updated });
  };

  const updateToneScale = (key: 'formalCasual' | 'seriousFun' | 'premiumAccessible', value: number) => {
    updateData({
      toneScale: {
        formalCasual: data.toneScale?.formalCasual || 50,
        seriousFun: data.toneScale?.seriousFun || 50,
        premiumAccessible: data.toneScale?.premiumAccessible || 50,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          No estamos hablando de diseño aún, solo de cómo debería sentirse.
        </p>
      </div>

      {/* Brand Descriptors */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          ¿Cómo te gustaría que las personas describan tu marca?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Selecciona todos los que apliquen
        </p>

        <div className="grid grid-cols-2 gap-3">
          {BRAND_DESCRIPTORS.map((descriptor) => (
            <div
              key={descriptor}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleDescriptorToggle(descriptor)}
            >
              <Checkbox
                id={`descriptor-${descriptor}`}
                checked={data.brandDescriptors?.includes(descriptor) || false}
                onCheckedChange={() => handleDescriptorToggle(descriptor)}
              />
              <Label
                htmlFor={`descriptor-${descriptor}`}
                className="cursor-pointer flex-1 font-normal"
              >
                {descriptor}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Tone Scales */}
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium">
            ¿Cómo debería sentirse el tono de la marca?
          </Label>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Opcional · Desliza para indicar dónde se encuentra tu marca
          </p>
        </div>

        {/* Formal vs Casual */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Formal</span>
            <span className="text-muted-foreground">Casual</span>
          </div>
          <Slider
            value={[data.toneScale?.formalCasual || 50]}
            onValueChange={(value) => updateToneScale('formalCasual', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Seria vs Divertida */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Seria</span>
            <span className="text-muted-foreground">Divertida</span>
          </div>
          <Slider
            value={[data.toneScale?.seriousFun || 50]}
            onValueChange={(value) => updateToneScale('seriousFun', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Premium vs Accesible */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Premium</span>
            <span className="text-muted-foreground">Accesible</span>
          </div>
          <Slider
            value={[data.toneScale?.premiumAccessible || 50]}
            onValueChange={(value) => updateToneScale('premiumAccessible', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Like Brands */}
      <div className="space-y-3">
        <Label htmlFor="likeBrands" className="text-base font-medium">
          ¿Hay marcas que te gusten visualmente o a nivel de comunicación?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Pueden ser de cualquier industria. Incluye links o nombres
        </p>
        <Textarea
          id="likeBrands"
          value={data.likeBrands || ""}
          onChange={(e) => updateData({ likeBrands: e.target.value })}
          placeholder="Ej: Apple (minimalista), Airbnb (cercana), Nike (inspiradora)..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Dislike Brands */}
      <div className="space-y-3">
        <Label htmlFor="dislikeBrands" className="text-base font-medium">
          ¿Hay marcas que NO te gusten o que definitivamente no quieras parecerte?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Esto nos ayuda a saber qué evitar
        </p>
        <Textarea
          id="dislikeBrands"
          value={data.dislikeBrands || ""}
          onChange={(e) => updateData({ dislikeBrands: e.target.value })}
          placeholder="Ej: Marcas que se sientan muy corporativas o frías..."
          className="min-h-24 resize-none"
        />
      </div>
    </div>
  );
}
