import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AppointmentsTable } from "@/components/admin/appointments-table";

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: true });

  if (error) {
    console.error("Error fetching appointments:", error);
  }

  // Filtrar citas futuras y pasadas
  const now = new Date();
  const upcomingAppointments = appointments?.filter(
    (apt) => new Date(apt.appointment_date) >= now && apt.status === "scheduled"
  );
  const pastAppointments = appointments?.filter(
    (apt) => new Date(apt.appointment_date) < now || apt.status !== "scheduled"
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Citas Agendadas</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las citas con tus clientes
          </p>
        </div>

        <div className="space-y-8">
          {/* Próximas citas */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Próximas Citas ({upcomingAppointments?.length || 0})
            </h2>
            <AppointmentsTable appointments={upcomingAppointments || []} />
          </div>

          {/* Citas pasadas */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Historial ({pastAppointments?.length || 0})
            </h2>
            <AppointmentsTable appointments={pastAppointments || []} isPast />
          </div>
        </div>
      </main>
    </div>
  );
}
