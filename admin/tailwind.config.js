/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#fafafa',
        'background': '#2a2b33', //'#1d1e24',#32333d
        'background-darker': '#1d1e24',
        'primary': '#c18bae',
        'secondary': '#473b3f',
        'accent': '#99bfcc',
        'lightslate': "#94a3b8",
        'darkslate': "#1e293b"
      },
    },
  },
  plugins: [],
}
