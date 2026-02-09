"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step4AudienceMarket({ data, updateData }: StepProps) {
  const handleBusinessTypeToggle = (type: string) => {
    const current = data.businessType || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateData({ businessType: updated });
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Esto nos ayuda a diseñar con intención.
        </p>
      </div>

      {/* Target Audience */}
      <div className="space-y-3">
        <Label htmlFor="targetAudience" className="text-base font-medium">
          ¿A quién va dirigida principalmente esta marca?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Describe a tu público ideal como puedas
        </p>
        <Textarea
          id="targetAudience"
          value={data.targetAudience || ""}
          onChange={(e) => updateData({ targetAudience: e.target.value })}
          placeholder="Ej: Profesionales jóvenes de 25-40 años que buscan soluciones digitales..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Market */}
      <div className="space-y-3">
        <Label htmlFor="market" className="text-base font-medium">
          ¿En qué país o mercado operará la marca?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Si es digital o global, también puedes indicarlo
        </p>
        <Input
          id="market"
          value={data.market || ""}
          onChange={(e) => updateData({ market: e.target.value })}
          placeholder="Ej: México, LATAM, Global..."
          className="text-base"
        />
      </div>

      {/* Business Type */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          ¿El público es más bien...?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Selecciona lo que aplique
        </p>

        <div className="space-y-3">
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleBusinessTypeToggle('b2c')}
          >
            <Checkbox
              id="type-b2c"
              checked={data.businessType?.includes('b2c') || false}
              onCheckedChange={() => handleBusinessTypeToggle('b2c')}
            />
            <div className="flex-1">
              <Label htmlFor="type-b2c" className="cursor-pointer font-normal">
                B2C (Personas / Consumidores)
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Vendes directamente a personas
              </p>
            </div>
          </div>

          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleBusinessTypeToggle('b2b')}
          >
            <Checkbox
              id="type-b2b"
              checked={data.businessType?.includes('b2b') || false}
              onCheckedChange={() => handleBusinessTypeToggle('b2b')}
            />
            <div className="flex-1">
              <Label htmlFor="type-b2b" className="cursor-pointer font-normal">
                B2B (Empresas / Negocios)
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Vendes a otras empresas
              </p>
            </div>
          </div>

          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleBusinessTypeToggle('both')}
          >
            <Checkbox
              id="type-both"
              checked={data.businessType?.includes('both') || false}
              onCheckedChange={() => handleBusinessTypeToggle('both')}
            />
            <div className="flex-1">
              <Label htmlFor="type-both" className="cursor-pointer font-normal">
                Ambos
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Tanto a personas como a empresas
              </p>
            </div>
          </div>

          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleBusinessTypeToggle('unsure')}
          >
            <Checkbox
              id="type-unsure"
              checked={data.businessType?.includes('unsure') || false}
              onCheckedChange={() => handleBusinessTypeToggle('unsure')}
            />
            <div className="flex-1">
              <Label htmlFor="type-unsure" className="cursor-pointer font-normal">
                No estoy seguro
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
