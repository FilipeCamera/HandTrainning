const path = require('path');

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('.')],
      extensions: [
        '.ts',
        '.tsx',
        '.ios.tsx',
        '.android.tsx',
        '.svg',
        '.jpg',
        '.png',
      ],
      alias: {
        clients: './src/clients/',
        components: './src/app/components/',
        assets: './src/assets/',
        screens: './src/app/screens/',
        routes: './src/routes',
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...plugins],
};
