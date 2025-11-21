# Environment Variables for Vercel

## Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### 1. Convex

```
CONVEX_DEPLOYMENT=<your-deployment-name>
NEXT_PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud
```

**How to get these:**

1. Run `npx convex deploy` in your project
2. Copy the deployment URL from the output
3. The deployment name is the part before `.convex.cloud`

### 2. X (Twitter) OAuth

```
X_CLIENT_ID=<your-x-api-key>
X_CLIENT_SECRET=<your-x-api-secret>
X_REDIRECT_URI=https://your-vercel-app.vercel.app/api/auth/callback/twitter
```

**Important:** Update `X_REDIRECT_URI` with your actual Vercel URL!

### 3. NextAuth

```
NEXTAUTH_SECRET=<generate-a-random-secret>
NEXTAUTH_URL=https://your-vercel-app.vercel.app
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 4. OpenAI (Optional - for AI features)

```
OPENAI_API_KEY=<your-openai-api-key>
```

### 5. Telegram (Optional - for notifications)

```
TELEGRAM_BOT_TOKEN=<your-bot-token>
TELEGRAM_CHAT_ID=<your-chat-id>
```

## Steps to Add in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project (x-growth)
3. Go to **Settings** → **Environment Variables**
4. For each variable:
   - Click "Add New"
   - Enter **Key** (e.g., `X_CLIENT_ID`)
   - Enter **Value**
   - Select environments: **Production**, **Preview**, **Development**
   - Click "Save"

## After Adding Variables

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or run: `vercel --prod`

## Quick Deploy Command

After adding all variables, redeploy with:

```bash
vercel --prod
```

This will deploy to production with all environment variables applied.
