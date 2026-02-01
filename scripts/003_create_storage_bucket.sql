-- Create Storage Bucket for Project Images
-- This script should be run in Supabase SQL Editor

-- Create the storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies to allow authenticated users to upload/update
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'projects');

CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'projects');

-- Allow public read access to project images
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'projects');

-- Note: If you get an error that the bucket already exists, that's fine!
-- You can also create the bucket manually in Supabase Dashboard:
-- 1. Go to Storage section
-- 2. Click "Create Bucket"
-- 3. Name: projects
-- 4. Make it public
-- 5. Create the bucket
