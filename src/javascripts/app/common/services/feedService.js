define([
    'angular',
    'app/common/resources/constants/constants',
    'lodash'
  ],
  function (angular, constantsModule, _) {
    'use strict';

    var module = angular.module('ernr.feedService', ['common.resources.constant'])
      .factory('feedFactory', ['apiDomain', '$http', function (constant, $http) {
        var service = {};

        service.search = function (params) {
          var feedId = "";

          if (params) {
            if (params.topic === "main" || !params.topic) {
              params.topic = "all";
            }

            feedId = _.compact([params.topic, params.type, params.datestamp]).join(':');

            delete params.topic;
            delete params.type;
            delete params.datestamp;
          }

          return $http({
            method: 'GET',
            url: constant.domain + "/feeds/" + feedId,
            params: params
          });
        };

        service.get = function (url, param) {
          var newurl = param ? url.replace('%s', param) : url;
          return $http({
            'method': 'GET',
            'url': constant.domain + newurl
          });
        };


        return service;
      }]);

    return module;
  });
