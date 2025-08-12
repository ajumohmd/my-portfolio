// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '0': '0',
        '96': '24rem', // Add this line
      },
    },
  },
  plugins: [],
};

