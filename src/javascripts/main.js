require.config({
  //baseUrl: '.',

  // optimizer configuration
  optimize: 'uglify2',
  preserveLicenseComments: false,
  generateSourceMaps: true,

  uglify2: {
    output: {
      beautify: false
    },

    mangle: false
  },

  // runtime paths and shims
  paths: {
    // end of network components
    jquery: '../bower_components/jquery/dist/jquery',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    angular: '../bower_components/angular/angular',
    angularScroll: '../bower_components/angular-infinite-scroll/angular-infinite-scroll',
    angularTouch: '../bower_components/angular-touch/angular-touch',
    "angular-moment": '../bower_components/angular-moment/angular-moment',
    //: '../bower_components/moment/moment',
    angularLocalStorage: '../bower_components/angularLocalStorage/src/angularLocalStorage',
    angularResource: '../bower_components/angular-resource/angular-resource',
    angularRoute: '../bower_components/angular-route/angular-route',
    angularSanitize: '../bower_components/angular-sanitize/angular-sanitize',
    angularCookies: '../bower_components/angular-cookies/angular-cookies',
    angularBootstrap: '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    angularReCaptcha: '../bower_components/angular-re-captcha/angular-re-captcha',
    lodash: '../bower_components/lodash/dist/lodash',
    text: '../bower_components/requirejs-text/text',
    moment: '../bower_components/moment/moment',
    // moment: '../javascripts/app/modules/moment/moment',
    angularFileUpload: '../bower_components/ng-file-upload/angular-file-upload',
    ngTagsInput: '../bower_components/ng-tags-input/ng-tags-input',
    mentio: '../bower_components/ment.io/dist/mentio',
    jwPlayer: "../bower_components/jwplayer/jwplayer",
    isMobile: "../bower_components/isMobile/isMobile",
    "angular-messages": "../bower_components/angular-messages/angular-messages",
    "canvasToBlobPolyfill": "../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob"
  },

  shim: {
    "angular": {
      deps: ["jquery"],
      exports: "angular"
    },
    "angularReCaptcha": {
      deps: ["angular"]
    },
    "angularRoute": {
      deps: ["angular"]
    },
    "angularLocalStorage": {
      deps: ["angular", "angularCookies"]
    },
    "angularResource": {
      deps: ["angular"]
    },
    "angularCookies": {
      deps: ["angular"]
    },
    "angularBootstrap": {
      deps: ["angular"]
    },
    "angularTouch": {
      deps: ['angular']
    },
    "angularFileUpload": {
      deps: ['angular']
    },
    "ngTagsInput": {
      deps: ['angular']
    },
    "mentio": {
      deps: ['angular']
    },
    "bootstrap": {
      deps: ['jquery']
    },
    "angular-moment": {
      deps: ['moment', 'angular']
    },
    "angularScroll": {
      deps: ['angular']
    },
    'jwPlayer': {
      exports: 'jwplayer'
    },
    "angular-messages": {
      deps: ['angular']
    },
    'canvasToBlobPolyfill': {
      exports: 'canvasToBlobPolyfill'
    }
  }
});

// IE console issue when the developer tools are not opened.
//Ensures there will be no 'console is undefined' errors
if (!window.console) {
  window.console = window.console || (function () {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () {
    };
    return c;
  })();
}

require([
  'jquery',
  'angular',
  'app/main',
  'bootstrap'
], function ($, angular, app) {
  'use strict';
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  angular.element().ready(function () {
    //$html.addClass('ng-app');
    angular.bootstrap($html, [app.name]);
  });
});
