-- Create Storage Bucket for branding files
-- This needs to be run in the Supabase SQL Editor

-- STEP 1: Create the bucket via Supabase Dashboard
-- Go to Storage > Create new bucket
-- Name: branding-files
-- Public: true
-- File size limit: 10MB
-- Allowed MIME types: image/*

-- STEP 2: Run these SQL policies for the bucket

-- Policy 1: Allow public to read/view files
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Public Access',
  'branding-files',
  'true'
);

-- Policy 2: Allow anyone to upload files (for form submissions)
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Public Upload',
  'branding-files',
  'true',
  'INSERT'
);

-- Policy 3: Allow authenticated users (admin) to delete files
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Authenticated Delete',
  'branding-files',
  '(auth.role() = ''authenticated'')',
  'DELETE'
);

-- Policy 4: Allow authenticated users (admin) to update files
INSERT INTO storage.policies (name, bucket_id, definition, operation)
VALUES (
  'Authenticated Update',
  'branding-files',
  '(auth.role() = ''authenticated'')',
  'UPDATE'
);

-- Verify policies were created
SELECT * FROM storage.policies WHERE bucket_id = 'branding-files';

/*
IMPORTANT SECURITY NOTES:
1. File size limits are set at bucket level (10MB recommended)
2. MIME type validation should be done on client side
3. Consider adding virus scanning in production
4. Monitor storage usage regularly
5. Implement cleanup for old/unused files
6. Consider adding rate limiting for uploads

ALTERNATIVE: If you prefer to set policies via Dashboard:
1. Go to Storage > branding-files > Policies
2. Create these policies:

SELECT (Read):
- Policy name: Public Access
- Target roles: public
- Policy definition: true

INSERT (Upload):
- Policy name: Public Upload  
- Target roles: public
- Policy definition: true

DELETE:
- Policy name: Authenticated Delete
- Target roles: authenticated
- Policy definition: (auth.role() = 'authenticated')

UPDATE:
- Policy name: Authenticated Update
- Target roles: authenticated
- Policy definition: (auth.role() = 'authenticated')
*/
