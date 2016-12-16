define([
    'angular',
    'angularLocalStorage'
  ],
  function (angular) {
    'use strict';

    return angular.module('ernr.userService', ['angularLocalStorage'])
      .factory('userFactory', ['$http', 'storage', function ($http, storage) {
        var service = {},
          info = {},
          token,
          authentication = {
            isAuth: false,
            token: '',
            userData: {}
          };

        service.isLoggedIn = false;

        service.getToken = function () {
          return token;
        };

        service.setToken = function (value) {
          if (!value) {
            this.isLoggedIn = false;
            token = undefined;
            this.clearInfo();
          } else {
            this.isLoggedIn = true;
            token = value;
          }

          $http.defaults.headers.common['x-access-token'] = token;
        };

        service.fillInfo = function (obj) {
          info = angular.extend(info, obj);

          authentication.token = token;
          authentication.isAuth = service.isLoggedIn;
          authentication.userData = info;
          // Save data to local storage
          service.saveLocal(authentication);
        };

        service.clearInfo = function () {
          info = {};
          service.saveLocal({});
        };

        service.getInfo = function () {
          return info;
        };

        service.saveLocal = function (obj) {
          obj = obj || {};
          storage.set('authenticationData', obj);
        };

        service.loadFromLocal = function () {
          var data = storage.get('authenticationData');
          data = data || {};
          token = data.token;
          service.isLoggedIn = data.isAuth;
          info = data.userData || {};

          service.setToken(token);
        };

        service.reshare = function () {
          console.log('reshare');
        };

        service.upvote = function () {
          console.log('upvote');
        };

        service.downvote = function () {
          console.log('downvote');
        };

        service.singleShare = function () {
          console.log('singleShare');
        };

        service.flag = function () {
          console.log('flag');
        };

        service.commentUpvote = function () {
          console.log('commentUpvote');
        };

        service.commentDownvote = function () {
          console.log('commentDownvote');
        };

        service.commentFlag = function () {
          console.log('commentFlag');
        };

        service.prev = function () {
          console.log('prev');
        };

        service.next = function () {
          console.log('next');
        };

        service.imageFilter = function () {
          console.log('imageFilter');
        };

        service.videoFilter = function () {
          console.log('videoFilter');
        };

        service.audioFilter = function () {
          console.log('audioFilter');
        };

        service.textFilter = function () {
          console.log('textFilter');
        };

        service.pathUp = function () {
          console.log('pathUp');
        };

        service.pathDown = function () {
          console.log('pathDown');
        };

        service.rabbitHoleUp = function () {
          console.log('rabbitHoleUp');
        };

        service.rabbitHoleDown = function () {
          console.log('rabbitHoleDown');
        };

        return service;
      }]);
  });
