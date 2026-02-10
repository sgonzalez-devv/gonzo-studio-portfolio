-- Add new columns to branding_forms table for enhanced inputs

ALTER TABLE public.branding_forms ADD COLUMN IF NOT EXISTS color_palette JSONB;
ALTER TABLE public.branding_forms ADD COLUMN IF NOT EXISTS logo_file_url TEXT;
ALTER TABLE public.branding_forms ADD COLUMN IF NOT EXISTS inspiration_images JSONB;

-- Comments
COMMENT ON COLUMN public.branding_forms.color_palette IS 'Array of color objects: [{ name: "Primary", hex: "#FF0000" }]';
COMMENT ON COLUMN public.branding_forms.logo_file_url IS 'URL to uploaded logo file in Supabase Storage';
COMMENT ON COLUMN public.branding_forms.inspiration_images IS 'Array of uploaded inspiration image URLs';
