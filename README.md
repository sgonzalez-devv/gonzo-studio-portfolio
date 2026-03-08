# Gonzo Studio Portfolio

A modern portfolio website built with Next.js, TypeScript, and Supabase. Features a public-facing portfolio with an admin dashboard for content management and automatic appointment scheduling via Google Calendar.

## ✨ Key Features

### Public Website
- 🌍 **Bilingual Support** - Full English/Spanish translations
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎨 **Modern UI** - Beautiful components with Tailwind CSS
- 🌙 **Dark Mode** - Automatic theme switching
- 📧 **Contact Form** - Direct contact via email
- 📅 **Appointment Booking** - Schedule meetings with Google Calendar integration

### Admin Dashboard
- 🔐 **Secure Authentication** - Supabase-powered auth with 24-hour sessions
- 📊 **Project Management** - CRUD operations for portfolio projects
- 🖼️ **Image Upload** - Direct uploads to Supabase Storage
- 📅 **Appointment Management** - View and manage scheduled meetings
- 🔔 **Automatic Notifications** - Email confirmations via Resend (optional)
- ⚙️ **Settings Panel** - Customize site configuration

### Integrations
- 📅 **Google Calendar** - Automatic event creation with Meet links
- 📧 **Resend API** - Transactional email delivery (optional)
- 💾 **Supabase Storage** - File and image hosting
- 🔒 **Row Level Security** - Database-level access control

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐│
│  │  Public    │  │   Admin    │  │    API Routes          ││
│  │  Pages     │  │  Dashboard │  │  /api/projects         ││
│  │  (SSR)     │  │  (Auth)    │  │  /api/appointments     ││
│  └────────────┘  └────────────┘  │  /api/contact          ││
│                                   └────────────────────────┘│
└────────────────────┬────────────────────────┬───────────────┘
                     │                        │
         ┌───────────▼──────────┐  ┌─────────▼──────────┐
         │     Supabase         │  │  Google Calendar   │
         │  - PostgreSQL DB     │  │  - Event Creation  │
         │  - Authentication    │  │  - Meet Links      │
         │  - Storage Buckets   │  │  - OAuth 2.0       │
         └──────────────────────┘  └────────────────────┘
                     │
         ┌───────────▼──────────┐
         │      Resend          │
         │  - Email Delivery    │
         │  - Templates (JSX)   │
         └──────────────────────┘
```

## 🚀 Tech Stack

### Core Framework
- **Framework:** Next.js 16 (App Router) - React framework with server-side rendering
- **Language:** TypeScript - Type-safe JavaScript
- **Runtime:** Node.js 18+ - JavaScript runtime

### Frontend
- **Styling:** Tailwind CSS v4 - Utility-first CSS framework
- **UI Components:** Radix UI + shadcn/ui - Accessible component library
- **Icons:** Lucide React - Beautiful & consistent icon pack
- **Forms:** React Hook Form + Zod - Form validation and handling
- **Internationalization:** Custom i18n implementation (English/Spanish)

### Backend & Database
- **Database:** Supabase (PostgreSQL) - Open source Firebase alternative
  - Row Level Security (RLS) policies
  - Real-time subscriptions
  - Storage for file uploads
- **Authentication:** Supabase Auth - JWT-based authentication with 24-hour sessions
- **API:** Next.js API Routes - Server-side endpoints

### Third-Party Services
- **Email Service:** Resend - Transactional email API (optional)
  - React Email - Email template components
- **Calendar Integration:** Google Calendar API - Appointment scheduling
  - OAuth 2.0 authentication
  - Automatic Google Meet link generation
- **Deployment:** Vercel - Serverless deployment platform

### Development Tools
- **Package Manager:** pnpm - Fast, disk space efficient
- **Version Control:** Git + GitHub - Source code management
- **Code Quality:** ESLint - Linting and code standards
- **Type Checking:** TypeScript Compiler - Compile-time type safety

## 📋 Prerequisites

Before you begin, ensure you have the following:

### Required Accounts & Services

1. **Supabase Account** ([Sign up](https://supabase.com/))
   - Free tier available
   - Used for database, authentication, and file storage

2. **Google Cloud Console Account** ([Sign up](https://console.cloud.google.com/))
   - Required for Google Calendar API
   - Required for Google Meet integration
   - Free tier available with quota limits

3. **Resend Account** ([Sign up](https://resend.com/)) - *Optional*
   - For transactional emails
   - Free tier: 100 emails/day
   - Can be skipped if only using Google Calendar emails

### Required Software

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** 8.x or higher ([Install](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/downloads))

### Optional for Deployment

- **Vercel Account** ([Sign up](https://vercel.com/)) - Recommended for deployment
- **GitHub Account** - For source code management and Vercel integration

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

# Google Calendar API Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_CALENDAR_ID=your_calendar_email@gmail.com

# Resend API (Optional - for email notifications)
RESEND_API_KEY=your_resend_api_key

# Business Configuration
BUSINESS_EMAIL=your_business_email@domain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### How to get Supabase credentials:
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key
5. Copy the service_role key (keep this secret!)

#### How to get Google Calendar API credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:3000`
   - Copy Client ID and Client Secret
