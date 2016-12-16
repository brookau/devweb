define([
  'angular',
  'app/common/context/user',
  'app/common/resources/constants/constants',
  'app/common/context/user',
  'app/common/services/notificationsService',
  'app/common/services/profileService'
], function (angular) {
  'use strict';

  var apiService = angular.module('common.resources.apiService', [
    'common.resources.constant',
    'ernr.notifications',
    'ernr.userService',
    'ernr.ProfileService'
  ])
    .factory('apiUserService', [
      '$http',
      'apiDomain',
      'notifications',
      'userFactory',
      '$q',
      'profileFactory',
      function ($http, apiDomain, notifications, userFactory, $q, profileFactory) {
        var service = {};

        service.login = function (data, reason) {
          var self = this,
            profile,
            deferred = $q.defer();
          $http.post(apiDomain.domain + '/account/login', data)
            .success(function (data, status) {
              $http.defaults.headers.common['x-access-token'] = 'logged';
              userFactory.setToken(data.result.token);

              // Get Profile
              profileFactory.getProfile()
                .then(function (data) {
                  userFactory.fillInfo(data);

                  // use this to publish login success we could pass the profile across also e.g.
                  notifications.loginSuccess(profile);

                  deferred.resolve();
                })
                .catch(function (err) {
                  console.log(err);
                  deferred.reject(err);
                });
            })
            .error(function (data, status) {
              deferred.reject(data);
              $http.defaults.headers.common['x-access-token'] = 'error';
              userFactory.setToken(null);
            });

          return deferred.promise;
        };

        service.createUser = function (data) {
          return $http.post(apiDomain.domain + '/account/create', data);
        };

        service.validation = function (data) {
          return $http.get(apiDomain.domain + '/account/validate', {params: data});
        };

        service.password = function (data) {
          return $http.post(apiDomain.domain + '/account/forgot', data);
        };

        return service;
      }
    ]);

  return apiService;
});
