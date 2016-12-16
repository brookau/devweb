define([
    'angular'
  ],
  function (angular) {
    'use strict';

    return angular.module('ernr.notifications', [])
      .factory('notifications', ['$rootScope', function ($rootScope) {
        // private notification messages
        // If you make a new notification you will add it here
        // we should use this service only for notifications
        var _START_REQUEST_ = '_START_REQUEST_',
          _END_REQUEST_ = '_END_REQUEST_',
          _ENTITY_CLICKED_ = '_ENTITY_CLICKED_',
          _LOGIN_SUCCESS_ = '_LOGIN_SUCCESS_',
          _LOGOUT_SUCCESS_ = '_LOGOUT_SUCCESS_',
        // Added By Nois
          _NEW_FEED_ADDED_ = '_NEW_FEED_ADDED_',


        // publish start request notification
          requestStarted = function () {
            $rootScope.$broadcast(_START_REQUEST_);
          },
        // publish end request notification
          requestEnded = function () {
            $rootScope.$broadcast(_END_REQUEST_);
          },
        // publish entity clicked notification
          entityClicked = function (args) {
            $rootScope.$broadcast(_ENTITY_CLICKED_, args);
          },
        // publish a login success
          loginSuccess = function (args) {
            $rootScope.$broadcast(_LOGIN_SUCCESS_, args);
          },
        // subscribe to start request notification
          onRequestStarted = function ($scope, handler) {
            $scope.$on(_START_REQUEST_, function (event) {
              handler();
            });
          },
          onEntityClicked = function ($scope, handler) {
            $scope.$on(_ENTITY_CLICKED_, function (event, args) {
              handler(args);
            });
          },
        // subscribe to login success notifications
          onLoginSuccess = function ($scope, handler) {
            $scope.$on(_LOGIN_SUCCESS_, function (event, args) {
              handler(args);
            });
          },
        // subscribe to end request notification
          onRequestEnded = function ($scope, handler) {
            $scope.$on(_END_REQUEST_, function (event) {
              handler();
            });
          },
        // Added By Nois
          newFeedAdded = function (args) {
            $rootScope.$broadcast(_NEW_FEED_ADDED_, args);
          },
          onNewFeedAdded = function ($scope, handler) {
            $scope.$on(_NEW_FEED_ADDED_, function (event, args) {
              handler(args);
            });
          };

        return {
          requestStarted: requestStarted,
          requestEnded: requestEnded,
          entityClicked: entityClicked,
          loginSuccess: loginSuccess,
          onRequestStarted: onRequestStarted,
          onRequestEnded: onRequestEnded,
          onEntityClicked: onEntityClicked,
          onLoginSuccess: onLoginSuccess,
          newFeedAdded: newFeedAdded,
          onNewFeedAdded: onNewFeedAdded
        };
      }]);
  });