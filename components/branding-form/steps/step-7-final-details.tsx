"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step7FinalDetails({ data, updateData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Este espacio es para lo que no encaja en las preguntas anteriores.
        </p>
      </div>

      {/* Restrictions */}
      <div className="space-y-3">
        <Label htmlFor="restrictions" className="text-base font-medium">
          ¿Hay algo que definitivamente NO quieres para tu marca?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Colores, estilos, formas, referencias que prefieres evitar
        </p>
        <Textarea
          id="restrictions"
          value={data.restrictions || ""}
          onChange={(e) => updateData({ restrictions: e.target.value })}
          placeholder="Ej: Nada de verde, evitar símbolos muy geométricos, no quiero parecerme a..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* References */}
      <div className="space-y-3">
        <Label htmlFor="references" className="text-base font-medium">
          ¿Hay referencias visuales, ideas o archivos que quieras compartir?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Links, imágenes, moodboards, cualquier cosa que ayude
        </p>
        <Textarea
          id="references"
          value={data.references || ""}
          onChange={(e) => updateData({ references: e.target.value })}
          placeholder="Pega aquí links, describe ideas visuales, o menciona cualquier referencia..."
          className="min-h-32 resize-none"
        />
        <p className="text-xs text-muted-foreground">
          💡 Tip: Puedes compartir Pinterest boards, Behance, Dribbble, o cualquier link
        </p>
      </div>

      {/* Additional Notes */}
      <div className="space-y-3">
        <Label htmlFor="additionalNotes" className="text-base font-medium">
          ¿Hay algo más que creas importante y no te preguntamos?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Cualquier cosa que quieras que sepamos
        </p>
        <Textarea
          id="additionalNotes"
          value={data.additionalNotes || ""}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          placeholder="Comparte cualquier cosa que consideres relevante..."
          className="min-h-32 resize-none"
        />
      </div>

      {/* Contact Email (Optional) */}
      <div className="space-y-3">
        <Label htmlFor="userEmail" className="text-base font-medium">
          ¿Cuál es tu email de contacto?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Para enviarte el resumen y contactarte si es necesario
        </p>
        <Input
          id="userEmail"
          type="email"
          value={data.userEmail || ""}
          onChange={(e) => updateData({ userEmail: e.target.value })}
          placeholder="tu@email.com"
          className="text-base"
        />
      </div>

      {/* Final Message */}
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
        <h3 className="font-semibold text-foreground">
          ¡Casi listo! 🎉
        </h3>
        <p className="text-sm text-muted-foreground">
          Cuando presiones "Enviar formulario", recibirás toda tu información por email 
          y nos pondremos en contacto contigo pronto para comenzar a trabajar en tu marca.
        </p>
        <p className="text-sm text-muted-foreground">
          Recuerda que todo es flexible. Podemos ajustar, cambiar o añadir lo que necesites 
          durante el proceso.
        </p>
      </div>
    </div>
  );
}
