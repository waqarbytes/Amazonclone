/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#131921',
          slate: '#232f3e',
          lightSlate: '#37475a',
          yellow: '#ffd814',
          yellowHover: '#f7ca00',
          orange: '#ffa41c',
          orangeHover: '#fa8900',
          amber: '#febd69',
          prime: '#007eb9',
          deal: '#cc0c39',
          bg: '#f3f4f6',
          surface: '#ffffff',
          border: '#e5e7eb',
          text: '#0f1111',
          muted: '#565959',
          link: '#007185',
          linkHover: '#c7511f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'buybox': '0 2px 5px rgba(213,217,217,.5)',
      }
    },
  },
  plugins: [],
}
