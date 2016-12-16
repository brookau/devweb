/* jslint plusplus: true */
define([
    'angular',
    './user',
    './rankings',
    './profile',
    './jsonresource',
    './api',
    './constants/constants'
  ],
  function (angular) {
    // we can require individually or we can group them list this and require the group if needed.
    angular.module('common.resources', ['common.resources.user', 'common.resources.rankings', 'common.resources.profile',
      'common.resources.jsonresource', 'common.resources.apiService', 'common.resources.constant']);
  });