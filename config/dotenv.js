module.exports = function (env) {
  return {
    clientAllowedKeys: [
      'GOOGLE_MAPS_API_KEY',
      'GOOGLE_MAP_ID',
      'CAPTCHA_KEY',
      'SEARCH_KEY',
      'FROALA_KEY',
    ],
    failOnMissingKey: false,
    enabled: true,
  };
};
