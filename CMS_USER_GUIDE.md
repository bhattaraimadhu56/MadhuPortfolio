# Headless Admin CMS - User Guide

## Overview

This portfolio website now includes a powerful **Headless Admin CMS** that allows you to edit all content directly through a user-friendly web interface. The CMS provides full CRUD (Create, Read, Update, Delete) operations for all content sections including blog posts, portfolio projects, and site settings.

## Accessing the Admin CMS

### Step 1: Activate Admin Mode

1. Navigate to your portfolio website
2. Press **Ctrl + Shift + E** on your keyboard
3. A password dialog will appear

### Step 2: Login

- **Password**: `madhuadmin2025`
- Click the "Authenticate" button
- You will see an "Admin Mode" indicator at the bottom of the page

### Step 3: Open the Editor

- Click the "Editor" button in the admin indicator
- You will be redirected to the Content Management System

## CMS Features

### 1. Home Page Editor

**Features:**
- Banner carousel settings (auto-scroll interval, profile position)
- Multiple banner slides with images and titles
- Hero section (tagline, heading, subheading)
- Skills section with custom skills
- Achievements section with icons and descriptions

**Enhanced Areas:**
- All text areas have been enlarged for comfortable editing
- Easy add/remove functionality for dynamic content

### 2. About Page Editor

**Features:**
- Page title and subtitle (4 rows)
- Personal story content (12 rows for extensive writing)
- Work experience entries with descriptions (6 rows each)
- Education entries
- Skills and certifications

**Enhanced Areas:**
- Personal story textarea: 12 rows for detailed biography
- Work experience descriptions: 6 rows per entry
- Page subtitle: 4 rows

### 3. Portfolio Editor

**Features:**
- Full CRUD operations for portfolio projects
- Large description textarea (8 rows)
- Technology tags management
- Project links (live demo, GitHub repository)
- Image upload support
- Project status (completed, in-progress, planned)

**Enhanced Areas:**
- Project description: 8 rows for detailed project information
- Rich editing experience with proper spacing

### 4. Blog Editor

**Features:**
- **Rich Text Markdown Editor** with live preview (600px height)
- Full CRUD operations (Create, Read, Update, Delete)
- Slug field for SEO-friendly URLs
- Draft/Published status toggle
- Author, date, and read time fields
- Category and tags management
- SEO fields (meta title, meta description, keywords)
- Featured image support

**Enhanced Areas:**
- Content editor: 600px height markdown editor with preview
- Excerpt: 3 rows
- Meta description: 2 rows
- Large dialog for comfortable blog writing

**How to Use:**
1. Click "Add Post" to create a new blog post
2. Fill in all required fields (title, slug, excerpt, content)
3. Use the markdown editor for rich text formatting
4. Add tags by typing and pressing Enter
5. Set SEO metadata for better search engine visibility
6. Choose Draft or Published status
7. Click "Save" to add the post to your blog

### 5. Contact Page Editor

**Features:**
- Page title and subtitle (5 rows)
- Contact form settings
- Form description (5 rows)
- Success and error messages
- Submit button text customization

**Enhanced Areas:**
- Page subtitle: 5 rows
- Form description: 5 rows for detailed instructions

### 6. Footer Editor

**Features:**
- Footer description (4 rows)
- Multiple footer sections with links
- Copyright and credits text
- Easy add/remove functionality for links

**Enhanced Areas:**
- Footer description: 4 rows for company/personal information

### 7. Global Settings Editor

**Tabs:**
- **Metadata**: Site title, description (6 rows), URL, favicon
- **Branding**: Primary, secondary, accent colors, font families
- **Header**: App name, logo, navigation links
- **Profile**: Full name, title, location, profile image, contact info
- **Social**: Social media links with icons

**Enhanced Areas:**
- Site description: 6 rows for comprehensive SEO description

## Saving Your Changes

### Important: Manual Save Process

The CMS uses a **download-based workflow** for security and version control:

1. **Make Your Edits**: Use the forms to edit content
2. **Download JSON**: Click the "Download JSON" button for the section you edited
3. **Replace File**: 
   - Locate the downloaded JSON file in your Downloads folder
   - Copy it to the appropriate location in `client/public/data/`
   - File names: `home_content.json`, `about_content.json`, `portfolio_content.json`, `blog_content.json`, `contact_content.json`, `footer_content.json`, `global_settings.json`
4. **Commit to Git**:
   ```bash
   git add client/public/data/
   git commit -m "Update content via CMS"
   git push origin main
   ```
5. **Auto-Deploy**: GitHub Actions will automatically deploy your changes

### Reset Changes

- Click the "Reset" button to discard all unsaved changes
- This will restore the content to its original state

## Markdown Editor Guide (Blog Posts)

