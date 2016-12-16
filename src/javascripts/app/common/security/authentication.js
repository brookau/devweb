/* jslint plusplus: true */
define([
    'angular',
    'angularLocalStorage',
    'angularResource',
    'moment'
  ],
  function (angular) {

    var module = angular.module('common.security.authentication', ['ngResource', 'angularLocalStorage']);

    module.factory('authentication',
      ['$rootScope', '$http', '$location', 'storage', '$interval', '$window', '$timeout',
        function ($scope, $http, $location, storage, $interval, $window, $timeout) {
          var service = {};

          service.data = {
            email: '',
            token: ''
          };

          service.isAuthenticated = false;

          service.hasToken = function () {
            if (service.data.userToken) {
              return true;
            } else {
              return false;
            }
          };

          service.checkSession = function () {

          };

          service.login = function (email, password) {

          };

          service.serverCommunicationError = function () {

          };

          service.invalidateSession = function () {

          };
          return service;
        }
      ]
    );
  });