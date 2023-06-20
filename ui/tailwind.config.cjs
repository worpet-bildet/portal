module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    fontFamily: {
      logo: ['krona'],
      saucebold: ['sauce-bold'],
    },
    colors: {
      grey: '#696969',
      black: '#000000',
      dark: '#00000080',
      darkgrey: '#181A1C',
      panels: '#f9f9f940', //#D6D3D6',
      white: '#ffffff',
      hover: '#ffffff60',
      offwhite: '#c5c5c5',
      mdark: '#eeeef0',
      mlight: '#f9f9f9',
      top: '#D8D1D0',
      two: '#D5CDCB',
      three: '#C8BFC5',
      four: '#BEBAC1',
      five: '#AEB6BF',
      error: 'rgb(220 38 38)',
      link: 'blue',
    },
    extend: {},
    borderColor: {
      DEFAULT: '#69696940',
      error: 'rgb(220 38 38)',
      spacer: '#696969',
    },
    boxShadow: {
      DEFAULT: '0 0 20px 0 #69696920',
    },
  },
  screens: {},
  variants: {
    extend: {},
  },
  darkMode: 'class',
};
