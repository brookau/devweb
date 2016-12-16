/* istanbul ignore next */
define([
    'angular',
    './modules/main',
    'text!./modules/navbar/templates/navbar.html',
    './common/context/user',
    './common/resources/rankings',
    './common/filters',
    'canvasToBlobPolyfill'
  ],
  function (angular,
            modules,
            templatenav) {
    'use strict';

    var app = angular.module('ernr', [
      'common.resources.rankings',
      'ernr.userService',
      'ernr.favoritesService',
      'ernr.followService',
      'ernr.tagsService',
      'ernr.blockListService',
      'ernr.filters',
      'ernr.navbar',
      'ernr.footer',
      'ernr.home',
      'ernr.profile',
      'ernr.login',
      'ernr.dashboard',
      'ernr.error',
      'ernr.terms',
      'ernr.about',
      'ernr.post',
      'ernr.test',
      'ernr.ad',
      'ernr.search',
      'ernr.support',
      'ernr.registration',
      'ernr.gallery',
      'ernr.publicProfile'
    ]);

    // Add the templates to templatecache
    // Otherwise anything with ng-include will not be happy and create a recursive loop

    app
      .run([
        '$templateCache',
        'userFactory',
        'favoritesFactory',
        'followFactory',
        'blockListFactory',
        'tagsFactory',
        function ($templateCache, 
                  userFactory,
                  favoritesFactory,
                  followFactory,
                  blockList,
                  tags) {
          $templateCache.put('navbar', templatenav);

          // Load Authentication data from localstorage
          userFactory.loadFromLocal();

          if (userFactory.isLoggedIn) {
            // Load favorites posts to localstorage
            favoritesFactory.loadToLocalStorage();

            // Load following users to localstorage
            followFactory.loadToLocalStorage();

            // Load blocked users to localstorage
            blockList.loadToLocalStorage();
            
            // Load following tags to localstorage
            tags.loadToLocalStorage();
          }
        }
      ])

      .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
          // Default route configuration
          $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
          });
        }
      ])

      .controller('MainController', ['$scope', 'rankingsResource',
        function ($scope, rankingsResource) {
          $scope.flags = {};
          $scope.flags.nav = false;
          $scope.flags.side = false;
        }
      ]);

    return app;
  });
