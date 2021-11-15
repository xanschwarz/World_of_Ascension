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
      },

      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
