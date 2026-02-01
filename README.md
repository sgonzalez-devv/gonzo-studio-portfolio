# Gonzo Studio Portfolio

A modern portfolio website built with Next.js, TypeScript, and Supabase. Features a public-facing portfolio with an admin dashboard for content management.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Database & Auth:** Supabase
- **Package Manager:** pnpm
- **Deployment:** Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** 8.x or higher ([Install](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/downloads))
- **Supabase Account** ([Sign up](https://supabase.com/))

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Gonzo Studio Portfolio"
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**How to get these values:**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key
5. Copy the service_role key (keep this secret!)

### 4. Database Setup

#### Option A: Using Supabase Dashboard (Recommended)

1. **Create Projects Table:**
   - Open your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of `scripts/001_create_projects.sql`
   - Click "Run" to execute

2. **Create Admin User:**
   - Navigate to Authentication > Users
   - Click "Add User"
   - Enter the credentials:
     - Email: `work.gonzostudio@outlook.com`
     - Password: `mw#d^Ovcls%FQikyf6`
   - Check "Auto Confirm User"
   - Click "Create User"

#### Option B: Using Node.js Script

```bash
# Create the admin user programmatically
node scripts/create-admin-user.js
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Admin Login Credentials

**Email:** work.gonzostudio@outlook.com  
**Password:** mw#d^Ovcls%FQikyf6

**Login URL:** [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

## 🎯 Available Commands

### Development

```bash
# Start development server (with hot reload)
pnpm dev

# Start development server on a specific port
pnpm dev -- -p 3001
```

### Building

```bash
# Create production build
pnpm build

# Start production server (must build first)
pnpm start
```

### Code Quality

```bash
# Run ESLint to check code quality
pnpm lint

# Run ESLint and auto-fix issues
pnpm lint --fix
```

### Database Scripts

```bash
# Create admin user (requires .env.local with service role key)
node scripts/create-admin-user.js
```

### Package Management

```bash
# Install a new package
pnpm add <package-name>

# Install a dev dependency
pnpm add -D <package-name>

# Update all dependencies
pnpm update

# Remove a package
pnpm remove <package-name>

# List installed packages
pnpm list

# Check for outdated packages
pnpm outdated
```

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin dashboard pages
│   │   ├── projects/        # Project management
│   │   └── settings/        # Admin settings
│   ├── api/                 # API routes
│   │   ├── contact/         # Contact form endpoint
│   │   └── projects/        # Projects CRUD endpoints
│   ├── auth/                # Authentication pages
│   │   ├── login/           # Login page
│   │   └── error/           # Auth error page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── admin/               # Admin-specific components
│   ├── sections/            # Page sections (Hero, About, etc.)
│   ├── ui/                  # UI component library (shadcn)
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── theme-provider.tsx
├── lib/                     # Utility functions
│   ├── supabase/            # Supabase client configurations
│   ├── translations.ts      # i18n translations
│   └── utils.ts             # Helper functions
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
│   └── images/              # Images and logos
├── scripts/                 # Database migrations & scripts
│   ├── 001_create_projects.sql
│   ├── 002_create_admin_user.sql
│   └── create-admin-user.js
├── styles/                  # Additional stylesheets
├── middleware.ts            # Next.js middleware (auth)
└── package.json             # Project dependencies
```

## 🔐 Authentication Flow

1. User navigates to `/auth/login`
2. Enters email and password
3. Supabase authenticates the user
4. On success, redirects to `/admin`
5. Middleware protects `/admin` routes
6. Session is maintained via cookies (handled by Supabase SSR)

## 🗄️ Database Schema

### Projects Table

```sql
projects (
  id              UUID PRIMARY KEY,
  title_es        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  description_es  TEXT,
  description_en  TEXT,
  image_url       TEXT,
  project_url     TEXT,
  technologies    TEXT[],
  display_order   INTEGER,
  is_active       BOOLEAN,
  is_featured     BOOLEAN,
  created_at      TIMESTAMP,
  updated_at      TIMESTAMP,
  user_id         UUID REFERENCES auth.users
)
```

## 🌐 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for admin operations) | Optional* |

*Required only for running the `create-admin-user.js` script

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

Ensure you:
1. Set environment variables
2. Run `pnpm build` before deployment
3. Use Node.js 18+ runtime

## 🔧 Troubleshooting

### Common Issues

**Problem:** "Cannot find module" errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Problem:** Supabase connection errors
```bash
# Solution: Verify environment variables
cat .env.local
# Ensure NEXT_PUBLIC_SUPABASE_URL and keys are correct
```

**Problem:** Build fails
```bash
# Solution: Check TypeScript errors
pnpm build
# Fix any type errors shown
```

**Problem:** Can't login with admin credentials
- Verify the user exists in Supabase Dashboard > Authentication > Users
- Check that email is confirmed
- Ensure password is correct: `mw#d^Ovcls%FQikyf6`
- Clear browser cookies and try again

**Problem:** Port 3000 already in use
```bash
# Solution: Use a different port
pnpm dev -- -p 3001
```

## 🔄 Updating Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update all dependencies to latest (within semver range)
pnpm update

# Update a specific package
pnpm update <package-name>

# Update to latest versions (breaking changes possible)
pnpm update --latest
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Supabase logs in the dashboard
3. Check browser console for errors
4. Review Next.js server logs in terminal

## 📄 License

Private project - All rights reserved.

---

**Last Updated:** February 2026  
**Maintained by:** Gonzo Studio
