# Deployment Guide - Gonzo Studio Portfolio

This guide covers deploying your Gonzo Studio Portfolio to production.

## 🎯 Pre-Deployment Checklist

- [ ] Environment variables are set
- [ ] Database migrations are run in Supabase
- [ ] Admin user is created
- [ ] Project builds successfully (`pnpm build`)
- [ ] All tests pass (`pnpm lint`)
- [ ] Images are optimized
- [ ] Security: Service role key is NOT committed to Git

## 🚀 Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### Initial Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Select "Gonzo Studio Portfolio"

3. **Configure Environment Variables**
   Add these in Vercel dashboard (Settings > Environment Variables):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

### Automatic Deployments

Vercel automatically deploys when you push to:
- **main branch** → Production
- **other branches** → Preview deployments

### Custom Domain

1. Go to Settings > Domains in Vercel
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

## 🌊 Deploy to Netlify

### Via Git Integration

1. **Push to GitHub** (see Vercel step 1)

2. **Connect to Netlify**
   - Go to https://app.netlify.com/
   - Click "New site from Git"
   - Connect your GitHub repository

3. **Configure Build Settings**
   ```
   Build command: pnpm build
   Publish directory: .next
   ```

4. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add your Supabase credentials

5. **Deploy**

### Via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 🐳 Deploy with Docker

### Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t gonzo-portfolio .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  gonzo-portfolio
```

## ☁️ Deploy to Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Add Environment Variables**
   ```bash
   railway variables set NEXT_PUBLIC_SUPABASE_URL=your_url
   railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## 🔧 Post-Deployment Steps

### 1. Verify Deployment

- [ ] Site loads correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Admin login works

### 2. Test Admin Access

1. Go to `https://yourdomain.com/auth/login`
2. Login with:
   - Email: `work.gonzostudio@outlook.com`
   - Password: `mw#d^Ovcls%FQikyf6`
3. Verify you can access `/admin`
4. Test creating/editing a project

### 3. Configure Supabase for Production

1. **Add Site URL**
   - Supabase Dashboard > Authentication > URL Configuration
   - Add your production URL to "Site URL"
   - Add to "Redirect URLs" list

2. **Update CORS Settings** (if needed)
   - Supabase Dashboard > Settings > API
   - Add your domain to allowed origins

### 4. Set Up Monitoring

- Enable Vercel Analytics (Settings > Analytics)
- Monitor Supabase usage (Dashboard > Reports)
- Set up error tracking (Sentry, LogRocket, etc.)

### 5. Performance Optimization

```bash
# Analyze bundle size
pnpm build
# Check output for bundle sizes

# Consider:
# - Image optimization (already using Next.js Image)
# - Code splitting (automatic with Next.js)
# - Lazy loading components
```

## 🔐 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Service role key is NOT in client-side code
- [ ] HTTPS is enabled (automatic with Vercel/Netlify)
- [ ] Rate limiting is configured (Supabase)
- [ ] Row Level Security policies are active
- [ ] Admin routes are protected by middleware

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Lint
        run: pnpm lint
      
      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 📊 Monitoring & Maintenance

### Regular Tasks

- **Weekly**: Check Supabase usage and logs
- **Monthly**: Update dependencies (`pnpm update`)
- **Quarterly**: Security audit and performance review

### Useful Commands

```bash
# Check build output
pnpm build

# Check for outdated packages
pnpm outdated

# Update dependencies
pnpm update

# Check bundle size
pnpm build && du -sh .next
```

## 🆘 Troubleshooting Production Issues

### Site is Slow
- Check Vercel Analytics for performance insights
- Optimize images (use WebP format)
- Enable caching headers

### Authentication Not Working
- Verify Supabase Site URL configuration
- Check redirect URLs in Supabase
- Clear browser cookies and retry

### Database Connection Issues
- Verify environment variables are set correctly
- Check Supabase connection pooling limits
- Review RLS policies for conflicts

### Build Failures
- Check Node.js version (must be 18+)
- Verify all dependencies are installed
- Review build logs for specific errors

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Good luck with your deployment! 🚀**
