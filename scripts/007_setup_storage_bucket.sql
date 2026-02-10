-- Create Storage Bucket for branding files
-- This needs to be run in the Supabase SQL Editor

-- Note: Storage buckets are created via the Supabase Dashboard or SDK, not SQL
-- But we can set up the policies

-- Instructions to create bucket via Dashboard:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New Bucket"
-- 3. Name: branding-files
-- 4. Public: true (so files are publicly accessible)
-- 5. File size limit: 10MB
-- 6. Allowed MIME types: image/*

-- Storage policies for branding-files bucket
-- These policies need to be set in the Storage > Policies section

-- Policy: Allow public read
-- Bucket: branding-files
-- Operation: SELECT
-- Policy definition: true

-- Policy: Allow authenticated insert (admin only)
-- Bucket: branding-files
-- Operation: INSERT  
-- Policy definition: (auth.role() = 'authenticated')

-- Policy: Allow authenticated delete (admin only)
-- Bucket: branding-files
-- Operation: DELETE
-- Policy definition: (auth.role() = 'authenticated')

-- Policy: Allow public insert (for form submissions)
-- Bucket: branding-files
-- Operation: INSERT
-- Policy definition: true

/*
IMPORTANT: Since anyone can upload via the form, you should:
1. Set file size limits (10MB max)
2. Validate file types on the client
3. Consider adding virus scanning
4. Monitor storage usage
5. Implement cleanup for old/unused files
*/
