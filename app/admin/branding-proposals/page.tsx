import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BrandingProposalsTable } from "@/components/admin/branding-proposals-table";

export default async function BrandingProposalsPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch branding proposals
  const { data: proposals, error } = await supabase
    .from("branding_forms")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Error fetching branding proposals:", error);
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Propuestas de Branding</h1>
          <p className="text-muted-foreground text-lg">
            Revisa las propuestas de branding enviadas por los clientes
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total de propuestas</p>
            <p className="text-3xl font-bold">{proposals?.length || 0}</p>
          </div>
        </div>
      </div>

      <BrandingProposalsTable proposals={proposals || []} />
    </div>
  );
}
