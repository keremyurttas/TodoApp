module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        skeleton: {
          "0%": { background: "hsl(200, 20%, 70%)" },
          "100%": { background: "hsl(200, 20%, 85%)" },
        },
      },
      animation: {
        skeleton: "skeleton 1s linear infinite alternate",
      },
      height: {
        128: "36rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
