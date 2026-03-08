import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, CalendarDays, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  // Fetch stats
  const { count: totalProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: activeProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  // Fetch appointments stats
  const now = new Date().toISOString();
  const { count: upcomingAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .gte("appointment_date", now)
    .eq("status", "scheduled");

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects ?? 0,
      icon: FolderKanban,
      description: "All portfolio projects",
      href: "/admin/projects",
    },
    {
      title: "Active Projects",
      value: activeProjects ?? 0,
      icon: FolderKanban,
      description: "Visible on website",
      href: "/admin/projects",
    },
    {
      title: "Upcoming Appointments",
      value: upcomingAppointments ?? 0,
      icon: CalendarDays,
      description: "Scheduled meetings",
      href: "/admin/appointments",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here is an overview of your studio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add New Project</p>
                <p className="text-sm text-muted-foreground">Create a new portfolio project</p>
              </div>
            </Link>
            
            <Link
              href="/admin/appointments"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">View Appointments</p>
                <p className="text-sm text-muted-foreground">Manage scheduled meetings</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
