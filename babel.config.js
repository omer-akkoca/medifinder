module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': '.',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin', // always at last
  ],
};
