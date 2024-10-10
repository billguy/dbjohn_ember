module.exports = function (env) {
  return {
    clientAllowedKeys: [
      'GOOGLE_MAPS_API_KEY',
      'CAPTCHA_KEY',
      'ANALYTICS_KEY',
      'SEARCH_KEY',
      'FROALA_KEY',
    ],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
    enabled: env !== 'production',
  };
};
