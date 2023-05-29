module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    fontFamily: {
      logo: ['krona'],
      saucebold: ['sauce-bold'],
    },
    colors: {
      'grey': '#696969',
      'black': '#000000',
      'darkgrey': '#181A1C',
      'panels': '#D6D3D660',
      'white': '#ffffff',
      'offwhite': '#c5c5c5',
    },
    extend: {},
    borderColor: {
      DEFAULT: '#80808040',
    },
    boxShadow: {
      DEFAULT: '0 0 20px 0 #69696920',
    },
  },
  screens: {},
  variants: {
    extend: {},
  },
};
