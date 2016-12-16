define([
    'angular',
    'app/common/resources/constants/constants'
  ],
  function (angular) {
    'use strict';

    var postServiceModule = angular.module('ernr.postService', ['common.resources.constant'])
        .factory('postFactory', ['apiDomain', '$http', '$q', function (constant, $http, $q) {
            return {
                createpost: function (ipts) {
                    return $http.post(constant.domain + '/posts', ipts);
                },
                getPostById: function (id) {
                    return $http.get(constant.domain + '/posts/' + id);
                },
                getPaths: function (page, per_page) {
                    var deferred = $q.defer();
                    page = page || 0;
                    per_page = per_page || 20;
                    $http.get('../javascripts/app/common/resources/json/mock/pathList.json').success(function (dt) {
                        deferred.resolve(dt.splice(page * per_page, per_page));
                    });
                    return deferred.promise;
                },
                getRabbitHoles: function (page, per_page) {
                    var deferred = $q.defer();
                    page = page || 0;
                    per_page = per_page || 20;
                    $http.get('../javascripts/app/common/resources/json/mock/rabbitHoles.json').success(function (dt) {
                        deferred.resolve(dt.splice(page * per_page, per_page));
                    });
                    return deferred.promise;
                },
                comments: function (id, params) {
                    return $http.get(constant.domain + '/posts/' + id + '/comments', { params: params });
                },
                share: function (id) {
                    return $http.post(constant.domain + '/share', { postid: id });
                },
                shareTo: function (id, receiverid) {
                    return $http.post(constant.domain + '/shareto', {
                        postid: id,
                        receiverid: receiverid
                    });
                },
                setThumb: function (id, thumb) {
                    return $http.post(constant.domain + '/posts/setthumb', {
                        postid: id,
                        thumb: thumb
                    });
                }
            };
        }]);

    return postServiceModule;
});
