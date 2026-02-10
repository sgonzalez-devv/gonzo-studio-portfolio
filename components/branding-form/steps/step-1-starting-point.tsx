"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step1StartingPoint({ data, updateData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Vamos paso a paso. No necesitas tener nada definido todavía.
        </p>
      </div>

      {/* Current Stage */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          ¿En qué etapa te encuentras ahora mismo?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Selecciona lo que mejor describa tu situación actual
        </p>
        
        <RadioGroup
          value={data.currentStage}
          onValueChange={(value) => updateData({ currentStage: value as any })}
          className="space-y-3"
        >
          <Label 
            htmlFor="stage-idea" 
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem value="idea" id="stage-idea" />
            <span className="flex-1 font-normal">
              Solo una idea
            </span>
          </Label>
          
          <Label 
            htmlFor="stage-building" 
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem value="building" id="stage-building" />
            <span className="flex-1 font-normal">
              Proyecto en construcción
            </span>
          </Label>
          
          <Label 
            htmlFor="stage-operating" 
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem value="operating" id="stage-operating" />
            <span className="flex-1 font-normal">
              Empresa ya operando
            </span>
          </Label>
          
          <Label 
            htmlFor="stage-undefined" 
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem value="undefined" id="stage-undefined" />
            <span className="flex-1 font-normal">
              Prefiero no definirlo aún
            </span>
          </Label>
        </RadioGroup>
      </div>

      {/* Brand Goal */}
      <div className="space-y-3">
        <Label htmlFor="brandGoal" className="text-base font-medium">
          Cuéntanos brevemente qué te gustaría lograr con esta marca
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Puede ser una idea suelta, no tiene que estar perfecta
        </p>
        <Textarea
          id="brandGoal"
          value={data.brandGoal || ""}
          onChange={(e) => updateData({ brandGoal: e.target.value })}
          placeholder="Ej: Quiero que mi marca transmita profesionalismo pero también cercanía..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Problem Solving */}
      <div className="space-y-3">
        <Label htmlFor="problemSolving" className="text-base font-medium">
          ¿Hay algún problema que esta marca viene a resolver?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Si no lo tienes claro aún, puedes dejarlo en blanco
        </p>
        <Textarea
          id="problemSolving"
          value={data.problemSolving || ""}
          onChange={(e) => updateData({ problemSolving: e.target.value })}
          placeholder="Ej: Los clientes actuales no encuentran opciones de calidad a precios accesibles..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Current Frustrations */}
      <div className="space-y-3">
        <Label htmlFor="frustrations" className="text-base font-medium">
          ¿Existe algo que hoy te frustre de tu proyecto o marca actual?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Esto nos ayuda a entender qué evitar o mejorar
        </p>
        <Textarea
          id="frustrations"
          value={data.currentFrustrations || ""}
          onChange={(e) => updateData({ currentFrustrations: e.target.value })}
          placeholder="Ej: Mi logo actual parece muy genérico y no me representa..."
          className="min-h-24 resize-none"
        />
      </div>
    </div>
  );
}
