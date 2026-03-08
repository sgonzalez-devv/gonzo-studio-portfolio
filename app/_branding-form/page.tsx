import { BrandingFormWizard } from "@/components/branding-form/branding-form-wizard";

export const metadata = {
  title: "Formulario de Branding | Gonzo Studio",
  description: "Cuéntanos sobre tu proyecto y comencemos a construir tu marca",
};

export default function BrandingFormPage() {
  return <BrandingFormWizard />;
}
