#!/bin/bash

# Gonzo Studio Portfolio - Automated Setup Script
# This script will guide you through the complete setup process

set -e  # Exit on error

echo "🎨 Gonzo Studio Portfolio - Setup Script"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Step 1: Installing Dependencies${NC}"
echo "Running: pnpm install"
echo ""
pnpm install
echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists.${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Skipping .env.local creation...${NC}"
        ENV_SKIP=true
    fi
fi

if [ "$ENV_SKIP" != "true" ]; then
    echo -e "${BLUE}🔑 Step 2: Setting up Environment Variables${NC}"
    echo ""
    echo "Please provide your Supabase credentials."
    echo "You can find these at: https://app.supabase.com/ > Your Project > Settings > API"
    echo ""
    
    read -p "Enter your NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
    read -p "Enter your NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY
    read -p "Enter your SUPABASE_SERVICE_ROLE_KEY (optional, press Enter to skip): " SUPABASE_SERVICE_KEY
    
    # Create .env.local file
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
EOF
    
    if [ ! -z "$SUPABASE_SERVICE_KEY" ]; then
        echo "SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_KEY}" >> .env.local
    fi
    
    echo -e "${GREEN}✅ Environment variables configured!${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Using existing .env.local${NC}"
    echo ""
fi

echo -e "${BLUE}📊 Step 3: Database Setup${NC}"
echo ""
echo "You need to run the database migrations in Supabase:"
echo ""
echo -e "${YELLOW}Manual Steps Required:${NC}"
echo "1. Go to: https://app.supabase.com/"
echo "2. Select your project"
echo "3. Navigate to: SQL Editor"
echo "4. Run the file: scripts/001_create_projects.sql"
echo ""
read -p "Press Enter once you've completed the database migration..."
echo ""

echo -e "${BLUE}👤 Step 4: Creating Admin User${NC}"
echo ""
echo "Choose how you want to create the admin user:"
echo ""
echo "1. Supabase Dashboard (Recommended - Easiest)"
echo "2. Node.js Script (Requires service role key)"
echo "3. Skip (I'll do it manually later)"
echo ""
read -p "Enter your choice (1-3): " -n 1 -r ADMIN_CHOICE
echo ""
echo ""

case $ADMIN_CHOICE in
    1)
        echo -e "${YELLOW}📋 Supabase Dashboard Method:${NC}"
        echo ""
        echo "1. Go to: https://app.supabase.com/"
        echo "2. Select your project"
        echo "3. Navigate to: Authentication > Users"
        echo "4. Click: 'Add User' button"
        echo "5. Enter the following credentials:"
        echo -e "   ${GREEN}Email: work.gonzostudio@outlook.com${NC}"
        echo -e "   ${GREEN}Password: mw#d^Ovcls%FQikyf6${NC}"
        echo "6. Check: 'Auto Confirm User'"
        echo "7. Click: 'Create User'"
        echo ""
        read -p "Press Enter once you've created the admin user..."
        ;;
    2)
        if [ -z "$SUPABASE_SERVICE_KEY" ] && ! grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local 2>/dev/null; then
            echo -e "${RED}❌ Error: Service role key not found in .env.local${NC}"
            echo "Please add it manually or use the Dashboard method."
            exit 1
        fi
        echo "Running admin user creation script..."
        node scripts/create-admin-user.js
        ;;
    3)
        echo -e "${YELLOW}⏭️  Skipping admin user creation...${NC}"
        echo "Remember to create the admin user later!"
        ;;
    *)
        echo -e "${RED}Invalid choice. Skipping admin user creation.${NC}"
        ;;
esac
echo ""

echo -e "${BLUE}🚀 Step 5: Starting Development Server${NC}"
echo ""
read -p "Do you want to start the dev server now? (Y/n): " -n 1 -r START_DEV
echo ""
echo ""

if [[ ! $START_DEV =~ ^[Nn]$ ]]; then
    echo -e "${GREEN}🎉 Setup Complete! Starting dev server...${NC}"
    echo ""
    echo -e "${BLUE}Your portfolio will be available at:${NC}"
    echo "  • Public site: http://localhost:3000"
    echo "  • Admin login: http://localhost:3000/auth/login"
    echo ""
    echo -e "${GREEN}Admin Credentials:${NC}"
    echo "  • Email: work.gonzostudio@outlook.com"
    echo "  • Password: mw#d^Ovcls%FQikyf6"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    sleep 2
    pnpm dev
else
    echo -e "${GREEN}🎉 Setup Complete!${NC}"
    echo ""
    echo -e "${BLUE}To start the development server, run:${NC}"
    echo "  pnpm dev"
    echo ""
    echo -e "${BLUE}Then visit:${NC}"
    echo "  • Public site: http://localhost:3000"
    echo "  • Admin login: http://localhost:3000/auth/login"
    echo ""
    echo -e "${GREEN}Admin Credentials:${NC}"
    echo "  • Email: work.gonzostudio@outlook.com"
    echo "  • Password: mw#d^Ovcls%FQikyf6"
    echo ""
fi
