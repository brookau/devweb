/* istanbul ignore next */
define([
    'angular',
    'angularRoute',
    'text!./search.html',
    './controllers/search',
    './services/searchService',
    'app/common/resources/constants/constants'
  ],
  function (angular,
            angularRoute,
            templateSearch,
            searchCtrl,
            searchService) {
    'use strict';
    var module = angular.module('ernr.search', ['ngRoute', 'common.resources.constant']);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('search', templateSearch);
    }]);

    module.config(
      ['$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/search', {
              template: templateSearch,
              controller: searchCtrl
            });
        }
      ]
    );

    module.factory('searchFactory', searchService);

    return module;
  });
