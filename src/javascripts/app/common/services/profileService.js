define([
  'angular',
  'app/common/resources/constants/constants'
],function (angular) {
  'use strict';

  return angular.module('ernr.ProfileService', ['common.resources.constant'])
    .factory('profileFactory', [
      '$http',
      '$q',
      'apiDomain',
      function ($http, $q, constant) {
        return {
          getProfile: function (id) {
            var deferred = $q.defer(),
                promises = [];

            if (id) {
              promises.push( $http.get(constant.domain + '/user/' + id + '/profile') );
            } else {
              promises.push( $http.get(constant.domain + '/account/profile') );
              promises.push( this.stats() );
            }

            $q.all(promises).then(function (responses) {
              var user;

              if (responses.length > 1) {
                user = angular.extend(responses[0].data.result, responses[1].data.result);
              } else {
                user = responses[0].data.result;
              }
             
              deferred.resolve(user);
            }).catch(function (err) {
              deferred.reject(err);
            });

            return deferred.promise;
          },
          setProfile: function (data) {
            return $http.post(constant.domain + '/account/profile', data);
          },
          stats: function () {
            return $http.get(constant.domain + '/account/stats');
          }
        };
      }
    ]);
});
