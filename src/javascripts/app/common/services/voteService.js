define([
    'angular',
    'app/common/resources/constants/constants'
  ],
  function (angular) {
    'use strict';

    return angular.module('ernr.voteService', [
      'common.resources.constant'
    ])
      .factory('voteFactory', [
        '$http',
        'apiDomain',
        function ($http, constant) {
          return {
            up: function (id) {
              return $http.get(constant.domain + '/vote/up/' + id);
            },
            down: function (id) {
              return $http.get(constant.domain + '/vote/down/' + id);
            }
          };
        }]);
  });
