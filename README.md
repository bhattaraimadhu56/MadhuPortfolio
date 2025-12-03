# Data Analyst Portfolio & Blog

A modern, colorful, and professional portfolio website for data analysts to showcase their skills, projects, and blog posts. Built with React, Tailwind CSS, and integrated with Netlify CMS for easy content management.

## Features

- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Modern UI**: Vibrant color scheme with smooth animations and transitions
- **Dark/Light Mode**: Built-in theme switcher for user preference
- **CMS Integration**: Netlify CMS for managing blog posts and projects without coding
- **GitHub Pages Compatible**: Ready to deploy on GitHub Pages with custom domain support
- **Contact Form**: Integrated with Formspree for email notifications
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized assets and code splitting for performance


## Project Structure

```
data-analyst-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for deployment
├── client/
│   ├── public/
│   │   ├
│   │   ├── images/
│   │   │   └── uploads/        # CMS uploaded images
│   │   └── resume.pdf          # Your resume file
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx        # Home page
│   │   │   ├── About.tsx       # About page
│   │   │   ├── Portfolio.tsx   # Portfolio/Projects page
│   │   │   ├── Blog.tsx        # Blog listing page
│   │   │   ├── BlogPost.tsx    # Individual blog post page
│   │   │   └── Contact.tsx     # Contact page
│   │   ├── App.tsx             # Main app component with routes
│   │   ├── index.css           # Global styles and theme
│   │   └── main.tsx            # App entry point
│   └── index.html              # HTML template
├── content/
│   ├── blog/                   # Blog post markdown files
│   ├── projects/               # Project markdown files
│   ├── pages/                  # Page content
│   └── settings/               # Site settings
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 
- Git
- GitHub account

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/bhattaraimadhu56/MadhuPortfolio.git
cd MadhuPortfolio
```

2. **Install dependencies**

```bash
pnpm install

```

3. **Start the development server**

```bash
pnpm dev

```

4. **Open your browser**

Navigate to `http://localhost:3000` 