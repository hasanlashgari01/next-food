import type { Config } from "tailwindcss";

const config = {
  darkMode: ["variant", ["@media (prefers-color-scheme: dark) { &:not(.light *) }", "&:is(.dark *)"]],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        primary: {
          300: "#E6E6E6",
          500: "#828080",
          900: "#111111",
        },
        secondary: {
          100: "#F4EBFF",
          300: "#C699FF",
          500: "#AC6AFF",
        },
        background: "#F2F2F2",
        cancel: "#FC6363",
        process: "#FFB546",
        success: "#06C698",
      },
      fontFamily: {
        IranYekan: "IranYekan-Regular",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addVariant }: { addVariant: (name: string, selector: string) => void }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("child-focus", "& > *:focus");
      addVariant("child-active", "& > *:active");
      addVariant("child-disabled", "& > *:disabled");
      addVariant("child-not-last", "& > *:not(:last-child)");
      addVariant("child-not-first", "& > *:not(:first-child)");
    },
  ],
} satisfies Config;

export default config;
