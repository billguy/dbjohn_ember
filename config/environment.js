'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'dbjohn-ember',
    environment,
    rootURL: '/',
    host: 'http://localhost:3000',
    locationType: 'auto',
    google_search_key: '008911115616549592922:7t_vhbi7jpg',
    analytics_key: 'UA-47829506-1',
    moment: {
      outputFormat: 'LLLL'
    },
    disqus: {
      shortname: 'dbjohn'
    },
    emblemOptions:{
       blueprints: true
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-google-maps'] = {
    key: 'AIzaSyC9X2fmpXGSp3TIQqulFEfxC-9vEXcyL_g',
    language: 'en',
    region: 'US',
    protocol: 'https',
    libraries: []
  }

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
    ENV.host = 'https://api.dbjohn.com';
  }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.host + '/signins',
    tokenPropertyName: 'access',
    refreshAccessTokens: false,
    tokenExpirationInvalidateSession: false
  };

  return ENV;
};
