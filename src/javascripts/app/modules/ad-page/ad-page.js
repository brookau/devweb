/* istanbul ignore next */
define(function(require) {
    'use strict';
    var angular = require('angular'),
        templateAdvertising = require('text!./ad-page.html'),
        advertisingCtrl = require('./controllers/ad-page'),
        module;

    module = angular.module('ernr.ad', ['ngRoute']);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('ad', templateAdvertising);
    }]);

    module.config(
      ['$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/advertising', {
              template: templateAdvertising,
              controller: advertisingCtrl
            });
        }
      ]
    );
    // Not used currently
    return module;
});