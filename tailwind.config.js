/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: "200px",

        md: "500px",

        lg: "920px",
        xl: "1400px",
      },
    },
    colors: {
      primary: "#FF5252",
      hover: "#645AFF",
      background: "#192A56",
      white: "#ffffff",
      gray: "#CCCCCC",
      darkBackgroud: "#0C152C",
      error: "#D2042D"
    },
    fontSize: {
      xs: ".65rem",
      sm: ".75rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.885rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    letterSpacing: {
      normal: "0",
      wide: ".025em",
      wider: ".15em",
      widest: ".3em",
    },
  },
  plugins: [],
};

// #7800FF"