define([
    'angular',
    'lodash',
    'angularLocalStorage',
    'app/common/resources/constants/constants'
  ],
  function (angular, _) {
    'use strict';

    return angular.module('ernr.followService', [
      'angularLocalStorage',
      'common.resources.constant'
    ])
      .factory('followFactory', [
        '$http',
        'apiDomain',
        'storage',
        function ($http, constant, storage) {

          var isFollowing = function (id) {
            return _.indexOf(storage.get('following'), id) >= 0;
          };

          var sync = function (id, type) {
            var ids = storage.get('following'),
                 isIncluded = isFollowing(id);

            if (type === "add" && !isIncluded) {
              ids.push(id);
            } else if (type === "remove" && isIncluded) {
              _.remove(ids, function(n) { return n === id; });
            }

            storage.set('following', ids);
          };

          return {
            getFollowers: function (params, id) {
              if (id) {
                return $http.get(constant.domain + '/user/' + id + '/followers', { params: params });
              } else {
                return $http.get(constant.domain + '/user/followers', { params: params });
              }
            },
            getFollowing: function (params, id) {
              if (id) {
                return $http.get(constant.domain + '/user/' + id + '/following', { params: params });
              } else {
                return $http.get(constant.domain + '/user/following', { params: params });
              }
            },
            follow: function (id) {
              return $http.post(constant.domain + '/user/following', { followid: id })
                .success(sync.bind(this, id, 'add'));
            },
            unfollow: function (id) {
              return $http.delete(constant.domain + '/user/following/' + id)
                .success(sync.bind(this, id, 'remove'));
            },
            loadToLocalStorage: function () {
              this.getFollowing({ per_page: 0 }).success(function (resp) {
                var ids = resp.result.items.map(function (e) { return e.id; });
                storage.set('following', ids);
              });
            },
            isFollowing: function (id) {
              return isFollowing(id);
            }
          };
        }
      ]);
  });
