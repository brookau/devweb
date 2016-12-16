/* istanbul ignore next */
define(function(require) {
    'use strict';
    var angular = require('angular'),
        templateError = require('text!./error.html'),
        errorCtrl = require('./controllers/error'),
        module;

    module = angular.module('ernr.error', ['ngRoute']);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('login', templateError);
    }]);

    module.config(
      ['$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/error', {
              template: templateError,
              controller: errorCtrl
            });
        }
      ]
    );
    // Not used currently
    return module;
});