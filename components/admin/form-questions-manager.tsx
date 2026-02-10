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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface FormQuestion {
  id: string;
  step_number: number;
  question_text: string;
  question_type: string;
  placeholder?: string;
  helper_text?: string;
  options?: any;
  is_required: boolean;
  field_name: string;
  display_order: number;
  is_active: boolean;
}

interface FormQuestionsManagerProps {
  questions: FormQuestion[];
}

const QUESTION_TYPES = [
  { value: "text", label: "Texto corto" },
  { value: "textarea", label: "Texto largo" },
  { value: "radio", label: "Selección única" },
  { value: "checkbox", label: "Selección múltiple" },
  { value: "slider", label: "Deslizador" },
  { value: "select", label: "Desplegable" },
];

const STEPS = [
  { value: 1, label: "Paso 1: Punto de partida" },
  { value: 2, label: "Paso 2: Personalidad" },
  { value: 3, label: "Paso 3: Nombre y básicos" },
  { value: 4, label: "Paso 4: Audiencia y mercado" },
  { value: 5, label: "Paso 5: Contextos" },
  { value: 6, label: "Paso 6: Profundidad" },
  { value: 7, label: "Paso 7: Detalles finales" },
];

export function FormQuestionsManager({ questions }: FormQuestionsManagerProps) {
  const router = useRouter();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<FormQuestion | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    step_number: 1,
    question_text: "",
    question_type: "text",
    placeholder: "",
    helper_text: "",
    field_name: "",
    is_required: false,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      step_number: 1,
      question_text: "",
      question_type: "text",
      placeholder: "",
      helper_text: "",
      field_name: "",
      is_required: false,
      is_active: true,
    });
    setEditingQuestion(null);
  };

  const handleSave = async () => {
    const supabase = createClient();
    
    // Get max display_order for the step
    const questionsInStep = questions.filter(q => q.step_number === formData.step_number);
    const maxOrder = questionsInStep.length > 0 
      ? Math.max(...questionsInStep.map(q => q.display_order))
      : 0;

    const questionData = {
      ...formData,
      display_order: editingQuestion ? editingQuestion.display_order : maxOrder + 1,
    };

    if (editingQuestion) {
      // Update
      const { error } = await supabase
        .from("form_questions")
        .update(questionData)
        .eq("id", editingQuestion.id);

      if (error) {
        console.error("Error updating question:", error);
        alert("Error al actualizar la pregunta");
        return;
      }
    } else {
      // Insert
      const { error } = await supabase
        .from("form_questions")
        .insert([questionData]);

      if (error) {
        console.error("Error adding question:", error);
        alert("Error al agregar la pregunta");
        return;
      }
    }

    setIsAddDialogOpen(false);
    resetForm();
    router.refresh();
  };

  const handleEdit = (question: FormQuestion) => {
    setFormData({
      step_number: question.step_number,
      question_text: question.question_text,
      question_type: question.question_type,
      placeholder: question.placeholder || "",
      helper_text: question.helper_text || "",
      field_name: question.field_name,
      is_required: question.is_required,
      is_active: question.is_active,
    });
    setEditingQuestion(question);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta pregunta?")) {
      return;
    }

    setIsDeleting(true);
    const supabase = createClient();
    
    const { error } = await supabase
      .from("form_questions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting question:", error);
      alert("Error al eliminar la pregunta");
    } else {
      router.refresh();
    }
    
    setIsDeleting(false);
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    const supabase = createClient();
    
    const { error } = await supabase
      .from("form_questions")
      .update({ is_active: !isActive })
      .eq("id", id);

    if (error) {
      console.error("Error toggling question:", error);
      alert("Error al cambiar el estado de la pregunta");
    } else {
      router.refresh();
    }
  };

  // Group questions by step
  const questionsByStep = questions.reduce((acc, question) => {
    if (!acc[question.step_number]) {
      acc[question.step_number] = [];
    }
    acc[question.step_number].push(question);
    return acc;
  }, {} as Record<number, FormQuestion[]>);

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar pregunta
        </Button>
      </div>

      <div className="space-y-6">
        {STEPS.map((step) => {
          const stepQuestions = questionsByStep[step.value] || [];
          
          return (
            <Card key={step.value}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{step.label}</h3>
                  <Badge variant="secondary">{stepQuestions.length} preguntas</Badge>
                </div>

                {stepQuestions.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">
                    No hay preguntas en este paso
                  </p>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-12"></TableHead>
                          <TableHead className="font-semibold">Pregunta</TableHead>
                          <TableHead className="font-semibold">Tipo</TableHead>
                          <TableHead className="font-semibold">Campo</TableHead>
                          <TableHead className="font-semibold">Estado</TableHead>
                          <TableHead className="text-right font-semibold">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stepQuestions.map((question) => (
                          <TableRow key={question.id} className="hover:bg-muted/30">
                            <TableCell>
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="font-medium">{question.question_text}</p>
                                {question.helper_text && (
                                  <p className="text-sm text-muted-foreground">{question.helper_text}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {QUESTION_TYPES.find(t => t.value === question.question_type)?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {question.field_name}
                              </code>
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={question.is_active}
                                onCheckedChange={() => toggleActive(question.id, question.is_active)}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(question)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(question.id)}
                                  disabled={isDeleting}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingQuestion ? "Editar pregunta" : "Agregar pregunta"}</DialogTitle>
            <DialogDescription>
              {editingQuestion ? "Modifica los detalles de la pregunta" : "Crea una nueva pregunta para el formulario"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Step */}
            <div className="space-y-2">
              <Label>Paso</Label>
              <Select
                value={formData.step_number.toString()}
                onValueChange={(value) => setFormData({ ...formData, step_number: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STEPS.map((step) => (
                    <SelectItem key={step.value} value={step.value.toString()}>
                      {step.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <Label>Texto de la pregunta *</Label>
              <Textarea
                value={formData.question_text}
                onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                placeholder="¿Cuál es tu pregunta?"
                rows={3}
              />
            </div>

            {/* Question Type */}
            <div className="space-y-2">
              <Label>Tipo de pregunta</Label>
              <Select
                value={formData.question_type}
                onValueChange={(value) => setFormData({ ...formData, question_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Field Name */}
            <div className="space-y-2">
              <Label>Nombre del campo (base de datos) *</Label>
              <Input
                value={formData.field_name}
                onChange={(e) => setFormData({ ...formData, field_name: e.target.value })}
                placeholder="Ej: brand_goal, target_audience"
              />
              <p className="text-xs text-muted-foreground">
                Debe coincidir con una columna en la tabla branding_forms
              </p>
            </div>

            {/* Placeholder */}
            <div className="space-y-2">
              <Label>Placeholder (opcional)</Label>
              <Input
                value={formData.placeholder}
                onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                placeholder="Texto de ejemplo..."
              />
            </div>

            {/* Helper Text */}
            <div className="space-y-2">
              <Label>Texto de ayuda (opcional)</Label>
              <Textarea
                value={formData.helper_text}
                onChange={(e) => setFormData({ ...formData, helper_text: e.target.value })}
                placeholder="Opcional · Texto descriptivo para el usuario"
                rows={2}
              />
            </div>

            {/* Switches */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>¿Es obligatorio?</Label>
                <p className="text-xs text-muted-foreground">Requerido para enviar el formulario</p>
              </div>
              <Switch
                checked={formData.is_required}
                onCheckedChange={(checked) => setFormData({ ...formData, is_required: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>¿Está activo?</Label>
                <p className="text-xs text-muted-foreground">Mostrar en el formulario</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              resetForm();
            }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.question_text || !formData.field_name}
            >
              {editingQuestion ? "Guardar cambios" : "Agregar pregunta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
