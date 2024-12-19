module.exports = function(API) {
    API.cache(true);
    return {
      presets: ['babel-preset-expo'],  
      plugins: ['react-native-reanimated/plugin'],
    };
  };