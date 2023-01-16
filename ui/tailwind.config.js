module.exports = {
  content: [
    './index.html', './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#efefef',
      secondary: '#f1f1f1'
    }
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
