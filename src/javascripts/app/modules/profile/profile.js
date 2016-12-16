/* istanbul ignore next */
define([
  'angular',
  'text!./profile.html',
  './controllers/main',
  './../../libs/angular.dcb-img-fallback',
  './../../libs/RGraph',
  'angularFileUpload',
  'app/common/services/uploadFileService',
  'angularRoute',
  'app/common/directives/thumbEditor/thumbEditor',
  'app/common/directives/userCard/userCard'
], function (angular,
             template,
             maincontroller,
             libimgfallback,
             rgraph,
             angularFileUpload) {
  'use strict';

  var module = angular.module('ernr.profile', [
    'ngRoute',
    'libs.img-fallback',
    'ernr.uploadFile',
    'angularFileUpload',
    'ernr.directives.thumbEditor',
    'ernr.directives.userCard'
  ]);

  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('profile', template);
  }]);

  angular.module('ernr.profile').config(
    ['$routeProvider', '$locationProvider', '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
          .when('/profile', {
            template: template,
            controller: 'ProfileController'
          })
          .when('/profile/:id?/:site?/:sector?', {
            template: template,
            controller: 'ProfileController'
          })
          .otherwise({redirectTo: '/'});
      }
    ]
  ).controller('ProfileController', maincontroller);

  return module;
});
