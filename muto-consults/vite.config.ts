import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get PORT from environment and convert to number
const port = process.env.PORT ? Number(process.env.PORT) : 5173;

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  base: "/", // Ensures correct asset paths
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: port, // Use the converted number port
  },
});
