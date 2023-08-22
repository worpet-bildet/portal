module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    fontFamily: {
      logo: ['krona'],
      saucebold: ['sauce-bold'],
    },
    extend: {
      scrollbarHide: {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
      colors: {
        transparent: '#00000000',
        grey: '#696969',
        black: '#000000',
        dark: '#00000080',
        coverPhotoBottom: '#00000000',
        coverPhotoTop: '#000000aa',
        purple: '#573c7c',
        blueish: '#ac6baf2a',
        'ai-blue': '#77a1f3',
        'ai-purple': '#ac6baf',
        gradientdark: '#0c0c0c',
        darkgrey: '#181A1C',
        panels: '#f9f9f940', //#D6D3D6',
        'panels-solid': '#f9f9f9',
        'panels-hover': '#00000008',
        white: '#ffffff',
        hover: '#ffffff60',
        offwhite: '#c5c5c5',
        error: 'rgb(220 38 38)',
        link: 'blue',
        'link-dark': 'lightblue',
        'payment-gr-start': '#93E486',
        'payment-gr-end': '#7DCE69',
      },
    },
    borderColor: {
      DEFAULT: '#80808040',
      transparent: '#00000000',
      grey: '#80808040',
      white: '#ffffff',
      black: '#000000',
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
  darkMode: 'class',
};
