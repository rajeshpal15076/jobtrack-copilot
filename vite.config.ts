import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { copyFileSync, mkdirSync } from "node:fs";

const projectDir = dirname(fileURLToPath(import.meta.url));

function copyExtensionAssets() {
  return {
    name: "copy-extension-assets",
    closeBundle() {
      const iconsDir = resolve(projectDir, "public/icons");
      const outIconsDir = resolve(projectDir, "dist/icons");
      mkdirSync(outIconsDir, { recursive: true });
      for (const name of ["icon16.png", "icon48.png", "icon128.png"]) {
        copyFileSync(resolve(iconsDir, name), resolve(outIconsDir, name));
      }
    }
  };
}

export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(projectDir, "popup.html"),
        dashboard: resolve(projectDir, "dashboard.html")
      }
    }
  },
  plugins: [copyExtensionAssets()]
});