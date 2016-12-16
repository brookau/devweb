define([
    'angular',
    'lodash',
    'angularLocalStorage',
    'app/common/resources/constants/constants'
  ],
  function (angular, _) {
  'use strict';

  return angular.module('ernr.favoritesService', [
    'angularLocalStorage',
    'common.resources.constant'
  ])
  .factory('favoritesFactory', [
    '$http',
    'apiDomain',
    'storage',
    function ($http, constant, storage) {
      var isLike = function (id) {
        return _.indexOf(storage.get('favorites'), id) >= 0;
      };

      var sync = function (id, type) {
        var ids = storage.get('favorites'),
             isIncluded = isLike(id);

        if (type === "add" && !isIncluded) {
          ids.push(id);
        } else if (type === "remove" && isIncluded) {
          _.remove(ids, function(n) { return n === id; });
        }

        storage.set('favorites', ids);
      };

      return {
        get: function (params) {
          return $http.get(constant.domain + '/favorites', { params: params });
        },
        add: function (id) {
          return $http.post(constant.domain + '/favorites', {
            postid: id
          }).success(sync.bind(this, id, 'add'));
        },
        remove: function (id) {
          return $http.delete(constant.domain + '/favorites/' + id)
            .success(sync.bind(this, id, 'remove'));
        },
        loadToLocalStorage: function () {
          this.get({ per_page: 0 }).success(function (resp) {
            var ids = resp.result.items.map(function (e) { return e.id; });
            storage.set('favorites', ids);
          });
        },
        isLike: function (id) {
          return isLike(id);
        }
      };
    }
  ]);
});
