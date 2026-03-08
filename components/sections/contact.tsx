"use client";

import React from "react"

import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-linear-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transition-all group-hover:blur-2xl" />
            <div className="relative bg-background/50 backdrop-blur border border-border/50 rounded-2xl p-6 transition-all group-hover:border-primary/50 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {t.contact.benefits.free.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.contact.benefits.free.description}
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transition-all group-hover:blur-2xl" />
            <div className="relative bg-background/50 backdrop-blur border border-border/50 rounded-2xl p-6 transition-all group-hover:border-primary/50 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {t.contact.benefits.duration.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.contact.benefits.duration.description}
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transition-all group-hover:blur-2xl" />
            <div className="relative bg-background/50 backdrop-blur border border-border/50 rounded-2xl p-6 transition-all group-hover:border-primary/50 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {t.contact.benefits.easy.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.contact.benefits.easy.description}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
          <Button asChild size="lg" className="w-full gap-2 text-base h-14 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
            <Link href="/book-appointment">
              {t.contact.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          {/* Email Alternative */}
          <p className="text-sm text-muted-foreground text-center">
            {t.contact.emailText}{" "}
            <a 
              href="mailto:work.gonzostudio@outlook.com" 
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              work.gonzostudio@outlook.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
