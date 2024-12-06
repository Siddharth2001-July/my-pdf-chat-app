import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/pspdfkit-lib/**/*", // copy everything within pspdfkit-lib
          dest: "pspdfkit-lib", // preserve the folder structure in dist
        },
      ],
    }),
  ],
  publicDir: "public", // Ensure your `pspdfkit-lib` is in this folder
  assetsInclude: ["**/*.docx", '**/*.pdf']
});
