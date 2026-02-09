"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step3NameBasics({ data, updateData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Si aún no tienes nombre, no pasa nada. Podemos trabajar sin uno.
        </p>
      </div>

      {/* Brand Name */}
      <div className="space-y-3">
        <Label htmlFor="brandName" className="text-base font-medium">
          ¿Tu marca ya tiene nombre?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Si aún no lo tienes, déjalo en blanco
        </p>
        <Input
          id="brandName"
          value={data.brandName || ""}
          onChange={(e) => updateData({ brandName: e.target.value })}
          placeholder="Ej: Gonzo Studio"
          className="text-base"
        />
      </div>

      {/* Slogan */}
      <div className="space-y-3">
        <Label htmlFor="slogan" className="text-base font-medium">
          ¿Tiene slogan o frase clave?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · No es necesario tenerlo ahora
        </p>
        <Input
          id="slogan"
          value={data.slogan || ""}
          onChange={(e) => updateData({ slogan: e.target.value })}
          placeholder='Ej: "Diseñamos experiencias que conectan"'
          className="text-base"
        />
      </div>

      {/* Domains */}
      <div className="space-y-3">
        <Label htmlFor="domains" className="text-base font-medium">
          ¿Tienes dominio web o redes sociales reservadas?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Si tienes algo, compártelo aquí
        </p>
        <Textarea
          id="domains"
          value={data.domains || ""}
          onChange={(e) => updateData({ domains: e.target.value })}
          placeholder="Ej: www.midominio.com, @instagram, @tiktok..."
          className="min-h-20 resize-none"
        />
      </div>

      {/* Name Type Preference */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          Si no tienes nombre, ¿qué tipo de nombre te gustaría?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Esto nos ayuda si necesitamos sugerir opciones
        </p>
        
        <RadioGroup
          value={data.nameType}
          onValueChange={(value) => updateData({ nameType: value as any })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="descriptive" id="name-descriptive" />
            <div className="flex-1">
              <Label htmlFor="name-descriptive" className="cursor-pointer font-normal">
                Descriptivo
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Ej: Digital Solutions, Coffee House
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="creative" id="name-creative" />
            <div className="flex-1">
              <Label htmlFor="name-creative" className="cursor-pointer font-normal">
                Creativo
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Ej: Spotify, Uber, Canva
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="abstract" id="name-abstract" />
            <div className="flex-1">
              <Label htmlFor="name-abstract" className="cursor-pointer font-normal">
                Abstracto
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Ej: Nike, Kodak, Xerox
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="personal" id="name-personal" />
            <div className="flex-1">
              <Label htmlFor="name-personal" className="cursor-pointer font-normal">
                Personal
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Ej: Basado en tu nombre o iniciales
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="undecided" id="name-undecided" />
            <div className="flex-1">
              <Label htmlFor="name-undecided" className="cursor-pointer font-normal">
                No lo he pensado aún
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
