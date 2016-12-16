define([
  'angular',
  'text!./templates/publicProfile.html',
  './controllers/publicProfileCtrl',
  'app/common/directives/follow/followButton',
  'app/common/directives/follow/followers',
  'app/common/directives/follow/following',
  'app/common/directives/blockUser/blockUser',
  'app/common/directives/userCard/userCard',
  'app/common/services/profileService',
  'app/common/services/followService',
  'app/common/context/user',
  'angularRoute'
], function (angular, publicProfileTpl, publicProfileCtrl) {
  'use strict';

  var module = angular.module('ernr.publicProfile', [
    'ngRoute',
    'ernr.directives.followButton',
    'ernr.ProfileService',
    'ernr.userService',
    'ernr.directives.followers',
    'ernr.directives.following',
    'ernr.directives.userCard'
  ]);

  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('publicProfile', publicProfileTpl);
  }]);

  angular.module('ernr.publicProfile').config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/users/:id/:page?', {
          template: publicProfileTpl,
          controller: publicProfileCtrl
        });
    }]);

  return module;
});
