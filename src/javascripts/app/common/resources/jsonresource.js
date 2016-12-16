/* jslint plusplus: true */
define([
    'angular',
    'text!./json/homelist.json',
    'text!./json/dashboardProfile.json'
  ],
  function (angular,
            homeListData,
            dashboardProfileData) {

    var module = angular.module('common.resources.jsonresource', []);

    module.factory('jsonResource',
      ['$rootScope',
        function ($scope) {
          var service = {};
          service.getHomeList = function (id) {
            var homeListJson = JSON.parse(homeListData);
            return homeListJson;
          };

          service.getDashboardProfile = function () {
            var homeListJson = JSON.parse(dashboardProfileData);
            return homeListJson;
          };

          return service;
        }
      ]
    );
  });