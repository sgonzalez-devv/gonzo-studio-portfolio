import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Eye, TrendingUp } from "lucide-react";

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

  const { count: featuredProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true);

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects ?? 0,
      icon: FolderKanban,
      description: "All projects in database",
    },
    {
      title: "Active Projects",
      value: activeProjects ?? 0,
      icon: Eye,
      description: "Visible on website",
    },
    {
      title: "Featured Projects",
      value: featuredProjects ?? 0,
      icon: TrendingUp,
      description: "Highlighted on homepage",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here is an overview of your portfolio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
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
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
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
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
