import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),    tailwindcss(),     VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "IAMeetYou",
        short_name: "IAM",
        description: "IAMeetYou",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/Image/192img.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Image/512img.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
}
    }),
],
})
