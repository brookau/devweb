define([
    'angular',
    'app/common/resources/constants/constants'
  ],
  function (angular) {
  'use strict';

  return angular.module('ernr.commentsService', [
      'common.resources.constant'
    ])
    .factory('commentsFactory', [
      '$http',
      'apiDomain',
      function ($http, constant) {
        return {
          get: function (params) {
            return $http.get(constant.domain + '/comments', { params: params });
          },
          create: function (id, comment) {
            return $http.post(constant.domain + '/comments', {
              postid: id,
              text: comment
            });
          },
          edit: function (id, comment) {
            return $http.put(constant.domain + '/comments/' + id, {
              text: comment
            });
          },
          remove: function (id) {
            return $http.delete(constant.domain + '/comments/' + id);
          },
          voteup: function (id) {
            return $http.get(constant.domain + '/comments/' + id + '/voteup');
          },
          votedown: function (id) {
            return $http.get(constant.domain + '/comments/' + id + '/votedown');
          }
        };
      }
    ]);
});
