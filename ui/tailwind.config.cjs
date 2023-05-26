module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    fontFamily: {
      logo: ['krona'],
      sauce: ['sauce'],
    },
    colors: {
      'grey': '#696969',
      'black': '#181A1C',
      'nav': '#181A1Cda',
      'white': '#ffffff',
      'offwhite': '#c5c5c5',
    },
    extend: {},
    borderColor: {
      DEFAULT: '#80808040',
    },
    boxShadow: {
      DEFAULT: '0 0 20px 0 #00000050',
    },
  },
  screens: {},
  variants: {
    extend: {},
  },
};
