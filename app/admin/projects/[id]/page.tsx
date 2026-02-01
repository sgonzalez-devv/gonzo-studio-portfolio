import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ProjectForm } from "@/components/admin/project-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
          <p className="text-muted-foreground mt-1">
            Update project details
          </p>
        </div>

        <ProjectForm project={project} />
      </main>
    </div>
  );
}
