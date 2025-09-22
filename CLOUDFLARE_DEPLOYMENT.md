# Cloudflare Workers Deployment Guide for A_Action Chatbot

## Overview
This guide will help you deploy your chatbot backend to Cloudflare Workers, enabling it to work with your static frontend on aaction.in.

## Prerequisites
- Node.js installed on your system
- Cloudflare account
- Your Gemini API key

## Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
```

## Step 2: Login to Cloudflare
```bash
wrangler login
```
This will open your browser to authenticate with Cloudflare.

## Step 3: Set up the Worker Project
1. Navigate to your project directory
2. Rename the package file:
   ```bash
   mv package-worker.json package.json
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Step 4: Deploy the Worker
```bash
wrangler deploy
```

After deployment, you'll get a URL like: `https://a-action-chatbot.your-subdomain.workers.dev`

## Step 5: Set Your API Key as a Secret
```bash
wrangler secret put GEMINI_API_KEY
```
When prompted, enter your Gemini API key: `AIzaSyARTpyLArsma4ur3dGctXVh51mwg_4-pJY`

## Step 6: Update Frontend URL
1. Copy the worker URL from step 4
2. Update `src/components/Chatbot.jsx` line 20:
   ```javascript
   const API_BASE_URL = 'https://a-action-chatbot.your-actual-subdomain.workers.dev';
   ```
   Replace `your-actual-subdomain` with your actual Cloudflare subdomain.

## Step 7: Redeploy Your Frontend
Since your frontend is already on Cloudflare Pages, you just need to:
1. Commit and push your changes to your repository
2. Cloudflare Pages will automatically rebuild and deploy

## Testing
1. Visit your website at aaction.in
2. Open the chatbot
3. Ask a question like "What APIs does a_ACTION support?"
4. Verify you get a proper response

## Monitoring
- Check Cloudflare Workers dashboard for usage statistics
- Monitor the 100,000 requests/day free tier
- View logs in the Cloudflare dashboard

## Troubleshooting

### If the chatbot doesn't respond:
1. Check the browser console for errors
2. Verify the API URL is correct in Chatbot.jsx
3. Check Cloudflare Workers logs
4. Ensure the API key secret is set correctly

### If you get CORS errors:
The worker is already configured with proper CORS headers, but if you encounter issues, check that the frontend domain is allowed.

### If you exceed the free tier:
- Monitor usage in Cloudflare dashboard
- Consider upgrading to a paid plan if needed
- The free tier should be more than sufficient for most use cases

## Cost Breakdown
- **Free Tier**: 100,000 requests/day
- **Beyond Free Tier**: $0.50 per million requests
- **Estimated Cost**: For most websites, this will be completely free

## Security Notes
- Your API key is stored as a secret in Cloudflare
- The worker only exposes the necessary endpoints
- CORS is properly configured for your domain

## Next Steps
1. Deploy the worker following the steps above
2. Update your frontend with the new URL
3. Test thoroughly
4. Monitor usage and performance

Your chatbot will now work seamlessly with your Cloudflare-hosted frontend!
