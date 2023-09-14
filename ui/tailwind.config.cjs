module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        logo: ['krona'],
        saucebold: ['sauce-bold'],
      },
      scrollbarHide: {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        transparent: '#00000000',

        panel: '#FAFAFA',
        panelhover: '#EFEFEF',
        indicator: '#EAEAEA',
        indicatortext: '#8E8E8E',
        panelicon: '#B1B1B1',
        navtext: '#636363',
        light: '#AFAFAF',
        greyicon: '#C7C7C7',
        darkgreyicon: '#676767',
        input: '#F8F8F8',
        strucpill: '#F1F1F1',
        strucpilltext: '#ABABAB',
        posttext: '#858585',

        grey: '#696969',
        dark: '#00000080',
        'dark-background': '#0e0e0e',
        coverPhotoBottom: '#00000000',
        coverPhotoTop: '#000000aa',
        purple: '#573c7c',
        'translucent-purple': '#ac6baf2a',
        'ai-blue': '#77a1f3',
        'ai-purple': '#ac6baf',
        gradientdark: '#0c0c0c',
        darkgrey: '#181A1C',
        panels: '#f9f9f940', //#D6D3D6',
        'panels-solid': '#f9f9f9',
        'panels-hover': '#00000008',
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
      DEFAULT: '#EFEFEF',

      transparent: '#00000000',
      grey: '#80808040',
      white: '#ffffff',
      black: '#000000',
      darkgrey: '#181A1C',
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
