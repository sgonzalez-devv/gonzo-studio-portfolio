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
import { Eye, Mail, Calendar, Building2 } from "lucide-react";
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Nombre/Email</TableHead>
              <TableHead>Etapa</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Presupuesto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No hay propuestas aún
                </TableCell>
              </TableRow>
            ) : (
              proposals.map((proposal) => (
                <TableRow key={proposal.id}>
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
                    <div>
                      {proposal.brand_name && (
                        <div className="font-medium flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {proposal.brand_name}
                        </div>
                      )}
                      {proposal.user_email && (
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
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
                      <span className="capitalize text-sm">{proposal.branding_level}</span>
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
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal with proposal details */}
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedProposal?.brand_name || "Propuesta de Branding"}
            </DialogTitle>
            <DialogDescription>
              Enviada {selectedProposal && formatDistanceToNow(new Date(selectedProposal.submitted_at), {
                addSuffix: true,
                locale: es,
              })}
            </DialogDescription>
          </DialogHeader>

          {selectedProposal && (
            <div className="space-y-6 mt-4">
              {/* Contact Info */}
              {selectedProposal.user_email && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contacto
                  </h3>
                  <a 
                    href={`mailto:${selectedProposal.user_email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedProposal.user_email}
                  </a>
                </div>
              )}

              {/* Step 1: Starting Point */}
              <div>
                <h3 className="font-semibold text-lg mb-3">1. Punto de partida</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Etapa actual</p>
                    <p className="mt-1">{getStageBadge(selectedProposal.current_stage)}</p>
                  </div>
                  {selectedProposal.brand_goal && (
                    <div>
                      <p className="text-sm text-muted-foreground">Objetivo de la marca</p>
                      <p className="mt-1">{selectedProposal.brand_goal}</p>
                    </div>
                  )}
                  {selectedProposal.problem_solving && (
                    <div>
                      <p className="text-sm text-muted-foreground">Problema que resuelve</p>
                      <p className="mt-1">{selectedProposal.problem_solving}</p>
                    </div>
                  )}
                  {selectedProposal.current_frustrations && (
                    <div>
                      <p className="text-sm text-muted-foreground">Frustraciones actuales</p>
                      <p className="mt-1">{selectedProposal.current_frustrations}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Personality */}
              <div>
                <h3 className="font-semibold text-lg mb-3">2. Personalidad</h3>
                <div className="space-y-3">
                  {selectedProposal.brand_descriptors && selectedProposal.brand_descriptors.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Descriptores de marca</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProposal.brand_descriptors.map((desc, i) => (
                          <Badge key={i} variant="secondary">{desc}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {(selectedProposal.tone_formal_casual !== undefined || 
                    selectedProposal.tone_serious_fun !== undefined || 
                    selectedProposal.tone_premium_accessible !== undefined) && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Escalas de tono</p>
                      <div className="space-y-2 text-sm">
                        {selectedProposal.tone_formal_casual !== undefined && (
                          <div className="flex justify-between">
                            <span>Formal ← → Casual</span>
                            <span className="font-medium">{selectedProposal.tone_formal_casual}%</span>
                          </div>
                        )}
                        {selectedProposal.tone_serious_fun !== undefined && (
                          <div className="flex justify-between">
                            <span>Serio ← → Divertido</span>
                            <span className="font-medium">{selectedProposal.tone_serious_fun}%</span>
                          </div>
                        )}
                        {selectedProposal.tone_premium_accessible !== undefined && (
                          <div className="flex justify-between">
                            <span>Premium ← → Accesible</span>
                            <span className="font-medium">{selectedProposal.tone_premium_accessible}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {selectedProposal.like_brands && (
                    <div>
                      <p className="text-sm text-muted-foreground">Marcas que le gustan</p>
                      <p className="mt-1">{selectedProposal.like_brands}</p>
                    </div>
                  )}
                  {selectedProposal.dislike_brands && (
                    <div>
                      <p className="text-sm text-muted-foreground">Marcas que NO le gustan</p>
                      <p className="mt-1">{selectedProposal.dislike_brands}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Name & Basics */}
              <div>
                <h3 className="font-semibold text-lg mb-3">3. Nombre y básicos</h3>
                <div className="space-y-3">
                  {selectedProposal.brand_name && (
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre de marca</p>
                      <p className="mt-1 font-medium">{selectedProposal.brand_name}</p>
                    </div>
                  )}
                  {selectedProposal.slogan && (
                    <div>
                      <p className="text-sm text-muted-foreground">Slogan</p>
                      <p className="mt-1">{selectedProposal.slogan}</p>
                    </div>
                  )}
                  {selectedProposal.domains && (
                    <div>
                      <p className="text-sm text-muted-foreground">Dominios</p>
                      <p className="mt-1">{selectedProposal.domains}</p>
                    </div>
                  )}
                  {selectedProposal.name_type && (
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo de nombre</p>
                      <p className="mt-1 capitalize">{selectedProposal.name_type}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Audience & Market */}
              <div>
                <h3 className="font-semibold text-lg mb-3">4. Audiencia y mercado</h3>
                <div className="space-y-3">
                  {selectedProposal.target_audience && (
                    <div>
                      <p className="text-sm text-muted-foreground">Audiencia objetivo</p>
                      <p className="mt-1">{selectedProposal.target_audience}</p>
                    </div>
                  )}
                  {selectedProposal.market && (
                    <div>
                      <p className="text-sm text-muted-foreground">Mercado</p>
                      <p className="mt-1">{selectedProposal.market}</p>
                    </div>
                  )}
                  {selectedProposal.business_type && selectedProposal.business_type.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo de negocio</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProposal.business_type.map((type, i) => (
                          <Badge key={i} variant="outline">{type.toUpperCase()}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 5: Contexts */}
              {selectedProposal.contexts && selectedProposal.contexts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">5. Contextos de uso</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProposal.contexts.map((context, i) => (
                      <Badge key={i} variant="secondary">{context}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Branding Depth */}
              <div>
                <h3 className="font-semibold text-lg mb-3">6. Profundidad de branding</h3>
                <div className="space-y-3">
                  {selectedProposal.branding_level && (
                    <div>
                      <p className="text-sm text-muted-foreground">Nivel de branding</p>
                      <p className="mt-1 capitalize font-medium">{selectedProposal.branding_level}</p>
                    </div>
                  )}
                  {selectedProposal.deadline && (
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="mt-1">{selectedProposal.deadline}</p>
                    </div>
                  )}
                  {selectedProposal.budget_range && (
                    <div>
                      <p className="text-sm text-muted-foreground">Rango de presupuesto</p>
                      <p className="mt-1">{getBudgetBadge(selectedProposal.budget_range)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 7: Final Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3">7. Detalles finales</h3>
                <div className="space-y-3">
                  {selectedProposal.restrictions && (
                    <div>
                      <p className="text-sm text-muted-foreground">Restricciones</p>
                      <p className="mt-1">{selectedProposal.restrictions}</p>
                    </div>
                  )}
                  {selectedProposal.brand_references && (
                    <div>
                      <p className="text-sm text-muted-foreground">Referencias</p>
                      <p className="mt-1 whitespace-pre-wrap">{selectedProposal.brand_references}</p>
                    </div>
                  )}
                  {selectedProposal.additional_notes && (
                    <div>
                      <p className="text-sm text-muted-foreground">Notas adicionales</p>
                      <p className="mt-1 whitespace-pre-wrap">{selectedProposal.additional_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
