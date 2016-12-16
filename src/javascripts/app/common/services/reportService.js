define([
  'angular',
  'app/common/resources/constants/constants'
],
function (angular) {
'use strict';

return angular.module('ernr.reportService', [
    'common.resources.constant'
  ])
  .factory('reportFactory', [
    '$http',
    'apiDomain',
    function ($http, constant) {
      return {
        create: function (target, id, reason, text) {
          var isTarget = ['users', 'posts', 'comments'].indexOf(target) >= 0;

          if (!isTarget) {
            throw new Error('Whoops! It is not target.');
          }

          return $http.post(constant.domain + '/report', {
            "target": target,
            "target_id": id,
            "reason": reason,
            "text": text
          });
        }
      };
    }
  ]);
});
