import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Conditionally load Manus plugin only if available
let vitePluginManusRuntime: any;
try {
  const manusPlugin = await import("vite-plugin-manus-runtime");
  vitePluginManusRuntime = manusPlugin.vitePluginManusRuntime;
} catch (e) {
  // Plugin not available, skip it
  vitePluginManusRuntime = null;
}

// Build plugins array, only including Manus plugin if available
const plugins = [
  react(), 
  tailwindcss(), 
  jsxLocPlugin(),
  ...(vitePluginManusRuntime ? [vitePluginManusRuntime()] : [])
];

export default defineConfig({
  // Determine base path dynamically: '/' for custom domain, '/MadhuPortfolio/' for GitHub Pages URL
  // This is the definitive fix for the custom domain blank page issue.
  base: process.env.NODE_ENV === 'production' && process.env.VITE_CUSTOM_DOMAIN === 'true' ? '/' : '/MadhuPortfolio/',
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    // Optimize build for production
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port: 3000,
    host: true,
  }
});
