"use client";

import React from "react"

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Call to Action Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-2 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background p-12">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                
                <div className="relative z-10 text-center space-y-8">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>

                  {/* Heading */}
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      ¿Listo para construir tu marca?
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                      Completa nuestro formulario de branding y cuéntanos sobre tu proyecto. 
                      Es rápido, sencillo y completamente opcional en cada paso.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid sm:grid-cols-3 gap-4 text-sm max-w-2xl mx-auto">
                    <div className="p-4 bg-background/50 backdrop-blur rounded-lg border border-border/50">
                      <p className="font-medium text-foreground mb-1">Sin compromiso</p>
                      <p className="text-muted-foreground text-xs">
                        Todos los campos son opcionales
                      </p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur rounded-lg border border-border/50">
                      <p className="font-medium text-foreground mb-1">5-10 minutos</p>
                      <p className="text-muted-foreground text-xs">
                        Responde solo lo que quieras
                      </p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur rounded-lg border border-border/50">
                      <p className="font-medium text-foreground mb-1">Respuesta rápida</p>
                      <p className="text-muted-foreground text-xs">
                        Te contactamos en 24-48h
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button asChild size="lg" className="gap-2 text-base px-8 h-14 shadow-lg">
                      <Link href="/branding-form">
                        Comenzar formulario
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Helper text */}
                  <p className="text-sm text-muted-foreground pt-4">
                    ¿Prefieres escribirnos directamente? {" "}
                    <a 
                      href="mailto:work.gonzostudio@outlook.com" 
                      className="text-primary hover:underline font-medium"
                    >
                      work.gonzostudio@outlook.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
