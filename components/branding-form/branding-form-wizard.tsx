"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { BrandingFormData } from "@/lib/branding-form-types";

// Import step components
import { Step1StartingPoint } from "./steps/step-1-starting-point";
import { Step2Personality } from "./steps/step-2-personality";
import { Step3NameBasics } from "./steps/step-3-name-basics";
import { Step4AudienceMarket } from "./steps/step-4-audience-market";
import { Step5BrandContexts } from "./steps/step-5-brand-contexts";
import { Step6BrandingDepth } from "./steps/step-6-branding-depth";
import { Step7FinalDetails } from "./steps/step-7-final-details";

const STEPS = [
  { id: 1, title: "Punto de partida", description: "Cuéntanos dónde estás hoy" },
  { id: 2, title: "Personalidad", description: "Cómo debería sentirse tu marca" },
  { id: 3, title: "Nombre y básicos", description: "Si ya tienes algo definido" },
  { id: 4, title: "Público y mercado", description: "A quién le hablas" },
  { id: 5, title: "Dónde vivirá", description: "Contextos de uso" },
  { id: 6, title: "Profundidad", description: "Qué nivel de branding buscas" },
  { id: 7, title: "Últimos detalles", description: "Referencias y extras" },
];

export function BrandingFormWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BrandingFormData>({});

  const progress = (currentStep / STEPS.length) * 100;

  const updateFormData = (data: Partial<BrandingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Add submission timestamp
      const finalData = {
        ...formData,
        submittedAt: new Date(),
      };

      // Send to API
      const response = await fetch('/api/branding-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        // Redirect to thank you page
        router.push('/branding-form/thank-you');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1StartingPoint data={formData} updateData={updateFormData} />;
      case 2:
        return <Step2Personality data={formData} updateData={updateFormData} />;
      case 3:
        return <Step3NameBasics data={formData} updateData={updateFormData} />;
      case 4:
        return <Step4AudienceMarket data={formData} updateData={updateFormData} />;
      case 5:
        return <Step5BrandContexts data={formData} updateData={updateFormData} />;
      case 6:
        return <Step6BrandingDepth data={formData} updateData={updateFormData} />;
      case 7:
        return <Step7FinalDetails data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Formulario de Branding
          </h1>
          <p className="text-muted-foreground text-lg">
            Todos los campos son opcionales. Responde solo lo que tengas claro hoy.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Paso {currentStep} de {STEPS.length}
            </span>
            <span className="text-sm font-medium text-foreground">
              {Math.round(progress)}% completado
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stepper */}
        <div className="mb-8 hidden sm:block">
          <div className="flex justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2
                    transition-all duration-200
                    ${
                      currentStep > step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-background border-muted-foreground/30 text-muted-foreground"
                    }
                  `}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`
                      h-0.5 w-full mt-5 -ml-full transition-all duration-200
                      ${currentStep > step.id ? "bg-primary" : "bg-muted"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Title */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-base">
              {STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Step Content */}
        <Card>
          <CardContent className="pt-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>

          {currentStep < STEPS.length ? (
            <Button onClick={handleNext} className="gap-2">
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
              {isSubmitting ? "Enviando..." : "Enviar formulario"}
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Helper Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Puedes navegar entre pasos libremente. Tu progreso se guarda automáticamente.
        </p>
      </div>
    </div>
  );
}
