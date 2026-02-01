"use client";

import Image from "next/image";
import { ExternalLink, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import useSWR from "swr";

interface Project {
  id: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  image_url: string | null;
  technologies: string[];
  project_url: string | null;
  is_featured: boolean;
  display_order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const { data: projects, isLoading } = useSWR<Project[]>("/api/projects", fetcher);

  const featuredProjects = projects?.filter((p) => p.is_featured) ?? [];

  return (
    <section id="projects" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.projects.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-6 bg-muted rounded w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <a
                  href={project.project_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video relative overflow-hidden bg-muted cursor-pointer"
                >
                  {project.image_url ? (
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={language === "en" ? project.title_en : project.title_es}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
                      <Folder className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                  {project.project_url && (
                    <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-background/90 text-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                        {t.projects.viewProject}
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </a>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {language === "en" ? project.title_en : project.title_es}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {language === "en" ? project.description_en : project.description_es}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Folder className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">{t.projects.noProjects}</p>
          </div>
        )}
      </div>
    </section>
  );
}
