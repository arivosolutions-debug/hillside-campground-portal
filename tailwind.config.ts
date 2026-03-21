import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        headline: ['"Noto Serif"', "Georgia", "serif"],
        body:     ["Manrope", "system-ui", "sans-serif"],
        label:    ["Manrope", "system-ui", "sans-serif"],
      },
      colors: {
        /* ── Hills Camp brand tokens ── */
        "hc-bg":           "hsl(var(--hc-bg))",
        "hc-bg-alt":       "hsl(var(--hc-bg-alt))",
        "hc-primary":      "hsl(var(--hc-primary))",
        "hc-primary-deep": "hsl(var(--hc-primary-deep))",
        "hc-primary-dark": "hsl(var(--hc-primary-dark))",
        "hc-secondary":    "hsl(var(--hc-secondary))",
        "hc-accent":       "hsl(var(--hc-accent))",
        "hc-accent-light": "hsl(var(--hc-accent-light))",
        "hc-text":         "hsl(var(--hc-text))",
        "hc-text-light":   "hsl(var(--hc-text-light))",
        "hc-moss":         "hsl(var(--hc-moss))",
        "hc-green-light":  "hsl(var(--hc-green-light))",
        "hc-footer-bg":    "hsl(var(--hc-footer-bg))",

        /* ── shadcn mappings ── */
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          container:  "hsl(var(--primary-container))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          container:  "hsl(var(--secondary-container))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          low:     "hsl(var(--surface-container-low))",
          mid:     "hsl(var(--surface-container))",
          high:    "hsl(var(--surface-container-high))",
          highest: "hsl(var(--surface-container-highest))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:               "hsl(var(--sidebar-background))",
          foreground:            "hsl(var(--sidebar-foreground))",
          primary:               "hsl(var(--sidebar-primary))",
          "primary-foreground":  "hsl(var(--sidebar-primary-foreground))",
          accent:                "hsl(var(--sidebar-accent))",
          "accent-foreground":   "hsl(var(--sidebar-accent-foreground))",
          border:                "hsl(var(--sidebar-border))",
          ring:                  "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 4px)",
        sm:   "calc(var(--radius) - 8px)",
        xl:   "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        "4xl": "2.75rem",
        "5xl": "3rem",
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        "card":     "0 20px 25px -5px rgba(27,28,28,0.06), 0 8px 10px -6px rgba(27,28,28,0.04)",
        "card-lg":  "0 25px 50px -12px rgba(27,28,28,0.10)",
        "float":    "0 4px 24px 0 rgba(27,28,28,0.08)",
        "glow-amber": "0 0 40px 0 rgba(255,162,121,0.15)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        kenburns: {
          "0%":   { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.08)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(28px)", filter: "blur(3px)" },
          to:   { opacity: "1", transform: "translateY(0)",    filter: "blur(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        kenburns:         "kenburns 20s ease-in-out infinite alternate",
        "fade-up":        "fadeInUp 0.8s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
