"use client";

import { Target, Eye, Heart, Lightbulb, Award, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

const valueIcons = [Lightbulb, Award, Users, Shield];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.about.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.about.subtitle}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {t.about.mission.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {t.about.mission.description}
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {t.about.vision.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {t.about.vision.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">
              {t.about.values.title}
            </h3>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.values.items.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <Card
                key={value.title}
                className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
