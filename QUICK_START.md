# Quick Start Guide - Admin CMS

## 🚀 Get Started in 3 Steps

### Step 1: Deploy to Your Repository

Extract the provided files to your local repository and deploy:

```bash
# Navigate to your repository
cd /path/to/MadhuPortfolio

# Extract the implementation files
tar -xzf admin-cms-implementation.tar.gz

# Install dependencies
npm install

# Test locally (optional)
npm run dev

# Commit and push
git add .
git commit -m "Add Admin CMS feature"
git push origin main
```

### Step 2: Access Admin Mode

Once deployed, visit your live portfolio and:

1. Press **`Ctrl+Shift+E`** (or **`Cmd+Shift+E`** on Mac)
2. Enter password: **`madhuadmin2025`**
3. Click **"Authenticate"**

### Step 3: Edit Content

1. Click **"Editor"** in the floating admin indicator
2. Choose a tab (Home, About, Portfolio, Blog, etc.)
3. Make your changes
4. Click **"Download JSON"**
5. Replace the file in `client/public/data/`
6. Commit and push to deploy

## 📝 Content Sections

| Tab | What You Can Edit |
|-----|-------------------|
| **Home** | Banner slides, hero text, skills, achievements |
| **About** | Personal story, work experience, education, certifications |
| **Portfolio** | Project entries with images, descriptions, and links |
| **Blog** | Blog posts with markdown content |
| **Contact** | Contact form labels and messages |
| **Footer** | Footer links and copyright |
| **Settings** | Site metadata, colors, navigation, profile, social links |

## 🔑 Important Info

- **Password**: `madhuadmin2025` (change this in `client/src/hooks/useAdminMode.tsx`)
- **Secret Key**: `Ctrl+Shift+E` (customizable in the same file)
- **Session**: Authentication lasts only for the current browser session
- **Files**: All content is stored in `client/public/data/*.json`

## 💡 Tips

- Always download your changes before closing the editor
- Test changes locally before deploying to production
- Keep backups of your JSON files
- Use descriptive commit messages when deploying changes

## 📚 Full Documentation

- **Complete Guide**: See `ADMIN_CMS_README.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Technical Details**: See `IMPLEMENTATION_SUMMARY.md`

## ⚠️ Troubleshooting

**Admin mode not activating?**
- Clear browser cache and hard refresh (`Ctrl+Shift+R`)

**Password not working?**
- Ensure you're using `madhuadmin2025` (case-sensitive)

**Changes not appearing?**
- Wait for GitHub Actions to complete deployment
- Clear browser cache after deployment

---

**Need Help?** Check the full documentation in `ADMIN_CMS_README.md`
