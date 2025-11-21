# Vercel Deployment Guide for X Growth

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your X (Twitter) API credentials ready

## Step 1: Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - X Growth app"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/x-growth.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? x-growth (or your preferred name)
# - Directory? ./ (press Enter)
# - Override settings? No
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
4. Click "Deploy"

## Step 3: Configure Environment Variables in Vercel

After deployment, add your environment variables:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

```bash
# Convex
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# X (Twitter) OAuth - UPDATE THESE
X_CLIENT_ID=your_x_api_key
X_CLIENT_SECRET=your_x_api_secret
X_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback/twitter

# OpenAI (for AI features)
OPENAI_API_KEY=your_openai_key

# Telegram (for notifications)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-app.vercel.app
```

**Important**: Replace `https://your-app.vercel.app` with your actual Vercel URL!

## Step 4: Get Your Vercel URL

After deployment, you'll get a URL like:

- `https://x-growth.vercel.app` (production)
- `https://x-growth-git-main-username.vercel.app` (branch preview)

Use the **production URL** for X OAuth configuration.

## Step 5: Configure X Developer Portal

1. Go to https://developer.twitter.com/en/portal/projects-and-apps
2. Select your app
3. Go to **Settings** tab
4. Click **Edit** on "User authentication settings"
5. Update:
   - **Website URL**: `https://your-app.vercel.app`
   - **Callback URL**: `https://your-app.vercel.app/api/auth/callback/twitter`
6. Save changes

## Step 6: Update Convex Deployment URL

Make sure your Convex deployment is set to production:

```bash
# In your project directory
npx convex deploy

# Copy the deployment URL and add to Vercel environment variables
```

## Step 7: Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger automatic deployment

## Step 8: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Click "Login with X"
3. Authorize the app
4. You should be redirected back and logged in!

## Automatic Deployments

Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **Pull Requests**: Every PR gets a preview deployment

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed
4. Update X Developer Portal with new domain
5. Update environment variables with new domain

## Troubleshooting

### Issue: "Invalid redirect_uri"

- Ensure callback URL in X Portal matches exactly
- Check `X_REDIRECT_URI` environment variable
- Redeploy after changing environment variables

### Issue: Environment variables not working

- Make sure to redeploy after adding variables
- Check variable names are correct (case-sensitive)
- Verify no extra spaces in values

### Issue: Convex not connecting

- Ensure `NEXT_PUBLIC_CONVEX_URL` is set correctly
- Run `npx convex deploy` to get production URL
- Must start with `https://`

## Production Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] All environment variables added
- [ ] X OAuth configured with production URL
- [ ] Convex deployed to production
- [ ] Test login flow
- [ ] Test engagement features
- [ ] Test hooks generation
- [ ] Set up Telegram bot (if using)

## Next Steps

Once deployed:

1. Monitor your app in Vercel Dashboard
2. Check logs for any errors
3. Set up custom domain (optional)
4. Enable Vercel Analytics (optional)
5. Configure deployment protection (optional)
