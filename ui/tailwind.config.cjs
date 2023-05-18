module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    fontFamily: {
      logo: ['Arkhip'],
    },
    colors: {
      // nav: '#CFCACACC',
      nav: '#CFCACA',
      'gradient-top': '#CECCD0',
      'gradient-bottom': '#A5AAB2',
      black: '#383838',
      white: '#ffffff',
    },
    extend: {},
    borderColor: {
      DEFAULT: '#69696940',
    },
    boxShadow: {
      DEFAULT: '0 0 20px 0 #69696920',
    },
  },
  screens: {},
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
