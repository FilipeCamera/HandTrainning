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
        'assets/*': './src/assets',
        firebase: './src/config',
        '@actions/auth': './src/store/ducks/auth.ts',
        functions: './src/functions',
        store: './src/store',
        validation: './src/utils/validation',
        '@mask': './src/utils/mask',
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...plugins],
};
