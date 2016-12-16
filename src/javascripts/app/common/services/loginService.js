define([
    'angular',
    'app/common/resources/constants/constants',
    'app/common/context/user',
    'app/common/resources/api'
  ],
  function(angular) {
  'use strict';

  return angular.module('ernr.loginService', [
    'common.resources.constant',
    'common.resources.apiService',
    'ernr.userService'
  ])
    .factory('loginFactory', [
      '$http',
      'apiDomain',
      'userFactory',
      'apiUserService',
      function($http, constant, currentUser, apiUserService) {
        return {
          login: function(login, password) {
            var params = { login: login, password: password };
            return apiUserService.login(params);
          },
          logout: function() {
            currentUser.setToken();
          }
        };
    }]);
});
