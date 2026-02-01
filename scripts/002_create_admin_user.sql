-- Create Admin User Migration
-- This script should be run in Supabase SQL Editor

-- NOTE: Supabase auth.users table is managed by Supabase Auth
-- You cannot directly insert into auth.users via SQL
-- Instead, use one of these methods:

-- METHOD 1: Via Supabase Dashboard (RECOMMENDED)
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add User" button
-- 4. Enter the following credentials:
--    Email: work.gonzostudio@outlook.com
--    Password: mw#d^Ovcls%FQikyf6
-- 5. Optionally check "Auto Confirm User" to skip email verification

-- METHOD 2: Via Supabase Auth API (Alternative)
-- Use the Supabase client in your application or a script
-- See the accompanying Node.js script: create-admin-user.js

-- METHOD 3: Via Supabase CLI (Alternative)
-- If you have Supabase CLI installed locally:
-- supabase db reset (to reset your local database)
-- Then manually sign up through your app's auth flow

-- After creating the user, you can optionally update user metadata:
-- UPDATE auth.users 
-- SET raw_user_meta_data = jsonb_set(
--   COALESCE(raw_user_meta_data, '{}'::jsonb),
--   '{role}',
--   '"admin"'
-- )
-- WHERE email = 'work.gonzostudio@outlook.com';

-- Grant any additional permissions if needed
-- (This depends on your RLS policies and application logic)
