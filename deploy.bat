@echo off
echo Deploying A_Action Chatbot to Cloudflare Workers...

echo.
echo Step 1: Installing Wrangler CLI...
npm install -g wrangler

echo.
echo Step 2: Setting up project...
if exist package-worker.json (
    ren package-worker.json package.json
    echo Renamed package-worker.json to package.json
)

echo.
echo Step 3: Installing dependencies...
npm install

echo.
echo Step 4: Deploying to Cloudflare...
wrangler deploy

echo.
echo Step 5: Setting up API key secret...
echo Please enter your Gemini API key when prompted:
wrangler secret put GEMINI_API_KEY

echo.
echo Deployment complete!
echo.
echo Next steps:
echo 1. Copy the worker URL from above
echo 2. Update src/components/Chatbot.jsx with the new URL
echo 3. Commit and push your frontend changes
echo.
pause
