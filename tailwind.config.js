/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf4",
          100: "#d7f5e2",
          200: "#b2ebca",
          300: "#7fd8a8",
          400: "#45bf7f",
          500: "#1f9c62",
          600: "#167d4f",
          700: "#126440",
          800: "#114f35",
          900: "#0f422d",
        },
        sand: {
          50: "#fbf7f1",
          100: "#f4ecdf",
          200: "#e8d7bf",
          300: "#d6ba93",
          400: "#c49f6e",
          500: "#b48753",
          600: "#966a43",
          700: "#79513a",
          800: "#634335",
          900: "#53382f",
        },
        ink: {
          950: "#15120e",
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "sans-serif"],
        display: ['"Fraunces"', "serif"],
      },
      boxShadow: {
        panel: "0 24px 60px rgba(17, 24, 39, 0.08)",
        soft: "0 14px 32px rgba(22, 125, 79, 0.18)",
      },
    },
  },
  plugins: [],
}
