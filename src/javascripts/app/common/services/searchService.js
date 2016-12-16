define([
    'angular',
    'app/common/resources/constants/constants'
  ],
  function (angular) {
    'use strict';

    return angular.module('ernr.searchService', [
      'common.resources.constant'
    ])
      .factory('searchFactory', [
        '$http',
        'apiDomain',
        function ($http, constant) {
          return {};
        }
      ]);
  });
