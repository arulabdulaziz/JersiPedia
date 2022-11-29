module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./'],
        extensions: ['.js', '.ios.js', '.android.js', '.png', '.jpg', '.svg', '.json'],
        alias: {
          '@src': './src',
          '@utils': './src/utils',
          '@config': './src/config',
          '@store': './src/store',
          '@components': './src/components',
          '@assets': './src/assets',
          '@data': './src/data',
        },
      },
    ],
  ],
};
