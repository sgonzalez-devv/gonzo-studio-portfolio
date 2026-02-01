"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Graphic Design Studio</span>
            </div>
          </div>

          {/* Logo */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 mb-8">
            <Image
              src="/images/logo-text.png"
              alt="Gonzo Studio"
              width={400}
              height={120}
              className="h-24 sm:h-32 w-auto"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl text-balance">
            {t.hero.title}
          </h1>

          {/* Subheadline */}
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2 group" asChild>
              <a href="#projects">
                {t.hero.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">{t.hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="h-2 w-1 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
