-- Alternative method: Create Storage Policies using RLS-style syntax
-- Run this AFTER creating the bucket via Dashboard

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public SELECT (read/download files)
CREATE POLICY "Allow public read access on branding-files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'branding-files');

-- Policy: Allow public INSERT (upload files)
CREATE POLICY "Allow public upload to branding-files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'branding-files');

-- Policy: Allow authenticated UPDATE (admin only)
CREATE POLICY "Allow authenticated update on branding-files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'branding-files');

-- Policy: Allow authenticated DELETE (admin only)
CREATE POLICY "Allow authenticated delete on branding-files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'branding-files');

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%branding-files%';
