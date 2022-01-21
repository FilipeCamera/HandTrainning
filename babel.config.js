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
        features: './src/clients',
        components: './src/app/components/',
        assets: './src/assets/',
        screens: './src/app/screens/',
        routes: './src/routes',
        'assets/*': './src/assets',
        firebase: './src/config',
        '@actions/auth': './src/store/ducks/auth.ts',
        '@actions/visualized': './src/store/ducks/visualized.ts',
        '@actions/trainner': './src/store/ducks/trainner.ts',
        functions: './src/functions',
        store: './src/store',
        validation: './src/utils/validation',
        '@mask': './src/utils/mask',
        hooks: './src/hooks',
        '@styles': './src/styles',
        '@normalize': './src/utils/font',
        keys: './src/utils/keys',
        payments: './src/services/payment.ts',
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...plugins],
};
