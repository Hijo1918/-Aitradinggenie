# Deployment Guide

## Overview
This guide covers deploying AI Trading Genie to production environments with Netlify (frontend) and Supabase (backend).

## Prerequisites
- Node.js 18+ installed
- Git repository set up
- Netlify account
- Supabase account
- Domain name (optional)

## Frontend Deployment (Netlify)

### 1. Prepare Repository
```bash
# Ensure your code is committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Git Integration (Recommended)
1. Visit [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub/GitLab repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

#### Option B: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### 3. Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables:

```env
VITE_SUPABASE_URL=https://qqveojewxoexrwuxrjsk.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_BASE_URL=https://qqveojewxoexrwuxrjsk.supabase.co/functions/v1
VITE_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96590c6C87
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your_project_id
```

### 4. Custom Domain (Optional)
1. Go to Domain Settings in Netlify
2. Add your custom domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

## Backend Deployment (Supabase)

### 1. Create Supabase Project
1. Visit [Supabase](https://supabase.com)
2. Create new project
3. Choose region closest to your users
4. Note your project URL and API keys

### 2. Database Setup
1. Go to SQL Editor in Supabase Dashboard
2. Run the migration file:
   ```sql
   -- Copy and paste content from:
   -- supabase/migrations/20250710153332_purple_credit.sql
   ```

### 3. Deploy Edge Functions

#### Upload Functions Manually:
1. Go to Edge Functions in Supabase Dashboard
2. Create new function for each:
   - `trading-api`
   - `market-data`
   - `smart-contract-api`
3. Copy code from respective files in `supabase/functions/`

#### Using Supabase CLI (Alternative):
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy trading-api
supabase functions deploy market-data
supabase functions deploy smart-contract-api
```

### 4. Configure Authentication
1. Go to Authentication → Settings
2. Configure providers:
   - Enable Email/Password
   - Set site URL: `https://your-domain.com`
   - Add redirect URLs

### 5. Set Environment Variables
In Supabase Dashboard → Settings → API:
- Note your project URL
- Note your anon/public key
- Note your service role key (keep secret)

## Smart Contract Deployment

### 1. Deploy Contract
Using Hardhat:
```bash
# Install Hardhat
npm install --save-dev hardhat

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

Using Remix:
1. Open [Remix IDE](https://remix.ethereum.org)
2. Upload `contracts/AITradingGenie.sol`
3. Compile and deploy to mainnet
4. Note the contract address

### 2. Update Environment Variables
Add the deployed contract address to your environment variables:
```env
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

## SSL/HTTPS Configuration

### Netlify (Automatic)
- SSL certificates are automatically provisioned
- HTTPS is enforced by default

### Custom Domain SSL
1. Netlify automatically provisions Let's Encrypt certificates
2. Force HTTPS in Site Settings → HTTPS

## Performance Optimization

### 1. Build Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})
```

### 2. Caching Headers
In `netlify.toml`:
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Redirects
In `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/api/*"
  to = "https://qqveojewxoexrwuxrjsk.supabase.co/functions/v1/:splat"
  status = 200
```

## Monitoring & Analytics

### 1. Error Tracking
Add Sentry or similar:
```bash
npm install @sentry/react
```

### 2. Analytics
Add Google Analytics or Plausible:
```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 3. Uptime Monitoring
Set up monitoring with:
- UptimeRobot
- Pingdom
- StatusPage

## Security Checklist

### Frontend Security
- [ ] Environment variables properly configured
- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced
- [ ] CSP headers configured

### Backend Security
- [ ] Row Level Security (RLS) enabled
- [ ] API rate limiting configured
- [ ] Input validation implemented
- [ ] CORS properly configured

### Smart Contract Security
- [ ] Contract audited
- [ ] Access controls implemented
- [ ] Emergency pause functionality
- [ ] Reentrancy protection

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variable Issues
- Ensure all required variables are set
- Check variable names (must start with VITE_)
- Verify values are correct

#### API Connection Issues
- Check CORS configuration
- Verify API endpoints are deployed
- Test with curl or Postman

### Debug Commands
```bash
# Check build locally
npm run build && npm run preview

# Test API endpoints
curl -X GET "https://qqveojewxoexrwuxrjsk.supabase.co/functions/v1/market-data/prices" \
  -H "apikey: your_anon_key"

# Check environment variables
echo $VITE_SUPABASE_URL
```

## Rollback Procedures

### Frontend Rollback
1. In Netlify Dashboard → Deploys
2. Click on previous successful deploy
3. Click "Publish deploy"

### Backend Rollback
1. Revert database migrations if needed
2. Redeploy previous function versions
3. Update environment variables if changed

## Maintenance

### Regular Tasks
- [ ] Monitor error rates
- [ ] Check API performance
- [ ] Update dependencies monthly
- [ ] Review security logs
- [ ] Backup database regularly

### Updates
```bash
# Update dependencies
npm update

# Security audit
npm audit fix

# Rebuild and redeploy
npm run build
```

## Support

If you encounter issues during deployment:
1. Check the troubleshooting section
2. Review logs in Netlify/Supabase dashboards
3.Contact support: aitradinggenie@my.com
