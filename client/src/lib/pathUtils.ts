/**
 * Path Utilities
 * Helper functions for resolving asset paths correctly in different deployment environments
 */

/**
 * Get the base URL for the application
 * This will be '/' for local development and '/MadhuPortfolio/' for GitHub Pages
 */
export function getBaseUrl(): string {
  return import.meta.env.BASE_URL || '/';
}

/**
 * Resolve an asset path to include the base URL
 * Handles both absolute and relative paths
 * 
 * @param path - The path to resolve (e.g., '/images/logo.png' or 'images/logo.png')
 * @returns The resolved path with base URL (e.g., '/MadhuPortfolio/images/logo.png')
 */
export function resolveAssetPath(path: string): string {
  if (!path) return '';
  
  // If path is already a full URL (http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const baseUrl = getBaseUrl();
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Combine base URL with path, ensuring no double slashes
  const resolvedPath = baseUrl.endsWith('/') 
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${cleanPath}`;
  
  return resolvedPath;
}

/**
 * Resolve multiple paths in an object recursively
 * Useful for processing configuration objects with image paths
 * 
 * @param obj - The object to process
 * @param pathKeys - Array of keys that contain paths to resolve (e.g., ['image', 'profileImage', 'logo'])
 * @returns The object with resolved paths
 */
export function resolvePathsInObject(obj: any, pathKeys: string[] = ['image', 'profileImage', 'logo', 'appLogo', 'faviconPath', 'appleTouchIconPath', 'resumeFileName']): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => resolvePathsInObject(item, pathKeys));
  }
  
  const resolved: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (pathKeys.includes(key) && typeof value === 'string') {
      resolved[key] = resolveAssetPath(value);
    } else if (typeof value === 'object' && value !== null) {
      resolved[key] = resolvePathsInObject(value, pathKeys);
    } else {
      resolved[key] = value;
    }
  }
  
  return resolved;
}
