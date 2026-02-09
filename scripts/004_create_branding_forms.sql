-- Create Branding Forms table
-- This table stores all branding questionnaire submissions

DROP TABLE IF EXISTS public.branding_forms CASCADE;

CREATE TABLE public.branding_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Step 1: Starting Point
  current_stage TEXT,
  brand_goal TEXT,
  problem_solving TEXT,
  current_frustrations TEXT,
  
  -- Step 2: Personality
  brand_descriptors TEXT[],
  tone_formal_casual INTEGER,
  tone_serious_fun INTEGER,
  tone_premium_accessible INTEGER,
  like_brands TEXT,
  dislike_brands TEXT,
  
  -- Step 3: Name & Basics
  brand_name TEXT,
  slogan TEXT,
  domains TEXT,
  name_type TEXT,
  
  -- Step 4: Audience & Market
  target_audience TEXT,
  market TEXT,
  business_type TEXT[],
  
  -- Step 5: Brand Contexts
  contexts TEXT[],
  context_details JSONB,
  
  -- Step 6: Branding Depth
  branding_level TEXT,
  deadline TEXT,
  budget_range TEXT,
  
  -- Step 7: Final Details
  restrictions TEXT,
  references TEXT,
  additional_notes TEXT,
  user_email TEXT,
  
  -- Meta
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.branding_forms ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insert (anyone can submit form)
CREATE POLICY "branding_forms_public_insert" ON public.branding_forms 
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Only authenticated users (admin) can read
CREATE POLICY "branding_forms_admin_read" ON public.branding_forms 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can update
CREATE POLICY "branding_forms_admin_update" ON public.branding_forms 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can delete
CREATE POLICY "branding_forms_admin_delete" ON public.branding_forms 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create indexes for common queries
CREATE INDEX idx_branding_forms_submitted_at ON public.branding_forms(submitted_at DESC);
CREATE INDEX idx_branding_forms_user_email ON public.branding_forms(user_email);
CREATE INDEX idx_branding_forms_current_stage ON public.branding_forms(current_stage);

-- Add comment
COMMENT ON TABLE public.branding_forms IS 'Stores branding questionnaire submissions from potential clients';
