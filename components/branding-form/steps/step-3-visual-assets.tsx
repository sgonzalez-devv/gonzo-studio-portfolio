"use client";

import { BrandingFormData } from "@/lib/branding-form-types";
import { Label } from "@/components/ui/label";
import { ColorPalettePicker } from "../color-palette-picker";
import { FileUpload } from "../file-upload";
import { MultiFileUpload } from "../multi-file-upload";

interface StepProps {
  data: BrandingFormData;
  updateData: (data: Partial<BrandingFormData>) => void;
}

export function Step3VisualAssets({ data, updateData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Color Palette */}
      <div className="space-y-3">
        <ColorPalettePicker
          value={data.colorPalette}
          onChange={(colors) => updateData({ colorPalette: colors })}
          maxColors={8}
        />
        <p className="text-xs text-muted-foreground">
          💡 Tip: Si ya tienes colores definidos, agrégalos aquí. Si no, podemos ayudarte a definirlos.
        </p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <FileUpload
          label="¿Tienes un logo actual?"
          value={data.logoFileUrl}
          onChange={(url) => updateData({ logoFileUrl: url || undefined })}
          accept="image/*"
          maxSize={10}
          bucket="branding-files"
          folder="logos"
        />
        <p className="text-xs text-muted-foreground">
          Opcional · Si tienes un logo actual que quieras rehacer o usar como referencia
        </p>
      </div>

      {/* Inspiration Images */}
      <div className="space-y-3">
        <MultiFileUpload
          label="Imágenes de inspiración o referencias visuales"
          value={data.inspirationImages}
          onChange={(urls) => updateData({ inspirationImages: urls })}
          accept="image/*"
          maxSize={5}
          maxFiles={10}
          bucket="branding-files"
          folder="inspiration"
        />
        <p className="text-xs text-muted-foreground">
          Opcional · Screenshots, fotos, diseños que te gusten. Cualquier cosa visual que te inspire.
        </p>
      </div>
    </div>
  );
}
