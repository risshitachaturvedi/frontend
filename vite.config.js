import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/mini-map/", // Put both plugins inside the array
  server: {
    host: "0.0.0.0", // Expose to local network
    port: 5173, // Change if needed
  },
});
