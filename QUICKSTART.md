# Quick Start Guide - Gonzo Studio Portfolio

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Get these from your Supabase Dashboard:
1. Go to https://app.supabase.com/
2. Select your project
3. Settings > API
4. Copy the values

### Step 3: Set Up Database

#### Create the Projects Table:
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Run the script: `scripts/001_create_projects.sql`

#### Create Admin User (Choose ONE method):

**Method A: Supabase Dashboard (Easiest)**
1. Go to Authentication > Users
2. Click "Add User"
3. Email: `work.gonzostudio@outlook.com`
4. Password: `mw#d^Ovcls%FQikyf6`
5. Check "Auto Confirm User"
6. Click "Create User"

**Method B: Node.js Script**
```bash
node scripts/create-admin-user.js
```

### Step 4: Run the Project
```bash
pnpm dev
```

### Step 5: Login
1. Open http://localhost:3000/auth/login
2. Email: `work.gonzostudio@outlook.com`
3. Password: `mw#d^Ovcls%FQikyf6`

## ✅ You're Ready!

Your portfolio is now running locally. Visit the admin dashboard at `/admin` to manage your projects.

## 📋 Quick Command Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server |
| `pnpm lint` | Check code quality |

## 🆘 Need Help?

Check the full README.md for detailed documentation.
