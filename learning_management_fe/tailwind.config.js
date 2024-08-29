/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
         "prim": "#00D2B5",
         "sec": "#FCCE90",
         "bg-light": "#f6f5f8",
         "fg-light": "#FFFFFF",
        },
        screens: {
          'xs': '400px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
        },
      },
    },
    plugins: [],
  }