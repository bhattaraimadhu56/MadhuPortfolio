# Secure Admin Password Setup Guide

## Overview

The admin password is now secured using **bcrypt hashing** and stored in environment variables. The plain text password is **never stored in the code** and is **not committed to GitHub**.

## How It Works

1. **Password Hashing**: The password is hashed using bcrypt (a cryptographically secure hashing algorithm)
2. **Environment Variable**: The hashed password is stored in `.env.local` (which is in `.gitignore`)
3. **Verification**: When you enter the password, it's compared with the bcrypt hash using `bcrypt.compare()`
4. **Security**: Even if someone sees the hash, they cannot reverse it to get the plain text password

## Setup Instructions

### For Development (Local Machine)

1. **Create `.env.local` file** in the project root:
   ```bash
   touch .env.local
   ```

2. **Add the hashed password** to `.env.local`:
   ```
   VITE_ADMIN_PASSWORD_HASH=$2b$10$cqnpofa26gRAGU1sc5APJuLUNv6SkOY.Yke6YYLkaFbsi9ZiWZC2i
   ```

3. **Restart the dev server**:
   ```bash
   pnpm dev
   ```

4. **Test the password**: Press `Ctrl+Shift+E` and enter `madhuadmin2025`

### For Production / Deployment

1. **Generate a new bcrypt hash** for your password:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('YOUR_PASSWORD_HERE', 10); console.log('Hash:', hash);"
   ```

2. **Set the environment variable** in your hosting platform:
   - For Vercel: Add to Environment Variables in project settings
   - For Netlify: Add to Build & Deploy > Environment variables
   - For other platforms: Follow their documentation for setting env variables

3. **Use the new hash** as the value for `VITE_ADMIN_PASSWORD_HASH`

## Security Best Practices

✅ **DO:**
- Keep `.env.local` in `.gitignore` (already configured)
- Use a strong, unique password (at least 12 characters)
- Change the password periodically
- Use different passwords for different environments (dev, staging, production)
- Store the hash securely in your hosting platform's secrets/environment variables

❌ **DON'T:**
- Commit `.env.local` to GitHub
- Share the plain text password in messages or emails
- Use weak passwords
- Hardcode passwords in the code
- Store passwords in version control

## Changing the Password

### Step 1: Generate New Hash
```bash
node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('NEW_PASSWORD', 10); console.log('Hash:', hash);"
```

### Step 2: Update `.env.local`
```
VITE_ADMIN_PASSWORD_HASH=<new_hash_here>
```

### Step 3: Restart Dev Server
```bash
pnpm dev
```

### Step 4: Test with New Password
Press `Ctrl+Shift+E` and enter your new password

## Technical Details

- **Hashing Algorithm**: bcryptjs (bcrypt for JavaScript)
- **Cost Factor**: 10 (balance between security and performance)
- **Verification Method**: `bcrypt.compare()` - constant-time comparison
- **Storage**: Environment variable `VITE_ADMIN_PASSWORD_HASH`
- **Access**: Available on client-side (Vite exposes `VITE_*` variables)

## Files Modified

1. **`.env.local`** - Created with hashed password (not in GitHub)
2. **`client/src/hooks/useAdminMode.tsx`** - Updated to use bcrypt verification
3. **`client/src/contexts/AdminContext.tsx`** - Updated to support async authentication
4. **`client/src/components/AdminPasswordDialog.tsx`** - Updated to handle async verification

## Current Password

- **Plain Text**: `madhuadmin2025`
- **Hash**: `$2b$10$cqnpofa26gRAGU1sc5APJuLUNv6SkOY.Yke6YYLkaFbsi9ZiWZC2i`

⚠️ **Note**: This is the default hash. For production, generate a new hash with your own password.

## Troubleshooting

### Password not working after setup?
- Make sure `.env.local` exists in the project root
- Verify the hash is correct
- Restart the dev server: `pnpm dev`
- Check browser console for errors

### Hash not being read?
- Ensure the environment variable name is exactly `VITE_ADMIN_PASSWORD_HASH`
- Vite requires `VITE_` prefix to expose variables to the client
- Restart the dev server after changing `.env.local`

### Need to reset password?
1. Generate a new hash
2. Update `.env.local`
3. Restart dev server
4. Test with new password

## Questions?

If you have any questions about the secure password setup, refer to:
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)
