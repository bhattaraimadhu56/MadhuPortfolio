/**
 * Configuration Loader
 * Loads settings from JSON files and applies them to the document
 * This allows dynamic configuration without code changes
 * 
 * JSON Files Structure:
 * - /data/global_settings.json: Global site settings, branding, contact info
 * - /data/home_content.json: Home page content
 * - /data/about_content.json: About page content
 * - /data/portfolio_content.json: Portfolio page content
 * - /data/blog_content.json: Blog page content
 * - /data/contact_content.json: Contact page content
 * - /data/footer_content.json: Footer content
 */

import { resolvePathsInObject, resolveAssetPath } from './pathUtils';

interface Settings {
  metadata: {
    siteTitle: string;
    siteDescription: string;
    siteUrl: string;
    faviconPath: string;
    appleTouchIconPath: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    mutedTextColor: string;
    borderColor: string;
    fontFamily: string;
    headingFontFamily: string;
  };
  header: any;
  profile: any;
  contact_info: any;
  [key: string]: any;
}

/**
 * Setup analytics if enabled
 * Dynamically loads analytics script
 */
/*
export function setupAnalytics(settings: Settings): void {
  if (!settings.analytics?.enabled) return;

  const { analytics } = settings;

  if (analytics.provider === 'umami' && analytics.endpointUrl && analytics.websiteId) {
    const script = document.createElement('script');
    script.defer = true;
    script.src = `${analytics.endpointUrl}/umami`;
    script.setAttribute('data-website-id', analytics.websiteId);
    document.body.appendChild(script);
  }
}
*/

/**
 * Load global settings from JSON file
 */
export async function loadGlobalSettings(): Promise<Settings> {
  try {
   
    // Before (Incorrect on sub-path)
//const response = await fetch('/data/global_settings.json');

// After (Correct)
const response = await fetch(`${import.meta.env.BASE_URL}data/global_settings.json`);

    if (!response.ok) {
      throw new Error('Failed to load global settings');
    }
    const data = await response.json();
    // Resolve all asset paths in the settings
    return resolvePathsInObject(data);
  } catch (error) {
    console.error('Error loading global settings:', error);
    return {} as Settings;
  }
}

/**
 * Load page-specific content from JSON file
 */
export async function loadPageContent(pageName: string): Promise<any> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/${pageName}_content.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${pageName} content`);
    }
    const data = await response.json();
    // Resolve all asset paths in the content
    return resolvePathsInObject(data);
  } catch (error) {
    console.error(`Error loading ${pageName} content:`, error);
    return {};
  }
}

/**
 * Load all page contents
 */
export async function loadAllPageContents(): Promise<{
  home: any;
  about: any;
  portfolio: any;
  blog: any;
  contact: any;
  footer: any;
}> {
  const [home, about, portfolio, blog, contact, footer] = await Promise.all([
    loadPageContent('home'),
    loadPageContent('about'),
    loadPageContent('portfolio'),
    loadPageContent('blog'),
    loadPageContent('contact'),
    loadPageContent('footer')
  ]);

  return { home, about, portfolio, blog, contact, footer };
}

/**
 * Apply metadata to document head
 * Updates page title, favicon, and meta tags
 */
export function applyMetadata(settings: Settings): void {
  if (!settings.metadata) return;

  const { metadata } = settings;

  // Update page title
  if (metadata.siteTitle) {
    document.title = metadata.siteTitle;
  }

  // Update favicon
  if (metadata.faviconPath) {
    const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (faviconLink) {
      faviconLink.href = resolveAssetPath(metadata.faviconPath);
    }
  }

  // Update Apple touch icon
  if (metadata.appleTouchIconPath) {
    const appleTouchLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (appleTouchLink) {
      appleTouchLink.href = resolveAssetPath(metadata.appleTouchIconPath);
    }
  }

  // Update meta description
  if (metadata.siteDescription) {
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = metadata.siteDescription;
  }

  // Update OG tags for social sharing
  if (metadata.siteTitle) {
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = metadata.siteTitle;
  }

  if (metadata.siteDescription) {
    let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = metadata.siteDescription;
  }

  if (metadata.siteUrl) {
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = metadata.siteUrl;
  }
}

/**
 * Apply branding colors and fonts to CSS variables
 * This makes colors and fonts dynamic throughout the app
 */
export function applyBranding(settings: Settings): void {
  if (!settings.branding) return;

  const { branding } = settings;
  const root = document.documentElement;

  // Apply color variables
  if (branding.primaryColor) {
    root.style.setProperty('--primary', branding.primaryColor);
  }
  if (branding.secondaryColor) {
    root.style.setProperty('--secondary', branding.secondaryColor);
  }
  if (branding.accentColor) {
    root.style.setProperty('--accent', branding.accentColor);
  }
  if (branding.backgroundColor) {
    root.style.setProperty('--background', branding.backgroundColor);
  }
  if (branding.textColor) {
    root.style.setProperty('--foreground', branding.textColor);
  }
  if (branding.mutedTextColor) {
    root.style.setProperty('--muted-foreground', branding.mutedTextColor);
  }
  if (branding.borderColor) {
    root.style.setProperty('--border', branding.borderColor);
  }

  // Apply font families
  if (branding.fontFamily) {
    root.style.setProperty('--font-sans', branding.fontFamily);
  }
  if (branding.headingFontFamily) {
    root.style.setProperty('--font-heading', branding.headingFontFamily);
  }
}

/**
 * Initialize all configurations
 * Call this once when the app starts
 */
export interface AppData {
  global: Settings;
  content: Awaited<ReturnType<typeof loadAllPageContents>>;
}

/**
 * Initialize all configurations and load all content
 * Call this once when the app starts
 */
export async function initializeConfig(): Promise<AppData> {
  const globalSettings = await loadGlobalSettings();
  const pageContents = await loadAllPageContents();
  
  applyMetadata(globalSettings);
  applyBranding(globalSettings);
  
  return {
    global: globalSettings,
    content: pageContents,
  };
}
