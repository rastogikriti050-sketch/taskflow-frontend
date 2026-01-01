import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

function withOpacity(variable: string) {
  return ({ opacityValue }: { opacityValue?: number }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
}

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),

        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        destructive: withOpacity("--destructive"),
        muted: withOpacity("--muted"),
        accent: withOpacity("--accent"),
        popover: withOpacity("--popover"),
        card: withOpacity("--card"),

        success: withOpacity("--success"),
        warning: withOpacity("--warning"),

        sidebar: {
          DEFAULT: withOpacity("--sidebar-background"),
          foreground: withOpacity("--sidebar-foreground"),
          primary: withOpacity("--sidebar-primary"),
          "primary-foreground": withOpacity("--sidebar-primary-foreground"),
          accent: withOpacity("--sidebar-accent"),
          "accent-foreground": withOpacity("--sidebar-accent-foreground"),
          border: withOpacity("--sidebar-border"),
          ring: withOpacity("--sidebar-ring"),
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
      },
    },
  },
  plugins: [forms],
};

export default config;
