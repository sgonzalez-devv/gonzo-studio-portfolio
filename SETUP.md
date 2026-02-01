# 🔐 Admin Credentials & Setup Summary

## Admin Login Credentials

**Email:** `work.gonzostudio@outlook.com`  
**Password:** `mw#d^Ovcls%FQikyf6`

**Login URL:** `/auth/login` (http://localhost:3000/auth/login in development)

---

## 📦 What Has Been Created

### 1. Migration Scripts
- **`scripts/002_create_admin_user.sql`** - SQL instructions for creating admin user
- **`scripts/create-admin-user.js`** - Node.js script to create admin user via Supabase Admin API

### 2. Documentation Files
- **`README.md`** - Complete project documentation with all commands
- **`QUICKSTART.md`** - 5-minute quick start guide
- **`DEPLOYMENT.md`** - Production deployment guide
- **`SETUP.md`** - This file (credentials reference)
- **`.env.example`** - Environment variables template

---

## 🚀 How to Set Up the Admin User

You have **3 options** to create the admin user:

### Option 1: Supabase Dashboard (Easiest - Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Authentication > Users**
4. Click **"Add User"** button
5. Fill in the form:
   - Email: `work.gonzostudio@outlook.com`
   - Password: `mw#d^Ovcls%FQikyf6`
   - ✅ Check "Auto Confirm User"
6. Click **"Create User"**
7. Done! You can now log in.

### Option 2: Node.js Script

```bash
# Make sure .env.local is configured with SUPABASE_SERVICE_ROLE_KEY
node scripts/create-admin-user.js
```

### Option 3: Manual SQL (Advanced)

Run the instructions in `scripts/002_create_admin_user.sql` in the Supabase SQL Editor.

---

## ✅ Setup Checklist

Before logging in, ensure you've completed these steps:

- [ ] Install dependencies: `pnpm install`
- [ ] Create `.env.local` file with Supabase credentials
- [ ] Run database migration: `scripts/001_create_projects.sql`
- [ ] Create admin user (using one of the 3 options above)
- [ ] Start dev server: `pnpm dev`
- [ ] Navigate to: http://localhost:3000/auth/login
- [ ] Log in with the credentials above

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Check code quality
pnpm lint

# Create admin user (if using script method)
node scripts/create-admin-user.js
```

---

## 📁 Important Files Location

```
├── .env.example          # Template for environment variables
├── .env.local            # YOUR environment variables (create this)
├── README.md             # Main documentation
├── QUICKSTART.md         # Quick start guide
├── DEPLOYMENT.md         # Deployment guide
├── SETUP.md              # This file (credentials)
└── scripts/
    ├── 001_create_projects.sql       # Database schema
    ├── 002_create_admin_user.sql     # Admin user instructions
    └── create-admin-user.js          # Admin user creation script
```

---

## 🔑 Environment Variables Template

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Get these values from: Supabase Dashboard > Settings > API

---

## 🛡️ Security Notes

- ⚠️ **NEVER commit `.env.local` to Git** (already in .gitignore)
- ⚠️ **Keep the service role key secret** (server-side only)
- ✅ The password contains special characters - copy it exactly
- ✅ Admin routes are protected by Next.js middleware
- ✅ Supabase Row Level Security (RLS) is enabled

---

## 🐛 Troubleshooting Login Issues

### Can't log in?
1. Verify the user exists in Supabase Dashboard > Authentication > Users
2. Ensure email is confirmed (should have a green checkmark)
3. Copy-paste the password to avoid typos: `mw#d^Ovcls%FQikyf6`
4. Clear browser cookies and cache
5. Check browser console for errors
6. Verify `.env.local` has correct Supabase credentials

### "Invalid login credentials" error?
- The user may not exist yet - create it using one of the 3 options above
- Password might be incorrect - ensure you copy it exactly
- Email might be wrong - it should be: `work.gonzostudio@outlook.com`

### Can't access /admin after login?
- Check that middleware.ts is configured correctly
- Verify Supabase session is being created
- Check browser cookies are enabled
- Review Next.js terminal logs for errors

---

## 📞 Need Help?

Refer to the main documentation files:
- **Quick Start:** See `QUICKSTART.md`
- **Full Documentation:** See `README.md`
- **Deployment:** See `DEPLOYMENT.md`

---

## 📝 Notes

- These credentials are for the admin dashboard only
- Regular users don't need accounts (public portfolio)
- You can add more admin users later via Supabase Dashboard
- Consider enabling 2FA in Supabase for production

---

**Last Updated:** February 2026  
**For:** Gonzo Studio Portfolio Project
