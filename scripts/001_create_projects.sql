-- Drop existing table if it exists to recreate with correct schema
DROP TABLE IF EXISTS public.projects CASCADE;

-- Create projects table for Gonzo Studio portfolio
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  image_url TEXT,
  project_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access for active projects
CREATE POLICY "projects_public_read" ON public.projects 
  FOR SELECT 
  USING (is_active = true);

-- Policy: Allow authenticated users to manage their own projects
CREATE POLICY "projects_insert_own" ON public.projects 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "projects_update_own" ON public.projects 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "projects_delete_own" ON public.projects 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Policy: Allow authenticated users to read all their projects (including inactive)
CREATE POLICY "projects_select_own" ON public.projects 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create indexes for ordering and filtering
CREATE INDEX idx_projects_display_order ON public.projects(display_order);
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_is_active ON public.projects(is_active);
CREATE INDEX idx_projects_is_featured ON public.projects(is_featured);
