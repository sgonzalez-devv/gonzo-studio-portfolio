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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarDays, Clock, Mail, Video, Trash2, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  client_email: string;
  client_name: string | null;
  appointment_date: string;
  duration_minutes: number;
  google_calendar_event_id: string | null;
  google_meet_link: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  isPast?: boolean;
}

export function AppointmentsTable({ appointments, isPast = false }: AppointmentsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string, eventId: string | null) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      toast({
        title: "Cita cancelada",
        description: "La cita ha sido cancelada y se notificó al cliente",
      });

      // Recargar la página para actualizar la lista
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cancelar la cita",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/30 rounded-lg border border-dashed">
        <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {isPast ? "No hay citas en el historial" : "No hay citas programadas"}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Notas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => {
            const appointmentDate = new Date(appointment.appointment_date);
            const statusColors: Record<string, string> = {
              scheduled: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
              completed: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
              cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
              rescheduled: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
            };

            return (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {appointment.client_name || "Cliente"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {appointment.client_email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {format(appointmentDate, "d 'de' MMMM, yyyy", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(appointmentDate, "h:mm a")}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {appointment.duration_minutes} min
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[appointment.status] || ""}>
                    {appointment.status === "scheduled" && "Programada"}
                    {appointment.status === "completed" && "Completada"}
                    {appointment.status === "cancelled" && "Cancelada"}
                    {appointment.status === "rescheduled" && "Reprogramada"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-muted-foreground truncate">
                    {appointment.notes || "-"}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {appointment.google_meet_link && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={appointment.google_meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Video className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {!isPast && appointment.status === "scheduled" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deletingId === appointment.id}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Cancelar cita?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción cancelará la cita en Google Calendar y notificará
                              al cliente. Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No, mantener</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(
                                  appointment.id,
                                  appointment.google_calendar_event_id
                                )
                              }
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Sí, cancelar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
