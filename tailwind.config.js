/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        whatsapp: {
          DEFAULT: '#00A884',
          dark: '#00806A',
          light: '#25D366',
          'message-in': '#202C33',
          'message-out': '#005C4B',
          'message-in-dark': '#202C33',
          'message-out-dark': '#005C4B',
          'header': '#1F2C33',
          'header-dark': '#202C33',
          'sidebar': '#111B21',
          'sidebar-dark': '#111B21',
          'divider': '#2A373F',
          'divider-dark': '#2A373F',
        },
        background: {
          DEFAULT: '#0C1317',
          dark: '#0C1317',
        },
        surface: {
          DEFAULT: '#202C33',
          dark: '#202C33',
        },
        border: {
          DEFAULT: '#2A373F',
          dark: '#2A373F',
        },
        text: {
          primary: '#E9EDEF',
          secondary: '#8696A0',
          success: '#00A884',
          error: '#EF4444',
        }
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [],
}
