/**
 * Create Admin User Script
 * 
 * This script creates an admin user using Supabase Admin API
 * Run this script with Node.js after setting up your environment variables
 * 
 * Usage: node scripts/create-admin-user.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  // Create Supabase client with service role key (admin privileges)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing environment variables');
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // Create admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'work.gonzostudio@outlook.com',
      password: 'mw#d^Ovcls%FQikyf6',
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        full_name: 'Gonzo Studio Admin'
      }
    });

    if (error) {
      console.error('❌ Error creating admin user:', error.message);
      process.exit(1);
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', data.user.email);
    console.log('🆔 User ID:', data.user.id);
    console.log('\n📝 Login credentials:');
    console.log('   Email: work.gonzostudio@outlook.com');
    console.log('   Password: mw#d^Ovcls%FQikyf6');
    console.log('\n🔗 You can now login at: /auth/login');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

// Run the script
createAdminUser();
