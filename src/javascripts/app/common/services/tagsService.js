define([
  'angular',
  'lodash',
  'angularLocalStorage',
  'app/common/resources/constants/constants'
],
function(angular, _) {
  'use strict';

  return angular.module('ernr.tagsService', [
      'angularLocalStorage',
      'common.resources.constant'
  ])
  .factory('tagsFactory', [
    '$http',
    'apiDomain',
    'storage',
    function($http, constant, storage) {
      var isFollowing = function (id) {
        return _.indexOf(storage.get('tags'), id) >= 0;
      };

      var sync = function (id, type) {
        var ids = storage.get('tags'),
             isIncluded = isFollowing(id);

        if (type === "add" && !isIncluded) {
          ids.push(id);
        } else if (type === "remove" && isIncluded) {
          _.remove(ids, function(n) { return n === id; });
        }

        storage.set('tags', ids);
      };

      return {
        autocomplete: function(query) {
          return $http.get(constant.search + '/elasticsearch/suggesttags', {
            params: {
              q: query
            }
          });
        },
        getList: function(params) {
          return $http.get(constant.domain + '/tags', {
            params: params
          });
        },
        getFollowing: function(params) {
          return $http.get(constant.domain + '/user/tags/following', {
            params: params
          });
        },
        follow: function(id) {
          return $http.post(constant.domain + '/user/tags/follow', {
            tags: [id]
          })
          .success(sync.bind(this, id, 'add'));
        },
        unfollow: function(id) {
          return $http.post(constant.domain + '/user/tags/unfollow', {
            tags: [id]
          })
          .success(sync.bind(this, id, 'remove'));
        },
        loadToLocalStorage: function () {
          this.getFollowing({ per_page: 0 }).success(function (resp) {
            storage.set('tags', resp.result.tags);
          });
        },
        isFollowing: function (id) {
          return isFollowing(id);
        }
      };
    }
  ]);
});