The blog editor includes a powerful markdown editor with live preview. Here are some common markdown syntax examples:

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
```

### Lists
```markdown
- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2
```

### Links and Images
```markdown
[Link text](https://example.com)
![Image alt text](https://example.com/image.jpg)
```

### Code
```markdown
`inline code`

\`\`\`python
# Code block
def hello_world():
    print("Hello, World!")
\`\`\`
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

## Image Management

### Current Implementation

The CMS includes an `ImageUploader` component that supports:
- Direct URL input for images
- Image preview functionality
- File upload interface (requires backend integration)

### Using Images

**For Blog Posts:**
1. Use the "Featured Image" field
2. Enter a direct URL to an image (e.g., from Unsplash, Cloudinary, or your own hosting)
3. Example: `https://images.unsplash.com/photo-xxxxx?w=800&h=400&fit=crop`

**For Portfolio Projects:**
1. Use the "Image Path" field
2. Enter a relative path (e.g., `/images/projects/project1.jpg`)
3. Or use a direct URL

**For Banner Slides:**
1. Enter the image path in the "Image Path" field
2. Use relative paths for local images
3. Example: `/MadhuPortfolio/images/banners/banner_01.jpg`

### Recommended Image Hosting

For external images, consider using:
- **Unsplash** (free stock photos): https://unsplash.com
- **Cloudinary** (image hosting with CDN): https://cloudinary.com
- **ImgBB** (free image hosting): https://imgbb.com
- **GitHub** (store images in your repository)

## Tips and Best Practices

### Content Writing

1. **Blog Posts**: Write in markdown for rich formatting
2. **SEO**: Always fill in meta titles and descriptions
3. **Slugs**: Use lowercase, hyphen-separated words (e.g., `my-first-blog-post`)
4. **Images**: Use high-quality images with appropriate dimensions
5. **Tags**: Use relevant tags for better content organization

### Performance

1. **Image Optimization**: Compress images before uploading
2. **Content Length**: Keep excerpts concise (150-200 characters)
3. **Load Time**: Use CDN-hosted images when possible

### Security

1. **Password**: Change the default admin password in `useAdminMode.tsx`
2. **Access Control**: Admin mode is session-based and requires re-authentication after browser restart
3. **Version Control**: Always commit changes to Git for backup

## Troubleshooting

### Issue: Changes Not Showing

**Solution:**
1. Ensure you downloaded the JSON file
2. Verify the file was placed in the correct directory
3. Clear browser cache and reload the page
4. Check browser console for errors

### Issue: Admin Mode Not Activating

**Solution:**
1. Press Ctrl+Shift+E again
2. Check if password is correct: `madhuadmin2025`
3. Try refreshing the page
4. Check browser console for JavaScript errors

### Issue: Editor Not Loading

**Solution:**
1. Check browser console for errors
2. Ensure all dependencies are installed: `pnpm install`
3. Rebuild the project: `pnpm build`
4. Restart the development server: `pnpm dev`

### Issue: Markdown Preview Not Working

**Solution:**
1. Ensure `react-markdown-editor-lite` is installed
2. Check if `marked` package is available
3. Clear browser cache
4. Restart the development server

## Keyboard Shortcuts

- **Ctrl + Shift + E**: Toggle admin mode
- **Ctrl + S**: Save (in some editors)
- **Esc**: Close dialogs

## Future Enhancements

Planned features for future versions:

1. **Direct File Upload**: Backend API for image uploads
2. **Auto-Save**: Automatic saving to prevent data loss
3. **Version History**: Track content changes over time
4. **Media Library**: Centralized image management
5. **Preview Mode**: See changes before publishing
6. **Bulk Operations**: Edit multiple items at once
7. **Search and Filter**: Find content quickly
8. **Role-Based Access**: Multiple admin users with different permissions

## Support

For issues or questions:
1. Check this user guide
2. Review the `ADMIN_CMS_README.md` file
3. Check the `IMPLEMENTATION_SUMMARY.md` file
4. Contact the developer

## Changelog

### Version 2.0 (Current)

**Enhancements:**
- ✅ Rich text markdown editor for blog posts (600px height)
- ✅ Enlarged text areas across all editors
- ✅ Full CRUD operations for blog and portfolio
- ✅ Image uploader component
- ✅ SEO fields for blog posts
- ✅ Draft/Published status for blog posts
- ✅ Tag management system
- ✅ Enhanced user experience with larger editing areas

**Specific Improvements:**
- About Editor: Personal story (12 rows), work descriptions (6 rows)
- Blog Editor: Markdown editor (600px), excerpt (3 rows)
- Portfolio Editor: Description (8 rows)
- Contact Editor: Subtitle and description (5 rows each)
- Footer Editor: Description (4 rows)
- Global Settings: Site description (6 rows)

### Version 1.0 (Initial)

- Basic CRUD operations
- JSON-based content management
- Download workflow
- Admin authentication

---

**Last Updated**: December 2024
**Version**: 2.0
**Maintained By**: Madhu Bhattarai Portfolio Team
