/* istanbul ignore next */
define([
    'angular',
    'angularRoute',
    'text!./support.html',
    './controllers/support'
  ],
  function (angular,
            angularRoute,
            templateSupport,
            supportCtrl) {
    'use strict';
    var module = angular.module('ernr.support', ['ngRoute']);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('support', templateSupport);
    }]);

    module.config(
      ['$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/support', {
              template: templateSupport,
              controller: supportCtrl
            });
        }
      ]
    );
    // Not used currently
    return module;
  });