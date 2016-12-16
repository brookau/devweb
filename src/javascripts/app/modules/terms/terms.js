/* istanbul ignore next */
define([
    'angular',
    'angularRoute',
    'text!./terms.html',
    './controllers/terms'
  ],
  function (angular, angularRoute, templateTerms, termsCtrl) {
    'use strict';
    var module = angular.module('ernr.terms', ['ngRoute']);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('terms', templateTerms);
    }]);

    module.config(
      ['$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/terms', {
              template: templateTerms,
              controller: termsCtrl
            });
        }
      ]
    );
    // Not used currently
    return module;
  });