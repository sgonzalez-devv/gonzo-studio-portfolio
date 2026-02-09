"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step6BrandingDepth({ data, updateData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          No todas las marcas necesitan lo mismo.
        </p>
      </div>

      {/* Branding Level */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          ¿Qué nivel de branding estás buscando?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Esto nos ayuda a proponer el alcance correcto
        </p>
        
        <RadioGroup
          value={data.brandingLevel}
          onValueChange={(value) => updateData({ brandingLevel: value as any })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="basic" id="level-basic" />
            <div className="flex-1">
              <Label htmlFor="level-basic" className="cursor-pointer font-normal">
                Básico (logo + colores)
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Lo esencial para empezar: logo, paleta de colores, tipografía básica
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="professional" id="level-professional" />
            <div className="flex-1">
              <Label htmlFor="level-professional" className="cursor-pointer font-normal">
                Profesional (sistema visual completo)
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Identidad completa: logo system, guía de marca, templates, papelería
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="premium" id="level-premium" />
            <div className="flex-1">
              <Label htmlFor="level-premium" className="cursor-pointer font-normal">
                Premium (branding + motion + UI + guías avanzadas)
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Sistema completo: todo lo anterior + motion design, UI kit, guías extendidas
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="unsure" id="level-unsure" />
            <div className="flex-1">
              <Label htmlFor="level-unsure" className="cursor-pointer font-normal">
                No estoy seguro aún
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                No hay problema, podemos hablarlo después
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Deadline */}
      <div className="space-y-3">
        <Label htmlFor="deadline" className="text-base font-medium">
          ¿Tienes algún deadline aproximado?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Puede ser una fecha o algo como "en 2 meses"
        </p>
        <Input
          id="deadline"
          value={data.deadline || ""}
          onChange={(e) => updateData({ deadline: e.target.value })}
          placeholder="Ej: Finales de marzo, en 3 meses, no tengo prisa..."
          className="text-base"
        />
      </div>

      {/* Budget Range */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          ¿Tienes un rango de presupuesto en mente?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Esto nos ayuda a proponer opciones realistas
        </p>
        
        <RadioGroup
          value={data.budgetRange}
          onValueChange={(value) => updateData({ budgetRange: value as any })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="none" id="budget-none" />
            <Label htmlFor="budget-none" className="cursor-pointer flex-1 font-normal">
              Aún no
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="low" id="budget-low" />
            <div className="flex-1">
              <Label htmlFor="budget-low" className="cursor-pointer font-normal">
                Bajo
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Proyecto inicial o emprendimiento
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="medium" id="budget-medium" />
            <div className="flex-1">
              <Label htmlFor="budget-medium" className="cursor-pointer font-normal">
                Medio
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Empresa establecida o en crecimiento
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <RadioGroupItem value="high" id="budget-high" />
            <div className="flex-1">
              <Label htmlFor="budget-high" className="cursor-pointer font-normal">
                Alto
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Proyecto premium con alcance completo
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
