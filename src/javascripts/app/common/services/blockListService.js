define([
  'angular',
  'lodash',
  'angularLocalStorage',
  'app/common/resources/constants/constants'
],
function (angular, _) {
  'use strict';

  return angular.module('ernr.blockListService', [
    'common.resources.constant',
    'angularLocalStorage'
  ])
    .factory('blockListFactory', [
             'apiDomain',
             '$http',
             'storage',
      function (constant, $http, storage) {
        var isBlocked = function (id) {
          return _.indexOf(storage.get('blocked'), id) >= 0;
        };

        var sync = function (id, type) {
          var ids = storage.get('blocked'),
               isIncluded = isBlocked(id);

          if (type === "add" && !isIncluded) {
            ids.push(id);
          } else if (type === "remove" && isIncluded) {
            _.remove(ids, function(n) { return n === id; });
          }

          storage.set('blocked', ids);
        };

        return {
          get: function (params) {
            return $http.get(constant.domain + '/user/blocklist', { params: params });
          },
          add: function (id) {
            return $http.post(constant.domain + '/user/blocklist', { blockid: id })
              .success(sync.bind(this, id, 'add'));
          },
          remove: function (id) {
            return $http.delete(constant.domain + '/user/blocklist/' + id)
              .success(sync.bind(this, id, 'remove'));
          },
          loadToLocalStorage: function () {
            this.get({ per_page: 0 }).success(function (resp) {
              var ids = resp.result.items.map(function (e) { return e.id; });
              storage.set('blocked', ids);
            });
          },
          isBlocked: function (id) {
            return isBlocked(id);
          }
        };
      }
    ]);
});

