define([
    'angular',
    'app/common/resources/constants/constants'
  ],
  function (angular) {
    'use strict';

    var module = angular.module('ernr.userCreationService', [
      'common.resources.constant'
    ])
      .factory('userCreationFactory', [
        '$http',
        'apiDomain',
        function ($http, constant) {
          return {
            create: function (username, email, password, capcha) {
              var params;

              if (arguments.length === 1) {
                params = username;
              } else {
                params = {
                  username: username,
                  email: email,
                  password: password,
                  capcha: capcha
                };
              }

              return $http.post(constant.domain + '/account/create', params);
            }
          };
        }]);

    return module;
  });
