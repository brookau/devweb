/* istanbul ignore next */
define([
    'angular',
    'angularScroll',
    'angularRoute',
    'app/common/services/feedService',
    'text!./home.html',
    './../../libs/angular.dcb-img-fallback',
    './controllers/main',
    'app/common/directives/feed/feedList',
    'app/common/directives/feedFilters/feedFilters'
  ],
  function (angular,
            angularScroll,
            angularRoute,
            feedServiceModule,
            template,
            libimgfallback,
            maincontroller,
            feedsListDirective) {
    'use strict';

    var module = angular.module('ernr.home', [
      'ngRoute',
      'libs.img-fallback',
      'infinite-scroll',
      'ernr.feedService',
      'ernr.directives.feedList',
      'ernr.directives.feedFilters'
    ]);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('home', template);
    }]);

    angular.module('ernr.home').config(
      ['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
          $routeProvider
            .when('/', {
              template: template,
              controller: 'HomeController'
            })
            .when('/trending/:site?/:sector?/:direction?', {
              template: template,
              controller: 'HomeController'
            });
        }
      ]
    )
      .controller('HomeController', maincontroller);

    return module;
  });
