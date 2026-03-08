"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Mail, User, Video, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TimeSlot {
  time: string;
  label: string;
}

export function AppointmentBooking() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string>("");
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    notes: "",
  });

  const { toast } = useToast();

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTime(undefined);
    
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    setIsLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/appointments?date=${selectedDate.toISOString()}`
      );
      const data = await response.json();
      
      if (response.ok) {
        setAvailableSlots(data.availableSlots);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los horarios disponibles",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime || !formData.clientEmail) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail: formData.clientEmail,
          clientName: formData.clientName || "Cliente",
          appointmentDate: selectedTime,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingSuccess(true);
        setMeetLink(data.appointment.meetLink);
        toast({
          title: "¡Cita agendada!",
          description: "Recibirás un email con los detalles de la reunión",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo agendar la cita",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">¡Cita Confirmada!</CardTitle>
          <CardDescription className="text-lg">
            Tu reunión ha sido agendada exitosamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-medium">
                  {date && format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Hora</p>
                <p className="font-medium">
                  {selectedTime && new Date(selectedTime).toLocaleTimeString('es-MX', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{formData.clientEmail}</p>
              </div>
            </div>

            {meetLink && (
              <div className="pt-4 border-t">
                <Button asChild className="w-full" size="lg">
                  <a href={meetLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Abrir Google Meet
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Recibirás un email con la invitación de calendario y recordatorios automáticos.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setBookingSuccess(false);
                setFormData({ clientName: "", clientEmail: "", notes: "" });
                setDate(undefined);
                setSelectedTime(undefined);
              }}
            >
              Agendar otra cita
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Agenda una Consulta</CardTitle>
        <CardDescription className="text-base">
          Selecciona una fecha y hora para discutir tu proyecto de diseño
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendario */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Selecciona una fecha</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
                locale={es}
              />
              <p className="text-sm text-muted-foreground">
                * Domingos y sábados no disponibles
              </p>
            </div>

            {/* Horarios disponibles */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Selecciona un horario</Label>
              {!date && (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  Primero selecciona una fecha
                </p>
              )}
              
              {date && isLoadingSlots && (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  Cargando horarios disponibles...
                </p>
              )}

              {date && !isLoadingSlots && availableSlots.length === 0 && (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No hay horarios disponibles para esta fecha
                </p>
              )}

              {date && !isLoadingSlots && availableSlots.length > 0 && (
                <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      type="button"
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Información del cliente */}
          {date && selectedTime && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Tus datos</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre (opcional)
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmail" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    required
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  Notas adicionales (opcional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Cuéntame brevemente sobre tu proyecto..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Agendando...</>
                ) : (
                  <>
                    <Video className="h-5 w-5 mr-2" />
                    Agendar Reunión
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
