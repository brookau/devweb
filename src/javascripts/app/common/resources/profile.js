/* jslint plusplus: true */
define([
    'angular',
    'angularLocalStorage',
    'angularResource'
  ],
  function (angular) {
    var module = angular.module('common.resources.profile', ['ngResource', 'angularLocalStorage']);

    module.factory('profileResource',
      ['$rootScope', '$http', '$location', 'storage', '$interval', '$q',
        function ($scope, $http, $location, storage, $interval, $q) {
          var service = {};
          service.getProfile = function (id) {
            var deferred = $q.defer();
            $http.get('http://api.kpop.s1k.com/kpopbuzz.all/' + id, {}).
              success(function (response) {
                deferred.resolve({error: null, profile: response});
              }).
              error(function (err) {
                deferred.resolve({error: err, profile: null});
              });

            return deferred.promise;
          };
          service.getChart = function (options) {
            var deferred = $q.defer();
            var id = options.id;
            var sector;
            if (options.sector !== 'all') {
              id = id + ':' + options.sector;
            }
            console.log(id);
            $http.get('http://api.kpop.s1k.com/rssbuzz/historical/' + id + '?gran=1day&count=14', {}).
              success(function (response) {
                deferred.resolve({error: null, chart: response});
              }).
              error(function (err) {
                deferred.resolve({error: err, chart: null});
              });

            return deferred.promise;
          };

          return service;
        }
      ]
    );
  });