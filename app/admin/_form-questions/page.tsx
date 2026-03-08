import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { FormQuestionsManager } from "@/components/admin/form-questions-manager";

export default async function FormQuestionsPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch form questions
  const { data: questions, error } = await supabase
    .from("form_questions")
    .select("*")
    .order("step_number", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching form questions:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Gestión de Preguntas del Formulario</h1>
          <p className="text-muted-foreground mt-1">
            Personaliza las preguntas del formulario de branding
          </p>
        </div>

        <FormQuestionsManager questions={questions || []} />
      </main>
    </div>
  );
}
