'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'dbjohn-ember',
    environment,
    rootURL: '/',
    siteURL: 'https://dbjohn.com',
    host: 'http://localhost:3000',
    locationType: 'history',
    google_search_key: process.env.SEARCH_KEY,
    'ember-cli-google': {
      recaptcha: {
        siteKey: process.env.CAPTCHA_KEY,
      },
    },
    'ember-froala-editor': {
      key: process.env.FROALA_KEY,
      linkConvertEmailAddress: false,
    },
    analytics: {
      integrations: [
        {
          name: 'GoogleAnalytics',
          config: {
            id: process.env.ANALYTICS_KEY,
            remarketing: true,
            ecommerce: true,
            enhancedEcommerce: false,
            set: {
              anonymizeIp: true,
            },
          },
        },
      ],
    },
    moment: {
      outputFormat: 'LLLL',
    },
    disqus: {
      shortname: 'dbjohn',
    },
    emblemOptions: {
      blueprints: true,
    },
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  ENV['ember-google-maps'] = {
    key: process.env.GOOGLE_MAPS_API_KEY, // Using .env files in this example
    language: 'en',
    region: 'US',
    protocol: 'https',
    libraries: [],
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    // ENV.host = 'https://api-dbjohn-com.herokuapp.com';
    ENV.host = 'https://apidbjohncom-production.up.railway.app';
  }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.host + '/signins',
    tokenPropertyName: 'access',
    refreshAccessTokens: false,
    tokenExpirationInvalidateSession: false,
  };

  return ENV;
};
