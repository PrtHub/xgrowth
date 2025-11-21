#!/bin/bash

# Quick Vercel Deployment Script
# This script helps you deploy your X Growth app to Vercel

echo "🚀 X Growth - Vercel Deployment"
echo "================================"
echo ""

# Step 1: Login to Vercel
echo "Step 1: Logging in to Vercel..."
vercel login

# Step 2: Deploy
echo ""
echo "Step 2: Deploying to Vercel..."
echo "Follow the prompts:"
echo "  - Set up and deploy? → Yes"
echo "  - Which scope? → Select your account"
echo "  - Link to existing project? → No"
echo "  - Project name? → x-growth (or your preferred name)"
echo "  - Directory? → ./ (press Enter)"
echo "  - Override settings? → No"
echo ""

vercel

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Copy your Vercel URL from the output above"
echo "2. Add environment variables in Vercel Dashboard"
echo "3. Configure X Developer Portal with your Vercel URL"
echo "4. Redeploy to apply environment variables"
echo ""
echo "See VERCEL_DEPLOYMENT.md for detailed instructions"
