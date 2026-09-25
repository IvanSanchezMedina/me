/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
        ink: '#f3f0e8',
        muted: '#adb5ba',
        coal: '#171a1b'
      },
      fontFamily: {
        display: ['Michroma', 'Saira', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Saira', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Azeret Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      }
    }
  },
  plugins: []
};
