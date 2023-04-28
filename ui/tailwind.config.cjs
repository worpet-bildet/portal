module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    extend: {},
  },
  screens: {},
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
