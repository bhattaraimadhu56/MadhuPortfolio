# Environment Variables Management Guide

## Overview

GitHub itself **does NOT store environment variables** for your application runtime. However, there are several secure ways to manage them:

## Option 1: GitHub Secrets (For CI/CD Workflows) ⭐ RECOMMENDED

GitHub Secrets are used in **GitHub Actions** (CI/CD pipelines) to securely store sensitive data.

### How to Set Up:

1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add your secret:
   - **Name**: `VITE_ADMIN_PASSWORD_HASH`
   - **Value**: `$2b$10$7K2HU/TpR/ZbjTyO0W.52.f0VvOU.5/A9lhAb.xPaOoTq8vXGCNTS`
5. Click **Add secret**

### Use in GitHub Actions Workflow:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        env:
          VITE_ADMIN_PASSWORD_HASH: ${{ secrets.VITE_ADMIN_PASSWORD_HASH }}
        run: pnpm build
      
      - name: Deploy
        run: # Your deployment command here
```

### Benefits:
✅ Secrets are encrypted
✅ Never exposed in logs
✅ Only available during workflow execution
✅ Can be used for automated deployments

### Limitations:
❌ Only works with GitHub Actions
❌ Not for local development
❌ Not for static sites without CI/CD

---

## Option 2: Deployment Platform Secrets ⭐ BEST FOR PRODUCTION

Most hosting platforms have their own environment variable management.

### Vercel (Recommended for React/Vite)

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings** → **Environment Variables**
4. Add your variable:
   - **Name**: `VITE_ADMIN_PASSWORD_HASH`
   - **Value**: `$2b$10$7K2HU/TpR/ZbjTyO0W.52.f0VvOU.5/A9lhAb.xPaOoTq8vXGCNTS`
   - **Environments**: Select (Production, Preview, Development)
5. Click **Save**

**Vercel automatically injects these into your build and runtime.**

### Netlify

1. **Go to Netlify Dashboard**
2. **Select your site**
3. **Site settings** → **Build & deploy** → **Environment**
4. Click **Edit variables**
5. Add:
   - **Key**: `VITE_ADMIN_PASSWORD_HASH`
   - **Value**: `$2b$10$7K2HU/TpR/ZbjTyO0W.52.f0VvOU.5/A9lhAb.xPaOoTq8vXGCNTS`
6. Click **Save**

### GitHub Pages (Static Site Hosting)

⚠️ **GitHub Pages does NOT support environment variables** because it's static hosting.

**Solution**: Use a different platform:
- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**

### Other Platforms

- **Railway**: Project → Variables
- **Render**: Environment → Environment Variables
- **AWS**: Secrets Manager or Parameter Store
- **Google Cloud**: Secret Manager
- **Azure**: Key Vault

---

## Option 3: GitHub Repository Secrets (For Developers) 

⚠️ **NOT recommended for sensitive data**, but useful for non-secret configuration.

1. **Settings** → **Secrets and variables** → **Repository secrets**
2. Add secrets (same as GitHub Actions)
3. **Visible only to repository collaborators**

---

## Option 4: `.env.local` File (Local Development Only)

**Current Setup** - What you're already using:

```
.env.local (in .gitignore)
├── VITE_ADMIN_PASSWORD_HASH=$2b$10$...
└── Not committed to GitHub
```

### For Team Development:

Create `.env.local.example` (commit to GitHub):

```
# Copy this file to .env.local and fill in your values
VITE_ADMIN_PASSWORD_HASH=your_hash_here
```

Team members:
1. Copy `.env.local.example` to `.env.local`
2. Fill in their own values
3. Never commit `.env.local`

---

## Recommended Setup by Scenario

### Scenario 1: Solo Developer (You)

```
Local Development:
├── .env.local (on your machine only)
├── Contains: VITE_ADMIN_PASSWORD_HASH hash
└── Not in GitHub

Production (Vercel/Netlify):
├── Set environment variable in platform dashboard
├── Contains: VITE_ADMIN_PASSWORD_HASH hash
└── Automatically injected during build
```

### Scenario 2: Team Project

```
GitHub Repository:
├── .env.local.example (template)
├── .gitignore (includes .env.local)
└── No secrets in code

Each Developer:
├── .env.local (their own copy)
├── Never committed
└── Contains their own values

Production:
├── Environment variables in Vercel/Netlify
├── Different values per environment
└── Automatically injected
```

### Scenario 3: Open Source Project

```
GitHub Repository:
├── .env.local.example (template)
├── SECURE_PASSWORD_SETUP.md (instructions)
├── .gitignore (protects .env.local)
└── No secrets anywhere

Contributors:
├── Follow setup guide
├── Generate their own hash
├── Create .env.local locally
└── Never commit secrets

Production:
├── Maintainer sets env vars in platform
└── Secrets never in repository
```

---

## Security Best Practices

### ✅ DO:

1. **Use `.gitignore` for `.env.local`** (Already done!)
2. **Store hashes in platform environment variables** (Vercel, Netlify, etc.)
3. **Use GitHub Secrets for CI/CD** (GitHub Actions)
4. **Rotate passwords periodically**
5. **Use strong, unique passwords**
6. **Different passwords for dev/staging/prod**
7. **Document setup in README or SETUP.md**
8. **Use `.env.local.example` as template**

### ❌ DON'T:

1. **Commit `.env.local` to GitHub**
2. **Store plain text passwords in code**
3. **Share passwords in messages/emails**
4. **Use weak passwords**
5. **Hardcode secrets in configuration files**
6. **Commit `.env` or `.env.production` files**
7. **Share GitHub Secrets with unauthorized people**
8. **Use same password for multiple environments**

---

## Current Setup Analysis

### Your Current Setup ✅

```
✅ .env.local created with hashed password
✅ .env.local in .gitignore (protected)
✅ Bcrypt hashing (one-way encryption)
✅ No plain text in GitHub
✅ No hints about password
✅ Secure locally
```

### What's Missing for Production:

```
⚠️ Need to set VITE_ADMIN_PASSWORD_HASH in hosting platform
⚠️ Need to configure deployment platform
⚠️ Need to set up CI/CD (optional but recommended)
```

---

## Step-by-Step: Deploy to Vercel

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

### 2. Import Repository
- Click "New Project"
- Select your MadhuPortfolio repository
- Click "Import"

### 3. Add Environment Variables
- **Settings** → **Environment Variables**
- Click **Add**
  - **Name**: `VITE_ADMIN_PASSWORD_HASH`
  - **Value**: `$2b$10$7K2HU/TpR/ZbjTyO0W.52.f0VvOU.5/A9lhAb.xPaOoTq8vXGCNTS`
  - **Environments**: Select all (Production, Preview, Development)
- Click **Save**

### 4. Deploy
- Click **Deploy**
- Vercel automatically builds and deploys
- Your site is live!

### 5. Test
- Visit your Vercel URL
- Press `Ctrl+Shift+E`
- Enter your password: `M@dhuAdmin2026`
- Should work perfectly!

---

## Summary

| Method | Use Case | Security | Cost |
|--------|----------|----------|------|
| `.env.local` | Local development | High | Free |
| GitHub Secrets | CI/CD workflows | High | Free |
| Vercel/Netlify | Production | High | Free tier available |
| GitHub Pages | Static hosting | ⚠️ Limited | Free |
| Self-hosted | Full control | Depends | Varies |

---

## Questions?

For more information:
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
