const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },

      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-6deg)",
          },
          "50%": {
            transform: "rotate(6deg)",
          },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-3%)" },
          "50%": { transform: "translateY(0)" },
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        // pulse: {
        //   "0%, 100%": { opacity: "1" },
        //   "50%": { opacity: ".5" },
        // },
      },

      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
        spin: "spin 1s ease-in-out infinite",
        // pulse: "pulse 1s ease-in-out infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
