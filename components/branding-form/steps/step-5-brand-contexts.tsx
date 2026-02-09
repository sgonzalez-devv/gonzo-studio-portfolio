"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { BRAND_CONTEXTS } from "@/lib/branding-form-types";
import type { BrandingFormData } from "@/lib/branding-form-types";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step5BrandContexts({ data, updateData }: StepProps) {
  const [showDetails, setShowDetails] = useState<Set<string>>(new Set());

  const handleContextToggle = (context: string) => {
    const current = data.contexts || [];
    const updated = current.includes(context)
      ? current.filter((c) => c !== context)
      : [...current, context];
    updateData({ contexts: updated });

    // Show/hide detail fields
    if (updated.includes(context)) {
      setShowDetails(new Set([...showDetails, context]));
    } else {
      const newDetails = new Set(showDetails);
      newDetails.delete(context);
      setShowDetails(newDetails);
    }
  };

  const updateContextDetail = (context: string, value: string) => {
    updateData({
      contextDetails: {
        ...(data.contextDetails || {}),
        [context]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Selecciona solo lo que aplique ahora o en el futuro cercano.
        </p>
      </div>

      {/* Brand Contexts */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          ¿En qué contextos se usará la marca?
        </Label>
        <p className="text-sm text-muted-foreground -mt-1">
          Opcional · Selecciona todos los que apliquen
        </p>

        <div className="space-y-3">
          {BRAND_CONTEXTS.map((context) => (
            <div key={context.value}>
              <div
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleContextToggle(context.value)}
              >
                <Checkbox
                  id={`context-${context.value}`}
                  checked={data.contexts?.includes(context.value) || false}
                  onCheckedChange={() => handleContextToggle(context.value)}
                />
                <Label
                  htmlFor={`context-${context.value}`}
                  className="cursor-pointer flex-1 font-normal"
                >
                  {context.label}
                </Label>
              </div>

              {/* Conditional detail fields */}
              {data.contexts?.includes(context.value) && 
               ['social', 'website', 'app', 'physical'].includes(context.value) && (
                <div className="mt-2 ml-11 space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-sm text-muted-foreground">
                    {context.value === 'social' && '¿Qué redes sociales?'}
                    {context.value === 'website' && '¿Tienes dominio o idea de lo que necesitas?'}
                    {context.value === 'app' && '¿Qué tipo de app?'}
                    {context.value === 'physical' && '¿Qué tipo de producto?'}
                  </Label>
                  <Textarea
                    value={data.contextDetails?.[context.value as keyof typeof data.contextDetails] || ""}
                    onChange={(e) => updateContextDetail(context.value, e.target.value)}
                    placeholder={
                      context.value === 'social' ? 'Ej: Instagram, TikTok, LinkedIn...' :
                      context.value === 'website' ? 'Ej: E-commerce, portafolio, landing page...' :
                      context.value === 'app' ? 'Ej: App móvil, web app, SaaS...' :
                      'Ej: Empaque, etiquetas, cajas...'
                    }
                    className="min-h-20 resize-none"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Context Info */}
      {data.contexts && data.contexts.length > 0 && !data.contexts.includes('unsure') && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 Perfecto. Con esta información podremos adaptar el branding a cada contexto que necesites.
          </p>
        </div>
      )}
    </div>
  );
}
