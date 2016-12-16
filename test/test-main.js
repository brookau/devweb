var tests = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base',
  // runtime paths and shims
  paths: {
    // end of network components
    angular: 'src/bower_components/angular/angular',
    angularMocks: 'src/bower_components/angular-mocks/angular-mocks',
    angularRoute: 'src/bower_components/angular-route/angular-route',
    angularReCaptcha: 'src/bower_components/angular-re-captcha/angular-re-captcha',
    angularBootstrap: 'src/bower_components/angular-bootstrap/ui-bootstrap-tpls',
    angularCookies: 'src/bower_components/angular-cookies/angular-cookies',
    angularLocalStorage: 'src/bower_components/angularLocalStorage/src/angularLocalStorage',
    angularFileUpload: 'src/bower_components/ng-file-upload/angular-file-upload',
    ngTagsInput: 'src/bower_components/ng-tags-input/ng-tags-input',
    mentio: 'src/bower_components/ment.io/dist/mentio',
    "angular-moment": 'src/bower_components/angular-moment/angular-moment',
    moment: 'src/bower_components/moment/moment',
    jwPlayer: "src/bower_components/jwplayer/jwplayer",
    isMobile: "src/bower_components/isMobile/isMobile",
    "angular-messages": "src/bower_components/angular-messages/angular-messages",

    // The app code itself
    app: 'src/javascripts/app',

    // Requirejs plugin
    text: 'src/bower_components/requirejs-text/text',
    lodash: 'src/bower_components/lodash/dist/lodash',

    // Test dependencies
    chai: 'node_modules/chai/chai',
    'chai-as-promised': 'node_modules/chai-as-promised/lib/chai-as-promised',
    sinon: 'node_modules/sinon/lib/sinon',
    'sinon-chai': 'node_modules/sinon-chai/lib/sinon-chai'
  },

  shim: {
    "angular": {
      exports: "angular"
    },
    "angularRoute": {
      deps: ["angular"]
    },
    "angularBootstrap": {
      deps: ["angular"]
    },
    "angularLocalStorage": {
      deps: ["angular", "angularCookies"]
    },
    "angularCookies": {
      deps: ["angular"]
    },
    "ngTagsInput": {
      deps: ['angular']
    },
    "angular-moment": {
      deps: ['moment', 'angular']
    },
    'jwPlayer': {
      exports: 'jwplayer'
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests

  // start test run, once Require.js is done
  //callback: window.__karma__.start
});

require([
  'chai',
  'chai-as-promised',
  'sinon-chai'
], function (chai, chaiaspromised, sinonChai) {
  'use strict';

  window.chai = chai;
  chai.use(chaiaspromised);
  chai.use(sinonChai);

  // window.assert = chai.assert;
  window.expect = chai.expect;
  // should = chai.should();

  require(tests, function () {
    window.__karma__.start();
  });
});
