import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ProjectsTable } from "@/components/admin/projects-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio projects
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/projects/new" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </div>

        <ProjectsTable projects={projects ?? []} />
      </main>
    </div>
  );
}
