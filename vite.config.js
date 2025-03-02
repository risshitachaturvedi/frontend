import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
//import { ViteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ViteStaticCopy({
    //   targets: [
    //     {
    //       src: "frontend/public",
    //       dest: "frontend/dist",
    //     },
    //   ],
    // }),
  ],
  //base: "/mini-map/",
  server: {
    host: "0.0.0.0", // Expose to local network
    port: 5173, // Change if needed
  },
});
