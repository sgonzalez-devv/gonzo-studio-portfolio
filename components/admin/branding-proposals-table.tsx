"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Mail, Calendar, Building2, Target, Palette, Type, Users, Globe, Briefcase, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface BrandingProposal {
  id: string;
  current_stage?: string;
  brand_goal?: string;
  problem_solving?: string;
  current_frustrations?: string;
  brand_descriptors?: string[];
  tone_formal_casual?: number;
  tone_serious_fun?: number;
  tone_premium_accessible?: number;
  like_brands?: string;
  dislike_brands?: string;
  brand_name?: string;
  slogan?: string;
  domains?: string;
  name_type?: string;
  target_audience?: string;
  market?: string;
  business_type?: string[];
  contexts?: string[];
  context_details?: any;
  branding_level?: string;
  deadline?: string;
  budget_range?: string;
  restrictions?: string;
  brand_references?: string;
  additional_notes?: string;
  user_email?: string;
  submitted_at: string;
}

interface BrandingProposalsTableProps {
  proposals: BrandingProposal[];
}

export function BrandingProposalsTable({ proposals }: BrandingProposalsTableProps) {
  const [selectedProposal, setSelectedProposal] = useState<BrandingProposal | null>(null);

  const getStageBadge = (stage?: string) => {
    const stages: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      idea: { label: "💡 Idea", variant: "secondary" },
      building: { label: "🚧 En construcción", variant: "default" },
      operating: { label: "✅ Operando", variant: "outline" },
      undefined: { label: "❓ No definido", variant: "secondary" },
    };
    
    const stageInfo = stages[stage || "undefined"] || stages.undefined;
    return <Badge variant={stageInfo.variant}>{stageInfo.label}</Badge>;
  };

  const getBudgetBadge = (budget?: string) => {
    const budgets: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
      none: { label: "Sin definir", variant: "secondary" },
      low: { label: "$", variant: "outline" },
      medium: { label: "$$", variant: "default" },
      high: { label: "$$$", variant: "destructive" },
    };
    
    const budgetInfo = budgets[budget || "none"] || budgets.none;
    return <Badge variant={budgetInfo.variant}>{budgetInfo.label}</Badge>;
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Fecha</TableHead>
                  <TableHead className="font-semibold">Cliente</TableHead>
                  <TableHead className="font-semibold">Etapa</TableHead>
                  <TableHead className="font-semibold">Nivel</TableHead>
                  <TableHead className="font-semibold">Presupuesto</TableHead>
                  <TableHead className="text-right font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-16">
                      <div className="flex flex-col items-center gap-3">
                        <Building2 className="h-12 w-12 text-muted-foreground/50" />
                        <p className="text-lg font-medium">No hay propuestas aún</p>
                        <p className="text-sm">Las propuestas aparecerán aquí cuando los clientes completen el formulario</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  proposals.map((proposal) => (
                    <TableRow key={proposal.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDistanceToNow(new Date(proposal.submitted_at), {
                              addSuffix: true,
                              locale: es,
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {proposal.brand_name && (
                            <div className="font-medium flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-primary" />
                              {proposal.brand_name}
                            </div>
                          )}
                          {proposal.user_email && (
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {proposal.user_email}
                            </div>
                          )}
                          {!proposal.brand_name && !proposal.user_email && (
                            <span className="text-muted-foreground text-sm">Sin información</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStageBadge(proposal.current_stage)}</TableCell>
                      <TableCell>
                        {proposal.branding_level ? (
                          <Badge variant="outline" className="capitalize">
                            {proposal.branding_level}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getBudgetBadge(proposal.budget_range)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProposal(proposal)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal with proposal details */}
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-3 pb-4 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <DialogTitle className="text-3xl font-bold">
                  {selectedProposal?.brand_name || "Propuesta de Branding"}
                </DialogTitle>
                <DialogDescription className="text-base">
                  Enviada {selectedProposal && formatDistanceToNow(new Date(selectedProposal.submitted_at), {
                    addSuffix: true,
                    locale: es,
                  })}
                </DialogDescription>
              </div>
              {selectedProposal?.user_email && (
                <Button asChild variant="default" size="sm" className="gap-2">
                  <a href={`mailto:${selectedProposal.user_email}`}>
                    <Mail className="h-4 w-4" />
                    Contactar
                  </a>
                </Button>
              )}
            </div>
          </DialogHeader>

          {selectedProposal && (
            <div className="space-y-8 mt-6 pb-4">
              {/* Step 1: Starting Point */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl">Punto de partida</h3>
                  </div>
                  <div className="space-y-4 pl-13">
                    <div className="grid gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Etapa actual</p>
                        <div>{getStageBadge(selectedProposal.current_stage)}</div>
                      </div>
                      {selectedProposal.brand_goal && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Objetivo de la marca</p>
                          <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md">
                            {selectedProposal.brand_goal}
                          </p>
                        </div>
                      )}
                      {selectedProposal.problem_solving && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Problema que resuelve</p>
                          <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md">
                            {selectedProposal.problem_solving}
                          </p>
                        </div>
                      )}
                      {selectedProposal.current_frustrations && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Frustraciones actuales</p>
                          <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md">
                            {selectedProposal.current_frustrations}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Personality */}
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Palette className="h-5 w-5 text-purple-500" />
                    </div>
                    <h3 className="font-bold text-xl">Personalidad de marca</h3>
                  </div>
                  <div className="space-y-4 pl-13">
                    {selectedProposal.brand_descriptors && selectedProposal.brand_descriptors.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Descriptores de marca</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProposal.brand_descriptors.map((desc, i) => (
                            <Badge key={i} variant="secondary" className="text-sm py-1 px-3">{desc}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {(selectedProposal.tone_formal_casual !== undefined || 
                      selectedProposal.tone_serious_fun !== undefined || 
                      selectedProposal.tone_premium_accessible !== undefined) && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Escalas de tono</p>
                        <div className="space-y-3 bg-muted/30 p-4 rounded-md">
                          {selectedProposal.tone_formal_casual !== undefined && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Formal ← → Casual</span>
                              <Badge variant="outline" className="font-semibold">{selectedProposal.tone_formal_casual}%</Badge>
                            </div>
                          )}
                          {selectedProposal.tone_serious_fun !== undefined && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Serio ← → Divertido</span>
                              <Badge variant="outline" className="font-semibold">{selectedProposal.tone_serious_fun}%</Badge>
                            </div>
                          )}
                          {selectedProposal.tone_premium_accessible !== undefined && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Premium ← → Accesible</span>
                              <Badge variant="outline" className="font-semibold">{selectedProposal.tone_premium_accessible}%</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {selectedProposal.like_brands && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Marcas que le gustan</p>
                        <p className="text-base leading-relaxed bg-green-500/10 border border-green-500/20 p-3 rounded-md">
                          {selectedProposal.like_brands}
                        </p>
                      </div>
                    )}
                    {selectedProposal.dislike_brands && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Marcas que NO le gustan</p>
                        <p className="text-base leading-relaxed bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                          {selectedProposal.dislike_brands}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Name & Basics */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Type className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-xl">Nombre y básicos</h3>
                  </div>
                  <div className="space-y-4 pl-13">
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProposal.brand_name && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Nombre de marca</p>
                          <p className="text-lg font-bold text-primary">{selectedProposal.brand_name}</p>
                        </div>
                      )}
                      {selectedProposal.name_type && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Tipo de nombre</p>
                          <Badge variant="outline" className="capitalize text-sm">{selectedProposal.name_type}</Badge>
                        </div>
                      )}
                    </div>
                    {selectedProposal.slogan && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Slogan</p>
                        <p className="text-base italic leading-relaxed bg-muted/30 p-3 rounded-md">
                          "{selectedProposal.slogan}"
                        </p>
                      </div>
                    )}
                    {selectedProposal.domains && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Dominios</p>
                        <p className="text-base font-mono bg-muted/30 p-3 rounded-md">
                          {selectedProposal.domains}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Step 4: Audience & Market */}
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="font-bold text-xl">Audiencia y mercado</h3>
                  </div>
                  <div className="space-y-4 pl-13">
                    {selectedProposal.target_audience && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Audiencia objetivo</p>
                        <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md">
                          {selectedProposal.target_audience}
                        </p>
                      </div>
                    )}
                    {selectedProposal.market && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Mercado</p>
                        <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md">
                          {selectedProposal.market}
                        </p>
                      </div>
                    )}
                    {selectedProposal.business_type && selectedProposal.business_type.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Tipo de negocio</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProposal.business_type.map((type, i) => (
                            <Badge key={i} variant="default" className="text-sm py-1 px-3">{type.toUpperCase()}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Step 5: Contexts */}
              {selectedProposal.contexts && selectedProposal.contexts.length > 0 && (
                <Card className="border-l-4 border-l-cyan-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-cyan-500" />
                      </div>
                      <h3 className="font-bold text-xl">Contextos de uso</h3>
                    </div>
                    <div className="pl-13">
                      <div className="flex flex-wrap gap-2">
                        {selectedProposal.contexts.map((context, i) => (
                          <Badge key={i} variant="secondary" className="text-sm py-1 px-3">{context}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 6: Branding Depth */}
              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-emerald-500" />
                    </div>
                    <h3 className="font-bold text-xl">Profundidad de branding</h3>
                  </div>
                  <div className="space-y-4 pl-13">
                    <div className="grid md:grid-cols-3 gap-4">
                      {selectedProposal.branding_level && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Nivel de branding</p>
                          <Badge variant="default" className="capitalize text-sm py-1 px-3">
                            {selectedProposal.branding_level}
                          </Badge>
                        </div>
                      )}
                      {selectedProposal.deadline && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Deadline</p>
                          <p className="text-base font-medium">{selectedProposal.deadline}</p>
                        </div>
                      )}
                      {selectedProposal.budget_range && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Presupuesto</p>
                          <div>{getBudgetBadge(selectedProposal.budget_range)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 7: Final Details */}
              <Card className="border-l-4 border-l-violet-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-violet-500" />
                    </div>
                    <h3 className="font-bold text-xl">Detalles finales</h3>
                  </div>
                  <div className="space-y-4 pl-13">
                    {selectedProposal.restrictions && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Restricciones</p>
                        <p className="text-base leading-relaxed bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-md whitespace-pre-wrap">
                          {selectedProposal.restrictions}
                        </p>
                      </div>
                    )}
                    {selectedProposal.brand_references && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Referencias</p>
                        <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md whitespace-pre-wrap">
                          {selectedProposal.brand_references}
                        </p>
                      </div>
                    )}
                    {selectedProposal.additional_notes && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Notas adicionales</p>
                        <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md whitespace-pre-wrap">
                          {selectedProposal.additional_notes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