5. Get Refresh Token:
   - See [SETUP.md](./SETUP.md) for detailed instructions on obtaining refresh token

#### How to get Resend API key (Optional):
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name and copy the key
4. **Note:** If you skip this, set `RESEND_API_KEY=PENDING_CREATE_RESEND_ACCOUNT` to disable email features

### 4. Database Setup

#### Create Required Tables

Run the following SQL scripts in order in your Supabase SQL Editor:

1. **Projects Table** (`scripts/001_create_projects.sql`)
2. **Admin User** (`scripts/002_create_admin_user.sql`)
3. **Storage Bucket** (`scripts/003_create_storage_bucket.sql`)
4. **Form Questions** (`scripts/005_create_form_questions.sql`)
5. **Appointments Table** (`scripts/008_create_appointments.sql`)

#### Option A: Using Supabase Dashboard (Recommended)

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. For each script file:
   - Copy and paste the contents
   - Click "Run" to execute

#### Option B: Using Node.js Script

```bash
# Create the admin user programmatically
node scripts/create-admin-user.js
```

**Note:** The other tables must be created manually via the SQL Editor.

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

### Appointments Table

```sql
appointments (
  id                UUID PRIMARY KEY,
  client_name       TEXT NOT NULL,
  client_email      TEXT NOT NULL,
  client_phone      TEXT,
  appointment_date  TIMESTAMP NOT NULL,
  duration_minutes  INTEGER DEFAULT 60,
  status            TEXT DEFAULT 'scheduled',
  notes             TEXT,
  google_event_id   TEXT,
  meet_link         TEXT,
  created_at        TIMESTAMP,
  updated_at        TIMESTAMP
)
```

### Form Questions Table

```sql
form_questions (
  id              UUID PRIMARY KEY,
  question_es     TEXT NOT NULL,
  question_en     TEXT NOT NULL,
  field_type      TEXT NOT NULL,
  options         JSONB,
  is_required     BOOLEAN,
  display_order   INTEGER,
  created_at      TIMESTAMP,
  updated_at      TIMESTAMP
)
```

## 🌐 Environment Variables Reference

| Variable | Description | Required | Service |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes | Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes | Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for admin operations) | Optional* | Supabase |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | Yes | Google Cloud |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 Client Secret | Yes | Google Cloud |
| `GOOGLE_REFRESH_TOKEN` | Google OAuth 2.0 Refresh Token | Yes | Google Cloud |
| `GOOGLE_CALENDAR_ID` | Email address of the calendar to use | Yes | Google Calendar |
| `RESEND_API_KEY` | Resend API key for emails | Optional** | Resend |
| `BUSINESS_EMAIL` | Your business email for notifications | Yes | - |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for production) | Yes | - |

\* Required only for running the `create-admin-user.js` script  
\*\* Set to `PENDING_CREATE_RESEND_ACCOUNT` to disable email features

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Prepare Your Repository:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Vercel Project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables:**
   Add all the following variables in Vercel:
   
   **Supabase:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   
   **Google Calendar API:**
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_CALENDAR_ID`
   
   **Optional Services:**
   - `RESEND_API_KEY` (or set to `PENDING_CREATE_RESEND_ACCOUNT`)
   
   **Site Configuration:**
   - `BUSINESS_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL, e.g., `https://your-project.vercel.app`)

4. **Update Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Credentials"
   - Edit your OAuth 2.0 Client ID
   - Add your Vercel URL to "Authorized redirect URIs"

5. **Deploy:**
   - Click "Deploy" in Vercel
   - Wait for build to complete
   - Visit your deployed site!

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:
- **Netlify** - Add build command: `pnpm build`
- **AWS Amplify** - Configure with Next.js preset
- **Railway** - Connect GitHub and add environment variables
- **Render** - Use Docker or Node.js environment
- **Self-hosted** - Use PM2 or Docker

**Important for all platforms:**
1. Set all required environment variables
2. Use Node.js 18+ runtime
3. Run `pnpm build` before starting
4. Update Google OAuth redirect URIs with your domain
5. Update `NEXT_PUBLIC_SITE_URL` to your production URL

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

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs) - React framework guide
- [Supabase Documentation](https://supabase.com/docs) - Database and auth guide
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - CSS framework
- [shadcn/ui Documentation](https://ui.shadcn.com/) - UI components
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide

### Third-Party Services
- [Google Calendar API Docs](https://developers.google.com/calendar) - Calendar integration
- [Resend Documentation](https://resend.com/docs) - Email API
- [Vercel Documentation](https://vercel.com/docs) - Deployment platform

### Tools & Libraries
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

### Project Documentation
- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guides
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide

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
