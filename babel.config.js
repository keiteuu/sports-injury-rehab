module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Keep module resolver if you need custom import paths
      ['module-resolver', {
        root: ['./src'], // change or remove if not needed
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json'
        ]
      }],
      // Reanimated plugin must be last in the list
      'react-native-reanimated/plugin'
    ],
  };
};