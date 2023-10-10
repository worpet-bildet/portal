module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      dropShadow: {
        search: '0 14px 37px rgba(0, 0, 0, 0.04)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
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
        darkpanel: '#FAFAFA25',
        panelhover: '#EFEFEF',
        indicator: '#CFE9FF',
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
        coverDefaultGradientBottom: '#C471F5',
        coverDefaultGradientTop: '#FA71CD',
        glass: '#FFFFFF30',
        glasstext: '#FFFFFFCC',
        secondary: '#6D6D6D',
        tertiary: '#909090',
        flavour: '#6D6D6D',
        blackhover: '#222222',
        whitehover: '#F4F4F4',
        tertiaryhover: '#E3E3E3',

        navitemactive: '#E5F3FF',
        navtextactive: '#2D9AFF',

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
        error: '#EF2626',
        link: 'blue',
        'link-dark': 'lightblue',
        'payment-gr-start': '#93E486',
        'payment-gr-end': '#7DCE69',
      },
      screens: {
        'tablet-l': '960px',
        'tablet-p': '720px',
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
      mute: '#EFEFEF',
      glass: '#FFFFFF26',
      panelicon: '#B1B1B1',
      secondary: '#6D6D6D',
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
