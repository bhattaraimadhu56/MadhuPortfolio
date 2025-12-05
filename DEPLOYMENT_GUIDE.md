# Deployment Guide - Admin CMS Implementation

This guide will help you deploy the Admin CMS feature to your MadhuPortfolio repository.

## Prerequisites

Before you begin, ensure you have:
- Git installed on your computer
- Access to your GitHub repository
- A local clone of your MadhuPortfolio repository

## Deployment Steps

### Step 1: Download the Implementation Files

Download the `admin-cms-implementation.tar.gz` file that contains all the new and modified files.

### Step 2: Extract Files to Your Repository

1. Navigate to your local MadhuPortfolio repository directory
2. Extract the archive to your repository root:
   ```bash
   tar -xzf admin-cms-implementation.tar.gz
   ```

### Step 3: Review the Changes

The following files have been added or modified:

**New Files:**
- `client/src/hooks/useAdminMode.tsx`
- `client/src/contexts/AdminContext.tsx`
- `client/src/components/AdminPasswordDialog.tsx`
- `client/src/components/AdminIndicator.tsx`
- `client/src/components/admin/EditorWrapper.tsx`
- `client/src/components/admin/HomeEditor.tsx`
- `client/src/components/admin/AboutEditor.tsx`
- `client/src/components/admin/PortfolioEditor.tsx`
- `client/src/components/admin/BlogEditor.tsx`
- `client/src/components/admin/ContactEditor.tsx`
- `client/src/components/admin/FooterEditor.tsx`
- `client/src/components/admin/GlobalSettingsEditor.tsx`
- `client/src/pages/AdminEditor.tsx`
- `IMPLEMENTATION_SUMMARY.md`
- `ADMIN_CMS_README.md`

**Modified Files:**
- `client/src/App.tsx` - Added admin context and routes
- `package.json` - Removed conflicting dependency
- `vite.config.ts` - Removed conflicting plugin

### Step 4: Install Dependencies

Run the following command to install/update dependencies:
```bash
npm install
```

### Step 5: Test Locally (Optional but Recommended)

Before deploying to production, test the implementation locally:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Test the Admin Mode:
   - Press `Ctrl+Shift+E`
   - Enter password: `madhuadmin2025`
   - Navigate through the editor tabs
   - Try editing some content and downloading a JSON file

4. Verify the build works:
   ```bash
   npm run build
   ```

### Step 6: Commit and Push to GitHub

1. Stage all changes:
   ```bash
   git add .
   ```

2. Commit the changes:
   ```bash
   git commit -m "Add Admin CMS feature for content management"
   ```

3. Push to GitHub:
   ```bash
   git push origin main
   ```

### Step 7: Verify Deployment

1. GitHub Actions will automatically build and deploy your site
2. Go to your repository on GitHub
3. Click on the "Actions" tab
4. Wait for the deployment workflow to complete (usually 2-3 minutes)
5. Visit your live site
6. Test the Admin Mode with `Ctrl+Shift+E`

## Post-Deployment

### Changing the Admin Password

For security, you should change the default password:

1. Edit `client/src/hooks/useAdminMode.tsx`
2. Find line 13: `const ADMIN_PASSWORD = 'madhuadmin2025';`
3. Change to your desired password
4. Commit and push the change

### Using the Admin CMS

Refer to the `ADMIN_CMS_README.md` file for complete usage instructions.

## Troubleshooting

### Build Fails on GitHub Actions

**Issue**: The deployment workflow fails after pushing.

**Solution**:
1. Check the Actions tab for error messages
2. Ensure all files were committed correctly
3. Verify `package.json` and `vite.config.ts` were updated properly
4. Try running `npm run build` locally to identify the issue

### Admin Mode Not Working

**Issue**: Pressing `Ctrl+Shift+E` doesn't show the password dialog.

**Solution**:
1. Clear your browser cache
2. Hard refresh the page (`Ctrl+Shift+R` or `Cmd+Shift+R`)
3. Check the browser console for JavaScript errors
4. Ensure the deployment completed successfully

### Password Dialog Shows But Won't Accept Password

**Issue**: The password dialog appears but authentication fails.

**Solution**:
1. Verify you're using the correct password: `madhuadmin2025`
2. Check for typos (case-sensitive)
3. Try refreshing the page and attempting again
4. Clear browser cache and cookies

### Changes Not Appearing After Download and Deploy

**Issue**: You downloaded a JSON file, replaced it, and pushed, but changes don't appear.

**Solution**:
1. Verify you replaced the correct file in `client/public/data/`
2. Check that the JSON file is valid (no syntax errors)
3. Ensure the file name matches exactly (case-sensitive)
4. Wait for GitHub Actions to complete the deployment
5. Clear your browser cache and hard refresh

## Rollback Instructions

If you need to revert the changes:

1. Find the commit before the Admin CMS implementation:
   ```bash
   git log --oneline
   ```

2. Revert to that commit:
   ```bash
   git revert <commit-hash>
   ```

3. Push the revert:
   ```bash
   git push origin main
   ```

## Support

For additional help:
1. Review the `ADMIN_CMS_README.md` for usage instructions
2. Check the `IMPLEMENTATION_SUMMARY.md` for technical details
3. Examine the code comments in the admin components
4. Review GitHub Actions logs for deployment issues

---

**Deployment Version**: 1.0.0  
**Date**: December 2025
