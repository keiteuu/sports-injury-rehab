    module.exports = function (api) {
      api.cache(true);
      return {
        presets: ['babel-preset-expo'], // Or other presets you are using
        plugins: [
          // ... other plugins
          'react-native-worklets/plugin', // Changed from 'react-native-reanimated/plugin'
        ],
      };
    };