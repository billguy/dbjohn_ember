'use strict';;
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const {
  compatBuild
} = require("@embroider/compat");

module.exports = async function(defaults) {
  const { setConfig } = await import('@warp-drive/build-config');
  const {
    buildOnce
  } = await import("@embroider/vite");

  const app = new EmberApp(defaults, {
    babel: {
      plugins: [require.resolve('ember-concurrency/async-arrow-task-transform')],
    },
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
      include: ['bs-nav', 'bs-modal', 'bs-modal-simple', 'bs-form'],
      insertEmberWormholeElementToDom: false,
    },
    // Add options here
  });

  setConfig(app, __dirname, {
    deprecations: {
      DEPRECATE_TRACKING_PACKAGE: false,
      DEPRECATE_LEGACY_IMPORTS: false,
    },
  });

  app.import('node_modules/quill/dist/quill.snow.css');
  // app.import('node_modules/ember-tag-input/vendor/styles/eti-svg-icons.css');
  // app.import('node_modules/ember-tag-input/vendor/styles/ember-tag-input.css');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return compatBuild(app, buildOnce);
};
