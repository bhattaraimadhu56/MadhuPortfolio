# 🚀 Complete Website Management & Editing Guide
## MadhuPortfolio - Comprehensive Documentation

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Website**: Madhu Bhattarai - Data Analyst Portfolio  
**Admin Password**: Secured with bcrypt hashing (See Password Management Section)

---

## 📋 Table of Contents

1. [Quick Start Guide](#quick-start-guide)
2. [Accessing Admin Panel](#accessing-admin-panel)
3. [Password Management](#password-management)
4. [Website Structure Overview](#website-structure-overview)
5. [Global Settings & Branding](#global-settings--branding)
6. [Home Page Management](#home-page-management)
7. [About Page Management](#about-page-management)
8. [Blog Management](#blog-management)
9. [Portfolio Management](#portfolio-management)
10. [Contact Page Management](#contact-page-management)
11. [Footer Management](#footer-management)
12. [Troubleshooting](#troubleshooting)
13. [FAQ](#faq)

---

## 🎯 Quick Start Guide

### For First-Time Users:

1. **Access the Admin Panel**
   - Go to your website: `https://www.madhudata.com` (or your local dev server)
   - Press `Ctrl + Shift + E` on your keyboard
   - A password dialog will appear

2. **Enter Your Password**
   - Password: `M@dhuAdmin2026` (securely hashed with bcrypt)
   - Click "Authenticate"

3. **Navigate to Editor**
   - Click the "Editor" button that appears
   - You'll see tabs for different sections: Home, About, Blog, Portfolio, Contact, Footer, Settings

4. **Edit Content**
   - Click on the section you want to edit
   - Make your changes
   - Click "Save" to update the website

5. **Logout**
   - Click "Logout" or close the admin panel
   - Your changes are automatically saved

### Time Required:
- First login: 2-3 minutes
- Editing a section: 5-15 minutes depending on content
- Saving changes: Instant (no page reload needed)

---

## 🔐 Accessing Admin Panel

### Method 1: Keyboard Shortcut (Recommended)

**Steps:**
1. Visit your website
2. Press `Ctrl + Shift + E` (Windows/Linux) or `Cmd + Shift + E` (Mac)
3. Password dialog appears
4. Enter password: `M@dhuAdmin2026`
5. Click "Authenticate"

**What You'll See:**
- "Admin Mode" indicator appears at bottom of page
- "Editor" button becomes visible
- Click "Editor" to open the admin panel

### Method 2: Direct URL Access

If keyboard shortcut doesn't work:
1. Open browser console (F12 or Right-click → Inspect)
2. Go to Console tab
3. Type: `window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true, key: 'E' }))`
4. Press Enter
5. Password dialog appears

### Method 3: Browser Storage Method

For browsers that don't respond to keyboard events:
1. Open browser console (F12)
2. Go to Console tab
3. Type: `localStorage.setItem('adminMode', 'true')`
4. Press Enter
5. Refresh the page
6. "Editor" button should appear

---

## 🔑 Password Management

### Current Password Information

| Item | Details |
|------|---------|
| **Current Password** | `M@dhuAdmin2026` |
| **Password Type** | Bcrypt hashed (one-way encryption) |
| **Hash Value** | `$2b$10$7K2HU/TpR/ZbjTyO0W.52.f0VvOU.5/A9lhAb.xPaOoTq8vXGCNTS` |
| **Storage Location** | `.env.local` (local machine only) |
| **In GitHub** | ❌ NOT visible (protected by .gitignore) |
| **Security Level** | ⭐⭐⭐⭐⭐ (Enterprise-grade) |

### Why Bcrypt Hashing?

✅ **One-way encryption** - Cannot be reversed to get plain text  
✅ **Secure** - Uses industry-standard bcrypt algorithm  
✅ **Safe** - Even if hash is exposed, password cannot be recovered  
✅ **Fast** - Verification takes ~100ms (acceptable for UI)  
✅ **Salted** - Each hash includes a unique salt for extra security  

### Changing Your Password

#### Option A: With Local Computer Access (Recommended)

**Step 1: Generate New Hash**
```bash
# Open terminal/command prompt
# Navigate to project directory
cd /path/to/MadhuPortfolio

# Run this command to generate hash for your new password
node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('YOUR_NEW_PASSWORD_HERE', 10); console.log('New Hash:', hash);"
```

**Example:**
```bash
node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('MyNewPassword2025', 10); console.log('New Hash:', hash);"
```

**Output:**
```
New Hash: $2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Step 2: Update `.env.local` File**
```
# Open .env.local file in project root
# Replace the old hash with the new one

VITE_ADMIN_PASSWORD_HASH=$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Step 3: Restart Dev Server**
```bash
# Stop the current dev server (Ctrl+C)
# Restart it
pnpm dev
```

**Step 4: Test New Password**
1. Press `Ctrl + Shift + E`
2. Enter your new password
3. If successful, you're logged in!

#### Option B: Without Local Computer (Cloud/Online)

If you don't have access to a local computer:

**Step 1: Use Online Bcrypt Generator**
1. Go to: https://bcrypt-generator.com/
2. Enter your new password in the "Password" field
3. Set "Rounds" to 10
4. Click "Generate Hash"
5. Copy the generated hash

**Step 2: Update GitHub (If Deployed)**

If your website is deployed on Vercel/Netlify:

**For Vercel:**
1. Go to Vercel Dashboard
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Find `VITE_ADMIN_PASSWORD_HASH`
5. Click the edit icon (pencil)
6. Replace with new hash
7. Click "Save"
8. Redeploy your project

**For Netlify:**
1. Go to Netlify Dashboard
2. Select your site
3. Click "Site settings" → "Build & deploy" → "Environment"
4. Click "Edit variables"
5. Find `VITE_ADMIN_PASSWORD_HASH`
6. Replace with new hash
7. Click "Save"
8. Trigger a new deploy

**Step 3: Test New Password**
1. Wait for deployment to complete
2. Visit your website
3. Press `Ctrl + Shift + E`
4. Enter your new password
5. Should work!

#### Option C: Using GitHub Codespaces (Browser-Based)

If you have GitHub Codespaces access:

1. Go to your repository: https://github.com/bhattaraimadhu56/MadhuPortfolio
2. Click "Code" → "Codespaces" → "Create codespace on main"
3. Wait for environment to load (2-3 minutes)
4. In terminal, run:
```bash
node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('YOUR_NEW_PASSWORD', 10); console.log('New Hash:', hash);"
```
5. Copy the hash
6. Edit `.env.local` file with the new hash
7. Commit and push changes
8. If deployed, redeploy your website

### Password Security Best Practices

✅ **DO:**
- Use strong passwords (12+ characters)
- Include uppercase, lowercase, numbers, and special characters
- Change password every 3-6 months
- Use different passwords for dev/production
- Keep `.env.local` file safe and never commit it
- Use bcrypt hashing (already implemented)

❌ **DON'T:**
- Share your password in emails or messages
- Use simple passwords like "admin123"
- Commit `.env.local` to GitHub
- Store plain text passwords anywhere
- Use the same password for multiple websites
- Tell anyone your password

### Password Recovery

If you forget your password:

**Option 1: Reset via Local Computer**
1. Delete `.env.local` file
2. Generate new hash with new password
3. Create new `.env.local` with new hash
4. Restart dev server

**Option 2: Reset via Deployment Platform**
1. Go to Vercel/Netlify dashboard
2. Generate new hash online
3. Update environment variable
4. Redeploy website

**Option 3: Contact Developer**
- If you're not the original developer, contact the person who set up the website
- They can reset the password for you

---

## 🏗️ Website Structure Overview

### File Organization

```
MadhuPortfolio/
├── client/
│   ├── public/
│   │   ├── data/                    ← All content files
│   │   │   ├── global_settings.json ← Website branding & settings
│   │   │   ├── home_content.json    ← Home page content
│   │   │   ├── about_content.json   ← About page content
│   │   │   ├── blog_content.json    ← Blog posts
│   │   │   ├── portfolio_content.json ← Portfolio projects
│   │   │   ├── contact_content.json ← Contact page
│   │   │   └── footer_content.json  ← Footer content
│   │   └── images/                  ← Website images
│   ├── src/
│   │   ├── components/
│   │   │   └── admin/               ← Admin panel components
│   │   │       ├── BlogEditor.tsx   ← Blog management
│   │   │       ├── PortfolioEditor.tsx ← Portfolio management
│   │   │       ├── FooterEditor.tsx ← Footer management
│   │   │       └── ...
│   │   └── pages/
│   │       ├── Home.tsx
│   │       ├── About.tsx
│   │       ├── Blog.tsx
│   │       ├── Portfolio.tsx
│   │       ├── Contact.tsx
│   │       └── AdminEditor.tsx      ← Main admin panel
│   └── ...
├── .env.local                       ← Password hash (NOT in GitHub)
├── SECURE_PASSWORD_SETUP.md         ← Password setup guide
├── ENVIRONMENT_VARIABLES_GUIDE.md   ← Environment variables guide
└── WEBSITE_MANAGEMENT_GUIDE.md      ← This file

```

### How Content is Stored

All website content is stored in **JSON files** in `client/public/data/`:

- **JSON Format**: Easy to read and edit
- **No Database**: All data is in files (simpler to manage)
- **Auto-Save**: Changes are saved to files automatically
- **Backup-Friendly**: Easy to backup and restore

### Data Flow

```
User edits content in Admin Panel
         ↓
Changes saved to JSON file
         ↓
Website reads from JSON file
         ↓
Content displayed on website
```

---

## 🎨 Global Settings & Branding

### What Can Be Changed

The `global_settings.json` file controls:
- Website title and description
- Colors (primary, secondary, accent)
- Logo and favicon
- Navigation menu
- Profile information
- Contact details
- Social media links

### How to Edit Global Settings

**Step 1: Access Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password: `M@dhuAdmin2026`
3. Click "Editor"

**Step 2: Click "Settings" Tab**
- You'll see the Settings section

**Step 3: Edit Each Field**

#### Website Metadata
| Field | Current Value | What It Does |
|-------|---------------|-------------|
| **Site Title** | "Madhu Bhattarai - Data Analyst Portfolio" | Title shown in browser tab |
| **Site Description** | "Professional portfolio showcasing..." | Description in search results |
| **Site URL** | "https://www.madhudata.com" | Your website's main URL |
| **Favicon Path** | "/images/logo_rounded.png" | Small icon in browser tab |

**How to Change:**
1. Click on the field
2. Edit the text
3. Click "Save Settings"

#### Branding Colors

| Color | Current Value | Where It's Used |
|-------|---------------|-----------------|
| **Primary Color** | #0066FF (Blue) | Main buttons, links, highlights |
| **Secondary Color** | #7C3AED (Purple) | Secondary elements, accents |
| **Accent Color** | #00D9FF (Cyan) | Special highlights |
| **Background Color** | #FFFFFF (White) | Page background |
| **Text Color** | #1F2937 (Dark Gray) | Main text |
| **Muted Text Color** | #6B7280 (Gray) | Secondary text |
| **Border Color** | #E5E7EB (Light Gray) | Borders, dividers |

**How to Change Colors:**
1. Click on the color field
2. A color picker appears
3. Select your desired color
4. Click "Save Settings"

**Color Format:**
- Use HEX codes: #RRGGBB (e.g., #FF0000 for red)
- Use RGB: rgb(255, 0, 0)
- Use color names: red, blue, green

**Popular Colors:**
```
Blues:      #0066FF, #0099FF, #00CCFF
Purples:    #7C3AED, #9333EA, #A855F7
Greens:     #10B981, #34D399, #6EE7B7
Reds:       #EF4444, #F87171, #FCA5A5
Grays:      #1F2937, #6B7280, #D1D5DB
```

#### Header Settings

| Field | Current Value | What It Does |
|-------|---------------|-------------|
| **App Name** | "Madhu Portfolio" | Name shown in header |
| **App Logo** | "/images/logo_rounded.png" | Logo image path |
| **Navigation Links** | Home, About, Portfolio, Blog, Contact | Menu items in header |
| **Theme Toggle** | Enabled | Light/Dark mode button |
| **Mobile Menu** | Enabled | Mobile hamburger menu |

**How to Change Navigation Links:**
1. Click "Edit Navigation"
2. Add/Remove/Reorder links
3. Each link needs: Label and URL
4. Click "Save"

#### Profile Information

| Field | Current Value | What It Does |
|-------|---------------|-------------|
| **Full Name** | "Madhu Bhattarai" | Your name displayed everywhere |
| **Title** | "Data Analyst \| BI Specialist" | Professional title |
| **Location** | "New Zealand" | Your location |
| **Profile Image** | "/images/profile.jpg" | Your profile photo |
| **Online Status** | true | Shows green dot |
| **Status Color** | #10B981 (Green) | Color of status indicator |

**How to Change Profile Image:**
1. Click "Upload Profile Image"
2. Select image from computer
3. Image is automatically resized
4. Click "Save"

#### Contact Information

| Field | Current Value | What It Does |
|-------|---------------|-------------|
| **Primary Email** | "info@madhudata.com" | Main email for contact |
| **Secondary Email** | "madhu.datainsights@gmail.com" | Alternative email |
| **Phone** | "022 654 1537" | Phone number |
| **GitHub URL** | "https://github.com/bhattaraimadhu" | GitHub profile link |
| **LinkedIn URL** | "https://www.linkedin.com/in/madhu..." | LinkedIn profile link |
| **Resume File** | "/madhu_cv.pdf" | CV/Resume file path |

**How to Change Contact Info:**
1. Click on each field
2. Edit the information
3. Click "Save Settings"

#### Social Media Links

| Platform | Current URL | How to Update |
|----------|-------------|---------------|
| **GitHub** | https://github.com/bhattaraimadhu | Click "Edit" and paste your GitHub URL |
| **LinkedIn** | https://www.linkedin.com/in/madhu... | Click "Edit" and paste your LinkedIn URL |
| **Email** | mailto:madhu.datainsights@gmail.com | Click "Edit" and change email address |

**How to Add New Social Link:**
1. Click "Add Social Link"
2. Select platform (GitHub, LinkedIn, Twitter, etc.)
3. Enter the URL
4. Click "Save"

### Saving Settings

After making changes:
1. Click "Save Settings" button
2. You'll see a success message
3. Changes are instantly applied to the website
4. No page reload needed

### Reverting Changes

If you make a mistake:
1. Click "Reset to Default"
2. All settings return to original values
3. You can also manually change individual fields back

---

## 🏠 Home Page Management

### What's on the Home Page

The home page includes:
1. **Banner Slider** - Rotating images with titles
2. **Hero Section** - Main headline and tagline
3. **Skills Section** - Technical skills with icons
4. **Achievements Section** - Key accomplishments
5. **Call-to-Action** - Button to contact or view portfolio

### Editing Home Page Content

**Step 1: Access Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password
3. Click "Editor"

**Step 2: Click "Home" Tab**

**Step 3: Edit Banner Slider**

The banner slider shows rotating images with titles.

**Current Banners:**
```
1. "Transforming Data into Actionable Insights"
2. "Unlock the Power of Your Data"
3. "Data-Driven Decisions for Business Growth"
4. "From Raw Data to Strategic Intelligence"
5. "Empowering Success Through Analytics"
```

**How to Edit:**
1. Find "Banner Slider" section
2. Click on a banner to edit
3. Change the title text
4. Change the image URL (or upload new image)
5. Click "Save"

**How to Add New Banner:**
1. Click "Add New Banner"
2. Enter title text
3. Upload or paste image URL
4. Click "Save"

**How to Delete Banner:**
1. Click the delete icon (trash can)
2. Confirm deletion
3. Banner is removed

**Image Requirements:**
- Format: JPG, PNG, WebP
- Size: 1920x600 pixels (recommended)
- File size: Under 500KB
- Aspect ratio: 16:9

**How to Upload Image:**
1. Click "Upload Image" button
2. Select image from computer
3. Image is automatically resized
4. Click "Save"

**Step 4: Edit Hero Section**

The hero section is the main headline area.

**Current Content:**
- **Tagline**: "Welcome to My Portfolio"
- **Heading**: "Transforming Data into Actionable Insights"
- **Subheading**: "Data Analyst | Business Intelligence Specialist"

**How to Edit:**
1. Find "Hero Section"
2. Click on each field to edit
3. Change text as desired
4. Click "Save"

**Step 5: Edit Skills Section**

The skills section shows your technical skills.

**Current Skills:**
- Python, SQL, Tableau, Power BI, Excel, R, Machine Learning, Statistics

**How to Edit Skills:**
1. Find "Skills" section
2. Click "Edit Skills"
3. Add/Remove/Reorder skills
4. Each skill needs: Name and Icon emoji
5. Click "Save"

**Popular Skill Icons:**
```
Python:           🐍
SQL:              🗄️
Tableau:          📊
Power BI:         📈
Excel:            📑
R:                📉
Machine Learning: 🤖
Statistics:       📐
Data Mining:      ⛏️
Visualization:    📊
```

**How to Add New Skill:**
1. Click "Add New Skill"
2. Enter skill name (e.g., "Tableau")
3. Enter emoji icon (e.g., "📊")
4. Click "Save"

**How to Remove Skill:**
1. Click the delete icon next to skill
2. Confirm deletion
3. Skill is removed

**Step 6: Edit Achievements Section**

The achievements section shows your key accomplishments.

**Current Achievements:**
- Certified Data Analyst
- 5+ Years Experience
- 50+ Projects Completed
- Industry Expert

**How to Edit:**
1. Find "Achievements" section
2. Click on an achievement to edit
3. Change title, description, icon
4. Click "Save"

**How to Add New Achievement:**
1. Click "Add New Achievement"
2. Enter title (e.g., "Award Winner")
3. Enter description
4. Select icon (award, star, trophy, etc.)
5. Click "Save"

**How to Delete Achievement:**
1. Click the delete icon
2. Confirm deletion
3. Achievement is removed

### Saving Home Page Changes

1. After editing each section, click "Save"
2. Changes are instantly applied
3. Visit home page to see updates
4. No page reload needed

---

## 👤 About Page Management

### What's on the About Page

The about page includes:
1. **Page Title & Subtitle** - Main heading
2. **Personal Story** - Your biography
3. **Work Experience** - Job history
4. **Education** - Degrees and certifications
5. **Certifications** - Professional certifications
6. **Skills & Expertise** - Detailed skills

### Editing About Page Content

**Step 1: Access Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password
3. Click "Editor"

**Step 2: Click "About" Tab**

**Step 3: Edit Page Title & Subtitle**

**Current Content:**
- **Title**: "About Me"
- **Subtitle**: "Passionate data analyst with a proven track record..."

**How to Edit:**
1. Click on the title field
2. Edit the text
3. Click "Save"

**Step 4: Edit Personal Story**

Your biography/personal story section.

**Current Content:**
```
"I'm a dedicated data analyst with a passion for uncovering insights 
from complex datasets. With over 5 years of experience in business 
intelligence and data visualization, I've helped numerous organizations 
make data-driven decisions that drive growth and efficiency..."
```

**How to Edit:**
1. Click on the story text area
2. Edit the content
3. Use markdown for formatting:
   - **Bold**: `**text**`
   - *Italic*: `*text*`
   - Line break: Press Enter twice
4. Click "Save"

**Step 5: Edit Work Experience**

Your job history and experience.

**Current Jobs:**
1. Data Analyst at MVP Studio (2022 - Present)
2. Data Analyst at Previous Company (2020 - 2022)
3. Junior Data Analyst at First Company (2019 - 2020)

**How to Add New Job:**
1. Click "Add Work Experience"
2. Fill in:
   - **Position**: Job title (e.g., "Senior Data Analyst")
   - **Company**: Company name
   - **Duration**: Time period (e.g., "2023 - Present")
   - **Description**: Job description
3. Click "Save"

**How to Edit Existing Job:**
1. Click on the job to edit
2. Update the information
3. Click "Save"

**How to Delete Job:**
1. Click the delete icon
2. Confirm deletion
3. Job is removed

**Step 6: Edit Education**

Your degrees and educational background.

**Current Education:**
1. Graduate Diploma in Information Technology (2016)
2. Data Analytics Certification (2020)

**How to Add Education:**
1. Click "Add Education"
2. Fill in:
   - **Degree**: Degree name (e.g., "Bachelor of Science")
   - **School**: School/University name
   - **Year**: Graduation year
   - **Details**: Additional information
3. Click "Save"

**How to Edit Education:**
1. Click on the education entry
2. Update the information
3. Click "Save"

**How to Delete Education:**
1. Click the delete icon
2. Confirm deletion
3. Entry is removed

**Step 7: Edit Certifications**

Your professional certifications and credentials.

**Current Certifications:**
- Certified Data Analyst
- Advanced Analytics Professional
- Business Intelligence Specialist

**How to Add Certification:**
1. Click "Add Certification"
2. Fill in:
   - **Name**: Certification name
   - **Issuer**: Organization that issued it
   - **Date**: Date obtained
   - **Credential ID**: Optional credential number
3. Click "Save"

**How to Edit Certification:**
1. Click on the certification
2. Update the information
3. Click "Save"

**How to Delete Certification:**
1. Click the delete icon
2. Confirm deletion
3. Certification is removed

### Saving About Page Changes

1. Click "Save" after each section
2. Changes are instantly applied
3. Visit about page to see updates

---

## 📝 Blog Management

### What's in the Blog

The blog section contains:
- Blog posts with titles, content, images
- Categories (Data Visualization, SQL, Python, etc.)
- Tags for filtering
- Author and date information
- Read time estimates

### Accessing Blog Editor

**Step 1: Open Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password: `M@dhuAdmin2026`
3. Click "Editor"

**Step 2: Click "Blog" Tab**

You'll see:
- A table with all blog posts
- "Add New Post" button at top
- View, Edit, Delete buttons for each post

### Blog Editor Interface

```
┌─────────────────────────────────────────────┐
│          BLOG EDITOR                        │
├─────────────────────────────────────────────┤
│  [Add New Post Button]                      │
├─────────────────────────────────────────────┤
│ Title | Category | Tags | Status | Actions │
├─────────────────────────────────────────────┤
│ Post 1 | Data Viz | ... | Draft | V E D   │
│ Post 2 | SQL      | ... | Pub   | V E D   │
│ Post 3 | Python   | ... | Draft | V E D   │
└─────────────────────────────────────────────┘

V = View  E = Edit  D = Delete
```

### Creating a New Blog Post

**Step 1: Click "Add New Post"**
- A form appears below the table
- All fields are 80% width for easy editing

**Step 2: Fill in Post Details**

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| **Title** | Yes | "Data Visualization Best Practices" | Main post title |
| **Slug (URL)** | Yes | "data-visualization-best-practices" | URL-friendly name (no spaces) |
| **Excerpt** | Yes | "Learn essential principles..." | Short summary (2 lines) |
| **Author** | Yes | "Madhu Bhattarai" | Your name |
| **Date** | Yes | "2024-03-15" | Publication date |
| **Category** | Yes | "Data Visualization" | Post category |
| **Read Time** | Yes | "8 min read" | Estimated reading time |
| **Status** | Yes | "Published" or "Draft" | Publication status |
| **Featured Image** | Yes | (Upload from computer) | Post cover image |
| **Content** | Yes | (Markdown text) | Full post content |

**Step 3: Upload Featured Image**

1. Click "Upload Image" button
2. Select image from your computer
3. Image preview appears
4. Recommended size: 800x400 pixels
5. File size: Under 1MB

**Image Tips:**
- Use high-quality images
- Landscape orientation (16:9 ratio)
- Relevant to post topic
- Avoid text in images

**Step 4: Write Post Content**

The content field supports **Markdown** formatting:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
***Bold and italic***

- Bullet point
- Another point
  - Nested point

1. Numbered item
2. Another item

[Link text](https://example.com)

![Image alt text](https://image-url.com/image.jpg)

> Blockquote text

`inline code`

\`\`\`python
# Code block
print("Hello World")
\`\`\`
```

**Example Post Content:**

```markdown
# Data Visualization Best Practices

Data visualization is one of the most powerful tools in a data analyst's toolkit.

## Why Visualization Matters

Humans are visual creatures. We process visual information 60,000 times faster than text.

## Key Principles

### 1. Clarity First
Your visualization should be immediately understandable.

### 2. Appropriate Chart Types
- **Bar charts** for comparing categories
- **Line charts** for trends over time
- **Scatter plots** for relationships

## Conclusion

Effective data visualization is both an art and a science.
```

**Step 5: Save Post**

1. Click "Save Post" button
2. Post is saved to blog
3. If status is "Published", it appears on blog page
4. If status is "Draft", it's hidden from public

### Viewing a Blog Post

**Step 1: Click View Button**
- The eye icon next to the post
- A preview overlay appears
- Shows how post looks to visitors

**Step 2: Review Content**
- Check title, image, content
- Verify formatting
- Check for typos

**Step 3: Close Preview**
- Click "Close" or click outside overlay
- Return to blog editor

### Editing a Blog Post

**Step 1: Click Edit Button**
- The pencil icon next to the post
- Edit form appears below table
- All current content is pre-filled

**Step 2: Make Changes**
- Edit any field you want
- Leave unchanged fields as-is
- Can change image by uploading new one

**Step 3: Save Changes**
- Click "Save Post"
- Changes are instantly applied
- Post updates on website

### Deleting a Blog Post

**Step 1: Click Delete Button**
- The trash icon next to the post
- Confirmation dialog appears

**Step 2: Confirm Deletion**
- Click "Yes, Delete"
- Post is permanently removed
- Cannot be undone (but you can recreate it)

### Blog Post Categories

Current categories:
- Data Visualization
- SQL
- Python
- Machine Learning
- Power BI
- Excel

**How to Use Categories:**
1. When creating/editing post
2. Select category from dropdown
3. Categories help organize posts
4. Visitors can filter by category

**Adding New Category:**
1. When editing post, if category doesn't exist
2. Type new category name
3. It will be created automatically

### Blog Post Tags

Tags help categorize and filter posts.

**Current Tags:**
- Tableau, Power BI, Best Practices
- SQL, Database, Performance
- Python, Pandas, Data Cleaning
- Flask, Docker, Deployment
- DAX, Data Modeling

**How to Add Tags:**
1. Click in the tags field
2. Type tag name
3. Press Enter or comma
4. Tag is added
5. Repeat for multiple tags

**How to Remove Tag:**
1. Click the X next to tag
2. Tag is removed

### Blog Post Status

Each post has a status:

| Status | Meaning | Visible to Public |
|--------|---------|------------------|
| **Published** | Post is live | ✅ Yes |
| **Draft** | Work in progress | ❌ No |
| **Archived** | Old post | ❌ No |

**How to Change Status:**
1. Click status dropdown
2. Select new status
3. Click "Save Post"
4. Status is updated

### Blog Best Practices

✅ **DO:**
- Write clear, engaging titles
- Include relevant featured image
- Use proper markdown formatting
- Add appropriate categories and tags
- Proofread before publishing
- Include code examples when relevant
- Add links to related posts
- Update old posts with new information

❌ **DON'T:**
- Use clickbait titles
- Forget to add featured image
- Write very long posts (break into sections)
- Use too many categories/tags
- Publish without proofreading
- Use outdated information
- Forget to set status to "Published"
- Delete posts without backup

### Blog Content Ideas

**Popular Blog Topics:**
1. How-to guides (SQL optimization, Python tips)
2. Tool reviews (Tableau vs Power BI)
3. Industry trends (Data analytics in 2024)
4. Case studies (Project results and learnings)
5. Best practices (Data visualization, modeling)
6. Tutorials (Step-by-step guides)
7. News and updates (Industry news)
8. Tips and tricks (Quick productivity hacks)

---

## 🎯 Portfolio Management

### What's in the Portfolio

The portfolio section showcases:
- Project title and description
- Project images
- Technologies used (tags)
- Live demo link
- GitHub repository link
- Project category

### Accessing Portfolio Editor

**Step 1: Open Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password: `M@dhuAdmin2026`
3. Click "Editor"

**Step 2: Click "Portfolio" Tab**

You'll see:
- A table with all projects
- "Add New Project" button at top
- View, Edit, Delete buttons for each project

### Portfolio Editor Interface

```
┌────────────────────────────────────────────────┐
│          PORTFOLIO EDITOR                      │
├────────────────────────────────────────────────┤
│  [Add New Project Button]                      │
├────────────────────────────────────────────────┤
│ Title | Category | Tags | Actions              │
├────────────────────────────────────────────────┤
│ Project 1 | BI | Power BI, SQL | V E D        │
│ Project 2 | ML | Python, ML | V E D           │
│ Project 3 | Web | Tableau, GA | V E D         │
└────────────────────────────────────────────────┘

V = View  E = Edit  D = Delete
```

### Creating a New Project

**Step 1: Click "Add New Project"**
- A form appears below the table
- All fields are 80% width for easy editing

**Step 2: Fill in Project Details**

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| **Title** | Yes | "Sales Performance Dashboard" | Project name |
| **Category** | Yes | "Business Intelligence" | Project type |
| **Description** | Yes | "Interactive Power BI dashboard..." | Project overview (2-3 lines) |
| **Project Image** | Yes | (Upload from computer) | Project screenshot/cover |
| **Technologies** | Yes | Power BI, SQL, Data Visualization | Tools/skills used |
| **Live Demo URL** | No | "https://example.com/dashboard" | Link to live project |
| **GitHub URL** | No | "https://github.com/user/project" | Link to source code |

**Step 3: Upload Project Image**

1. Click "Upload Image" button
2. Select image from your computer
3. Image preview appears
4. Recommended size: 800x500 pixels
5. File size: Under 2MB

**Image Tips:**
- Use project screenshot or mockup
- Landscape orientation (16:10 ratio)
- Show the actual project/dashboard
- High resolution for clarity
- Professional appearance

**Step 4: Add Technologies/Tags**

Technologies are the tools and skills used in the project.

**Current Technologies:**
- Power BI, SQL, Data Visualization
- Python, Machine Learning, Pandas
- Tableau, Google Analytics
- R, Statistics, Forecasting
- Flask, Docker, Deployment
- Excel, VBA, Automation

**How to Add Technology:**
1. Click in the technologies field
2. Type technology name
3. Press Enter or comma
4. Technology is added
5. Repeat for multiple technologies

**How to Remove Technology:**
1. Click the X next to technology
2. Technology is removed

**Step 5: Add Project Links**

**Live Demo URL:**
- Where visitors can see the project live
- Must start with https://
- Example: https://example.com/sales-dashboard

**GitHub URL:**
- Link to source code repository
- Must start with https://
- Example: https://github.com/username/project-name

**How to Get GitHub URL:**
1. Go to your GitHub repository
2. Click "Code" button (green)
3. Copy the HTTPS URL
4. Paste in GitHub URL field

**Step 6: Save Project**

1. Click "Save Project" button
2. Project is added to portfolio
3. Appears on portfolio page
4. Visitors can see it immediately

### Viewing a Project

**Step 1: Click View Button**
- The eye icon next to the project
- A preview overlay appears
- Shows how project looks to visitors

**Step 2: Review Content**
- Check title, image, description
- Verify links work
- Check technologies are correct

**Step 3: Close Preview**
- Click "Close" or click outside overlay
- Return to portfolio editor

### Editing a Project

**Step 1: Click Edit Button**
- The pencil icon next to the project
- Edit form appears below table
- All current content is pre-filled

**Step 2: Make Changes**
- Edit any field you want
- Leave unchanged fields as-is
- Can change image by uploading new one

**Step 3: Save Changes**
- Click "Save Project"
- Changes are instantly applied
- Project updates on website

### Deleting a Project

**Step 1: Click Delete Button**
- The trash icon next to the project
- Confirmation dialog appears

**Step 2: Confirm Deletion**
- Click "Yes, Delete"
- Project is permanently removed
- Cannot be undone

### Portfolio Categories

Current categories:
- Business Intelligence
- Predictive Analytics
- Web Analytics
- Healthcare Analytics
- Text Analytics

**How to Use Categories:**
1. When creating/editing project
2. Select category from dropdown
3. Categories help organize projects
4. Visitors can filter by category

**Adding New Category:**
1. When editing project, if category doesn't exist
2. Type new category name
3. It will be created automatically

### Portfolio Best Practices

✅ **DO:**
- Use clear, descriptive project titles
- Include high-quality project screenshots
- Write detailed descriptions
- Add relevant technologies
- Include working links (demo and GitHub)
- Show actual results/metrics if possible
- Update portfolio regularly
- Organize by category

❌ **DON'T:**
- Use placeholder/generic images
- Write vague descriptions
- Forget to add technologies
- Include broken links
- Add projects you're not proud of
- Use outdated projects
- Forget to set category
- Leave fields empty

### Portfolio Content Ideas

**Project Types to Showcase:**
1. **Dashboards** - Power BI, Tableau, Looker
2. **Predictive Models** - Machine learning projects
3. **Data Analysis** - Insights and findings
4. **Visualizations** - Interactive charts
5. **Automation** - Scripts and tools
6. **Case Studies** - Before/after results
7. **Open Source** - GitHub contributions
8. **Research** - Academic or technical papers

---

## 📧 Contact Page Management

### What's on the Contact Page

The contact page includes:
- Page title and subtitle
- Contact form with fields
- Form submission handling
- Success/error messages

### Editing Contact Page

**Step 1: Open Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password: `M@dhuAdmin2026`
3. Click "Editor"

**Step 2: Click "Contact" Tab**

### Contact Page Fields

| Field | Current Value | Editable |
|-------|---------------|----------|
| **Page Title** | "Get in Touch" | Yes |
| **Page Subtitle** | "I'd love to hear from you..." | Yes |
| **Form Title** | "Send Me a Message" | Yes |
| **Form Description** | "Fill out the form below..." | Yes |
| **Submit Button Text** | "Send Message" | Yes |
| **Success Message** | "Thank you for your message!..." | Yes |
| **Error Message** | "There was an error..." | Yes |

### Editing Contact Page Text

**Step 1: Edit Page Title**
1. Click on the title field
2. Edit the text
3. Click "Save"

**Step 2: Edit Page Subtitle**
1. Click on the subtitle field
2. Edit the text
3. Click "Save"

**Step 3: Edit Form Fields**

The form has these fields:
- **Name** - Full name (required)
- **Email** - Email address (required)
- **Subject** - Message subject (required)
- **Message** - Message content (required)

**How to Edit Form Field:**
1. Click on the field to edit
2. Change label, placeholder, or required status
3. Click "Save"

**How to Add New Form Field:**
1. Click "Add Form Field"
2. Enter field details:
   - **Name**: Field identifier (e.g., "phone")
   - **Label**: Display label (e.g., "Phone Number")
   - **Type**: text, email, textarea, number, etc.
   - **Placeholder**: Example text shown in field
   - **Required**: Yes/No
3. Click "Save"

**How to Remove Form Field:**
1. Click the delete icon next to field
2. Confirm deletion
3. Field is removed from form

### Contact Form Submission

**How the Form Works:**
1. Visitor fills out contact form
2. Clicks "Send Message"
3. Form data is validated
4. If valid, message is sent to your email
5. Visitor sees success message

**Where Messages Go:**
- Messages are sent to: `info@madhudata.com`
- Also saved in: `client/public/data/contact_messages.json`

**How to View Messages:**
1. Check your email inbox
2. Or access admin panel → Contact tab
3. See all submitted messages

**Email Notification:**
When someone submits the form, you receive an email with:
- Visitor's name
- Visitor's email
- Subject of message
- Full message content
- Submission date and time

### Customizing Contact Messages

**Edit Success Message:**
1. Click on success message field
2. Edit the text shown after form submission
3. Click "Save"

**Example Success Messages:**
- "Thank you for your message! I'll get back to you soon."
- "Your message has been sent successfully!"
- "Thanks for reaching out. I'll respond within 24 hours."

**Edit Error Message:**
1. Click on error message field
2. Edit the text shown if form submission fails
3. Click "Save"

**Example Error Messages:**
- "There was an error sending your message. Please try again."
- "Something went wrong. Please check your information and try again."
- "Failed to send message. Please contact me directly."

### Contact Page Best Practices

✅ **DO:**
- Keep form simple (fewer fields = more submissions)
- Make form fields clear and helpful
- Include helpful placeholder text
- Respond to messages quickly
- Keep contact information up to date
- Test form regularly

❌ **DON'T:**
- Ask for too many fields
- Use vague field labels
- Make optional fields required
- Change email address without updating
- Ignore submitted messages
- Use broken email address

---

## 🦶 Footer Management

### What's in the Footer

The footer includes:
- Company description
- Quick links (navigation)
- Copyright information
- Social media links

### Editing Footer Content

**Step 1: Open Admin Panel**
1. Press `Ctrl + Shift + E`
2. Enter password: `M@dhuAdmin2026`
3. Click "Editor"

**Step 2: Click "Footer" Tab**

You'll see a table with footer sections.

### Footer Sections

| Section | Current Content | Editable |
|---------|-----------------|----------|
| **Description** | "Data Analyst \| BI Specialist" | Yes |
| **Quick Links** | Home, About, Portfolio, Blog, Contact | Yes |
| **Copyright** | "© 2025 Madhu Bhattarai. All rights reserved." | Yes |

### Editing Footer Description

**Step 1: Click Edit**
1. Find the description section
2. Click "Edit"
3. Edit the text
4. Click "Save"

**Current Description:**
```
"Data Analyst | BI Specialist"
```

**Example Descriptions:**
- "Transforming data into actionable insights"
- "Data-driven decision making for business growth"
- "Professional data analytics and business intelligence"

### Editing Quick Links

The quick links section shows navigation links in the footer.

**Current Links:**
- Home
- About
- Portfolio
- Blog
- Contact

**How to Edit Link:**
1. Click on the link to edit
2. Change the label or URL
3. Click "Save"

**How to Add New Link:**
1. Click "Add Link"
2. Enter:
   - **Label**: Link text (e.g., "Services")
   - **URL**: Link destination (e.g., "/services")
3. Click "Save"

**How to Remove Link:**
1. Click the delete icon next to link
2. Confirm deletion
3. Link is removed

**Link Format:**
- Internal links: `/about`, `/blog`, `/portfolio`
- External links: `https://example.com`
- Email: `mailto:email@example.com`

### Editing Copyright Information

**Step 1: Click Edit**
1. Find the copyright section
2. Click "Edit"
3. Edit the text
4. Click "Save"

**Current Copyright:**
```
"© 2025 Madhu Bhattarai. All rights reserved."
```

**How to Update Year:**
1. Change year from 2025 to current year
2. Click "Save"

**Example Copyright Texts:**
- "© 2025 Madhu Bhattarai. All rights reserved."
- "© 2025 Madhu Portfolio. All rights reserved."
- "© 2025 Madhu. Powered by Data Analytics."

### Adding Footer Sections

**Step 1: Click "Add Section"**
1. Enter section title (e.g., "Resources")
2. Add links to the section
3. Click "Save"

**Example Footer Sections:**
- **Resources** - Links to tools, guides, tutorials
- **Services** - Links to service pages
- **Legal** - Links to privacy policy, terms
- **Social** - Social media links

### Footer Best Practices

✅ **DO:**
- Keep footer clean and organized
- Include important links
- Update copyright year annually
- Include contact information
- Add social media links
- Make footer mobile-friendly

❌ **DON'T:**
- Overcrowd footer with too many links
- Use outdated copyright year
- Include broken links
- Make footer too tall
- Use small, hard-to-read text
- Forget to update information

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Can't Access Admin Panel

**Symptom:** Pressing `Ctrl+Shift+E` doesn't open password dialog

**Solutions:**

**Option A: Try Alternative Keyboard Shortcut**
1. Open browser console (F12)
2. Go to Console tab
3. Type: `window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true, key: 'E' }))`
4. Press Enter
5. Password dialog should appear

**Option B: Use Browser Storage Method**
1. Open browser console (F12)
2. Go to Console tab
3. Type: `localStorage.setItem('adminMode', 'true')`
4. Press Enter
5. Refresh the page
6. "Editor" button should appear

**Option C: Check Browser Compatibility**
- Keyboard shortcuts work best in Chrome, Firefox, Edge
- May not work in Safari (use Option B instead)
- Try different browser if issue persists

#### Issue 2: Password Not Working

**Symptom:** Password dialog appears but password is rejected

**Solutions:**

**Check Password:**
- Current password: `M@dhuAdmin2026`
- Make sure Caps Lock is off
- Paste password instead of typing (to avoid typos)
- Check for extra spaces before/after password

**If Password Still Doesn't Work:**
1. Check `.env.local` file exists
2. Verify hash is correct: `$2b$10$7K2HU/TpR/ZbjTyO0W.52.f0VvOU.5/A9lhAb.xPaOoTq8vXGCNTS`
3. Restart dev server: `pnpm dev`
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try again

**If You Changed Password:**
1. Make sure new hash is correct
2. Verify `.env.local` was saved
3. Restart dev server
4. Try new password

#### Issue 3: Changes Not Saving

**Symptom:** Edit content but changes don't appear on website

**Solutions:**

**Check Save Button:**
1. Make sure you clicked "Save" button
2. Look for success message
3. Wait 2-3 seconds for save to complete

**Refresh Browser:**
1. Press F5 or Ctrl+R to refresh
2. Check if changes appear
3. Clear cache if needed (Ctrl+Shift+Delete)

**Check JSON Files:**
1. Open `client/public/data/` folder
2. Check if JSON files were updated
3. Look at file modification time

**Restart Dev Server:**
1. Stop dev server (Ctrl+C)
2. Run: `pnpm dev`
3. Wait for server to start
4. Try editing again

#### Issue 4: Images Not Uploading

**Symptom:** Upload image button doesn't work or image doesn't appear

**Solutions:**

**Check Image Format:**
- Supported formats: JPG, PNG, WebP
- File size: Under 2MB
- Resolution: At least 400x300 pixels

**Try Different Image:**
1. Use a different image file
2. Make sure file is not corrupted
3. Try converting to JPG if PNG doesn't work

**Check Browser:**
1. Try different browser (Chrome, Firefox, Edge)
2. Clear browser cache
3. Disable browser extensions that might block uploads

**Check File Permissions:**
1. Make sure image file is readable
2. Not locked by another application
3. Try copying file to desktop first

#### Issue 5: Blog Post Not Appearing

**Symptom:** Created blog post but it doesn't show on blog page

**Solutions:**

**Check Post Status:**
1. Open blog editor
2. Check post status is "Published" (not "Draft")
3. If "Draft", change to "Published"
4. Click "Save Post"

**Check Post Date:**
1. Make sure post date is not in the future
2. Use today's date or earlier
3. Save and refresh

**Check Blog Page:**
1. Visit blog page
2. Scroll down to see all posts
3. Check if post appears at top (newest first)
4. Use browser search (Ctrl+F) to find post title

**Refresh Cache:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Close and reopen browser

#### Issue 6: Portfolio Project Not Showing

**Symptom:** Created portfolio project but it doesn't appear

**Solutions:**

**Check Project Details:**
1. Open portfolio editor
2. Verify all required fields are filled
3. Check project has image
4. Check project has category

**Verify Project Saved:**
1. Close and reopen portfolio editor
2. Check if project appears in table
3. If not in table, it wasn't saved

**Check Portfolio Page:**
1. Visit portfolio page
2. Scroll down to see all projects
3. Use browser search (Ctrl+F) to find project title

**Refresh Browser:**
1. Hard refresh (Ctrl+Shift+R)
2. Clear cache
3. Close and reopen browser

#### Issue 7: Styling/Colors Not Changing

**Symptom:** Changed colors in settings but website doesn't update

**Solutions:**

**Refresh Browser:**
1. Hard refresh (Ctrl+Shift+R)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Close and reopen browser

**Check Color Format:**
1. Use HEX format: #RRGGBB (e.g., #FF0000)
2. Make sure # symbol is included
3. Use 6-digit hex codes

**Restart Dev Server:**
1. Stop server (Ctrl+C)
2. Run: `pnpm dev`
3. Wait for server to start
4. Check colors in browser

**Check Theme:**
1. If using dark mode, colors might look different
2. Try switching to light mode
3. Check colors in both themes

#### Issue 8: Form Not Sending Messages

**Symptom:** Contact form appears but messages don't send

**Solutions:**

**Check Form Fields:**
1. Make sure all required fields are filled
2. Email field must be valid email format
3. Message field must not be empty

**Check Email Settings:**
1. Verify email address in global settings
2. Make sure email is correct
3. Check spam folder for test messages

**Test Form:**
1. Fill out form with test data
2. Click "Send Message"
3. Check if success message appears
4. Check email inbox

**Check Browser Console:**
1. Open browser console (F12)
2. Look for error messages
3. Check network tab for failed requests

#### Issue 9: Admin Panel Layout Broken

**Symptom:** Admin panel looks messed up or text is cut off

**Solutions:**

**Resize Browser Window:**
1. Make browser window larger
2. Try full screen (F11)
3. Adjust zoom level (Ctrl + or Ctrl -)

**Clear Browser Cache:**
1. Press Ctrl+Shift+Delete
2. Select "All time"
3. Check "Cookies and other site data"
4. Click "Clear data"

**Try Different Browser:**
1. Try Chrome, Firefox, or Edge
2. See if issue persists
3. Report if problem in all browsers

**Disable Extensions:**
1. Disable browser extensions
2. Try admin panel again
3. Enable extensions one by one to find culprit

#### Issue 10: Slow Performance

**Symptom:** Admin panel is slow or laggy

**Solutions:**

**Check Internet Connection:**
1. Test internet speed
2. Try different network
3. Restart router

**Close Other Tabs:**
1. Close unnecessary browser tabs
2. Close other applications
3. Free up system memory

**Clear Browser Cache:**
1. Press Ctrl+Shift+Delete
2. Clear all cache
3. Restart browser

**Restart Dev Server:**
1. Stop server (Ctrl+C)
2. Run: `pnpm dev`
3. Wait for server to fully start
4. Try again

**Check Image Sizes:**
1. Large images slow down uploads
2. Compress images before uploading
3. Use tools like TinyPNG or ImageOptim

---

## ❓ FAQ

### General Questions

**Q: How often should I backup my website?**
A: Backup your website weekly. Download JSON files from `client/public/data/` folder and save locally.

**Q: Can multiple people edit the website at the same time?**
A: Not recommended. Only one person should edit at a time to avoid conflicts. If multiple people need access, use version control (Git).

**Q: How do I restore a deleted post/project?**
A: If you have a backup, restore from backup. Otherwise, you'll need to recreate it. Always backup before making major changes.

**Q: Can I schedule posts to publish later?**
A: Currently, no. Posts publish immediately when you set status to "Published". You can create as "Draft" and publish later manually.

**Q: How do I change the website domain?**
A: Update `siteUrl` in global settings. This changes the URL shown in metadata and social sharing.

### Password Questions

**Q: I forgot my password. What do I do?**
A: See "Password Recovery" section in Password Management. You'll need to generate a new hash.

**Q: Can I have multiple passwords?**
A: Currently, only one password is supported. All admins use the same password.

**Q: How often should I change my password?**
A: Change password every 3-6 months for security. More frequently if you suspect compromise.

**Q: Is my password stored securely?**
A: Yes. Password is hashed with bcrypt (one-way encryption). Even if hash is exposed, password cannot be recovered.

### Content Questions

**Q: What's the maximum blog post length?**
A: No limit. Write as long as needed. Very long posts (5000+ words) are fine.

**Q: Can I have categories within categories?**
A: Currently, no. Only one level of categories is supported.

**Q: Can I schedule content to publish later?**
A: Not automatically. You can create as "Draft" and manually publish later.

**Q: How do I add comments to blog posts?**
A: Comments are not currently supported. Consider adding a third-party service like Disqus.

**Q: Can I have different authors for different posts?**
A: Yes. Each blog post has an author field. You can change it per post.

### Image Questions

**Q: What image sizes should I use?**
A: 
- Blog featured image: 800x400 pixels
- Portfolio project: 800x500 pixels
- Banner: 1920x600 pixels
- Profile image: 400x400 pixels

**Q: Can I use images from URLs instead of uploading?**
A: Yes. Paste image URL directly instead of uploading. But uploading is more reliable.

**Q: How do I optimize images for web?**
A: Use tools like:
- TinyPNG (tinypng.com) - Compress PNG/JPG
- ImageOptim (imageoptim.com) - Batch optimization
- Squoosh (squoosh.app) - Online compression

**Q: Can I use animated GIFs?**
A: Yes. Upload GIF file like any other image. Works in all sections.

### Technical Questions

**Q: Where is website data stored?**
A: In JSON files in `client/public/data/` folder. No database is used.

**Q: Can I export my website data?**
A: Yes. Download JSON files from `client/public/data/` folder. You can also use "Download JSON" button in admin panel.

**Q: How do I backup my website?**
A: Download all files from `client/public/data/` folder and save locally. Or use Git to commit changes.

**Q: Can I use this website on my own server?**
A: Yes. This is open-source. You can deploy to any hosting platform (Vercel, Netlify, etc.).

**Q: How do I add new features to the website?**
A: Contact the developer or modify React components in `client/src/` folder.

### Deployment Questions

**Q: How do I deploy the website?**
A: See "Deployment" section in ENVIRONMENT_VARIABLES_GUIDE.md. Recommended platforms: Vercel, Netlify.

**Q: Will my changes be lost if I redeploy?**
A: No. Your data is in JSON files. As long as you keep the files, data persists.

**Q: Can I use a custom domain?**
A: Yes. Most hosting platforms (Vercel, Netlify) support custom domains.

**Q: How do I set up SSL/HTTPS?**
A: Most hosting platforms provide free SSL certificates. It's usually automatic.

### Troubleshooting Questions

**Q: Admin panel won't load. What do I do?**
A: See "Troubleshooting" section above. Try clearing cache, restarting browser, or using alternative access method.

**Q: Changes aren't saving. What's wrong?**
A: Make sure you clicked "Save" button. Check browser console for errors. Restart dev server.

**Q: Website is slow. How do I fix it?**
A: Optimize images, clear cache, check internet connection, close other tabs/applications.

**Q: Images aren't uploading. What should I do?**
A: Check image format (JPG/PNG), file size (under 2MB), and try different browser.

---

## 📞 Support & Contact

### Getting Help

If you encounter issues not covered in this guide:

1. **Check Troubleshooting Section** - Most common issues are documented
2. **Check FAQ** - Common questions and answers
3. **Review Documentation** - Read relevant sections again
4. **Check Browser Console** - Look for error messages (F12)
5. **Try Different Browser** - Issue might be browser-specific

### Reporting Issues

If you find a bug or issue:

1. **Document the issue** - Write down what happened
2. **Include screenshots** - Visual evidence helps
3. **List steps to reproduce** - How to repeat the issue
4. **Check browser console** - Include any error messages
5. **Report to developer** - Contact the person who set up the website

### Feedback & Suggestions

Have ideas for improvements?

1. **Document your suggestion** - Be specific about what you want
2. **Explain the benefit** - Why would this be helpful?
3. **Provide examples** - Show how it would work
4. **Contact developer** - Share your feedback

---

## 📚 Additional Resources

### Useful Tools

- **Markdown Editor**: https://markdown-it.github.io/
- **Color Picker**: https://color-picker.com/
- **Image Compressor**: https://tinypng.com/
- **Bcrypt Generator**: https://bcrypt-generator.com/
- **Icon Finder**: https://www.iconfinder.com/

### Documentation Links

- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Markdown Guide**: https://www.markdownguide.org/

### Learning Resources

- **Web Development**: https://www.freecodecamp.org/
- **Data Analytics**: https://www.coursera.org/
- **Git & GitHub**: https://github.com/skills/

---

## 📝 Document Information

| Item | Value |
|------|-------|
| **Document Title** | Website Management & Editing Guide |
| **Version** | 1.0 |
| **Last Updated** | December 2024 |
| **Website** | Madhu Bhattarai - Data Analyst Portfolio |
| **Admin Password** | M@dhuAdmin2026 (bcrypt hashed) |
| **Repository** | https://github.com/bhattaraimadhu56/MadhuPortfolio |

---

## 🎓 Training Checklist

Use this checklist to track your learning:

- [ ] Understand how to access admin panel
- [ ] Know how to enter password
- [ ] Can edit global settings
- [ ] Can manage home page content
- [ ] Can manage about page content
- [ ] Can create/edit/delete blog posts
- [ ] Can create/edit/delete portfolio projects
- [ ] Can manage contact page
- [ ] Can manage footer
- [ ] Know how to change password
- [ ] Understand troubleshooting steps
- [ ] Know where to find help

---

## 🔒 Security Reminders

**IMPORTANT:**
- ✅ Never share your password
- ✅ Never commit `.env.local` to GitHub
- ✅ Change password every 3-6 months
- ✅ Use strong, unique passwords
- ✅ Backup your data regularly
- ✅ Keep browser and OS updated
- ✅ Use HTTPS for all connections
- ✅ Enable two-factor authentication if available

---

**End of Document**

For questions or updates, contact the website developer.

Last Updated: December 2024
