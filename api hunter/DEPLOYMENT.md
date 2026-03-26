## Deployment Guide

This guide explains how to deploy your API Hunter application to various hosting platforms.

---

## 1. Deploy to GitHub Pages (Free)

### Prerequisites
- GitHub account
- Git installed

### Steps

1. **Create GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/api-hunter.git
   git push -u origin main
   ```

2. **Update vite.config.js:**
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     base: '/api-hunter/',  // Change to your repo name
     plugins: [react()],
   })
   ```

3. **Update package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist",
       "predeploy": "npm run build"
     },
     "devDependencies": {
       "gh-pages": "^5.0.0"
     }
   }
   ```

4. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

6. **Configure GitHub Pages:**
   - Go to Repository Settings
   - Scroll to GitHub Pages section
   - Select `gh-pages` branch
   - Your site will be at: `https://YOUR_USERNAME.github.io/api-hunter`

---

## 2. Deploy to Vercel (Recommended - Very Easy)

### Steps

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Select project directory
   - Confirm settings
   - Wait for deployment

4. **Access your site:**
   - Your app will be live at the provided Vercel URL
   - Example: `https://api-hunter.vercel.app`

### Auto-deployment from GitHub:
1. Link GitHub repository to Vercel
2. Every push to main triggers auto-deployment
3. Automatic preview URLs for pull requests

---

## 3. Deploy to Netlify (Easy)

### Using Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Create production build:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Using Git

1. **Push to GitHub**
2. **Connect GitHub to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub
   - Choose your repository
3. **Configure settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy:** Click "Deploy site"

---

## 4. Deploy to Render (Free)

### Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create New Static Site on Render.com:**
   - Sign up at [render.com](https://render.com)
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Create Static Site"

3. **Your site is live!**

---

## 5. Deploy to Firebase Hosting

### Steps

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Choose your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: `Yes`

4. **Build and Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

## 6. Deploy to AWS S3 + CloudFront

### Prerequisites
- AWS account
- AWS CLI installed

### Steps

1. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://api-hunter-bucket --region us-east-1
   ```

2. **Enable static website hosting:**
   ```bash
   aws s3 website s3://api-hunter-bucket \
     --index-document index.html \
     --error-document index.html
   ```

3. **Build and upload:**
   ```bash
   npm run build
   aws s3 sync dist/ s3://api-hunter-bucket --delete
   ```

4. **Create CloudFront distribution:**
   - Enable caching
   - Set default root object to `index.html`
   - Configure error pages

---

## 7. Deploy to Docker

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
# Build Docker image
docker build -t api-hunter .

# Run container
docker run -p 80:80 api-hunter

# Access at http://localhost
```

### Deploy Docker to Heroku

```bash
# Login
heroku login

# Create app
heroku create api-hunter

# Add Dockerfile
# Commit changes
git add Dockerfile
git commit -m "Add Dockerfile"

# Deploy
git push heroku main
```

---

## Performance Optimization Before Deployment

### 1. Enable Gzip Compression
```javascript
// vite.config.js
import compression from 'vite-plugin-compression'

export default {
  plugins: [
    compression({
      threshold: 1024,
      deleteOriginFile: false,
    })
  ]
}
```

### 2. Optimize Images
```bash
npm install -D @vitejs/plugin-legacy
```

### 3. Minify CSS & JS
Already done by Vite during build

### 4. Analyze Bundle Size
```bash
npm install -D rollup-plugin-visualizer
```

---

## Environment Variables for Deployment

Create `.env.production`:
```env
VITE_API_URL=https://api.publicapis.org
VITE_API_TIMEOUT=10000
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## SSL Certificate

Most platforms (Vercel, Netlify, Firebase) provide free SSL automatically.

For custom domains, use:
- Let's Encrypt (free)
- Cloudflare (free)
- AWS Certificate Manager (free for AWS services)

---

## Monitoring & Analytics

### Google Analytics
```jsx
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry (Error Tracking)
```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.Replay()],
  tracesSampleRate: 1.0,
});
```

---

## Domain Setup

### Vercel
- Go to Settings → Domains
- Add your domain
- Follow DNS instructions

### Netlify
- Go to Site Settings → Domain Management
- Add domain
- Update DNS records

### GitHub Pages
- Add `CNAME` file with domain name
- Update DNS records

---

## Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| 404 errors on refresh | Configure single-page app mode |
| API calls failing | Check CORS headers on API |
| Styles not loading | Verify base URL in vite.config.js |
| Very slow load time | Enable gzip compression, optimize images |
| White blank page | Check browser console for errors |

---

## Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify API calls are working
- [ ] Test search and filter functionality
- [ ] Check loading states
- [ ] Test error handling
- [ ] Verify responsive design
- [ ] Check performances metrics
- [ ] Set up monitoring/analytics
- [ ] Create custom domain (optional)

---

## Cost Comparison

| Platform | Cost | Bandwidth | Storage |
|----------|------|-----------|---------|
| Vercel | Free-$20/mo | Generous | 100MB |
| Netlify | Free-$19/mo | Generous | 100GB |
| Render | Free-$7/mo | 100GB/mo | 5GB |
| Firebase | Free-$18/mo | 1GB/day | 5GB |
| GitHub Pages | Free | Unlimited | 100GB |
| GitHub Pages | Free | Unlimited | 100GB |

---

## Recommended Setup: Vercel + GitHub

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Auto-deployment on every push
4. Free SSL & CDN
5. Easy rollback

Perfect for learning and production!

---

For more details visit:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Docs](https://vitejs.dev/guide/static-deploy.html)
