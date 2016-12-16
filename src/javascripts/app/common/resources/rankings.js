/* jslint plusplus: true */
define([
  'angular',
  'angularResource',
  'angularLocalStorage'
], function (angular) {

  var module = angular.module('common.resources.rankings', ['ngResource', 'angularLocalStorage']);

  module.factory('rankingsResource',
    ['$rootScope', '$http', '$location', 'storage', '$interval', '$q',
      function ($scope, $http, $location, storage, $interval, $q) {
        var service = {};
        service.getLastUpdate = function () {
          var deferred = $q.defer();
          $http.get('http://api.kpop.s1k.com/kpopbuzz:STATS/latest', {}).
            success(function (response) {
              deferred.resolve({error: null, lastupdate: response});
            }).
            error(function (err) {
              deferred.resolve({error: err, lastupdate: null});
            });

          return deferred.promise;
        };
        service.getRankings = function (options) {
          var deferred = $q.defer();
          var direction = options.direction || 'asc';
          var site = options.site || 'kpopbuzz';
          var sector = options.sector || 'all';
          var page = options.page || 1;
          var per_page = options.per_page || 18;
          var url;
          //if (site.indexOf('kpopbuzz') >=0) {
          //    sector = 'kpopstarz';
          //}
          if (site.indexOf('buzzcharts') >= 0) {
            url = 'http://api.kpop.s1k.com/' + site + '?page=' + page + '&per_page=' + per_page;
          } else {
            url = 'http://api.kpop.s1k.com/' + site + '.' + sector + '?' + direction + '=true&page=' + page + '&per_page=' + per_page;
          }

          $http.get(url, {}).
            success(function (response) {
              for (var i in response.items) {
                if (response.items[i].attributes) {
                  response.items[i].thumbnail = response.items[i].attributes['thumbnail-image'].value;
                }
              }
              deferred.resolve({error: null, items: response.items});
            }).
            error(function (err) {
              deferred.resolve({error: err, items: null});
            });

          return deferred.promise;
        };


        return service;
      }
    ]
  );
});