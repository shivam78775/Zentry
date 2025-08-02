/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        'white-20': 'rgba(255, 255, 255, 0.2)', // for border-white/20 equivalent
      },
      fontFamily: {
        general: ['general', 'sans-serif'],
        zentry: ['zentry', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
