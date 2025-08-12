import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        fog: "#f6f7f8"
      }
    }
  },
  plugins: []
} satisfies Config
