import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/silent-witness-interactive-web/',
    server: {
      host: "localhost",
      port: 8080,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-components': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-avatar',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-label',
              '@radix-ui/react-popover',
              '@radix-ui/react-slot',
              '@radix-ui/react-toast'
            ]
          },
          assetFileNames: 'assets/[name].[hash].[ext]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version),
    },
  };
});
