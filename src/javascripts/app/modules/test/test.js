define([
    'angular',
    'text!./post.html',
    'text!./templates/post-profile.html',
    './controllers/post',
    './controllers/post-profile',
    'angularRoute',
    'app/common/context/user',
    'app/common/services/postService',
    'app/common/directives/jwPlayer',
    './directives/postsComments',
    './directives/rabbitHoles',
    'app/common/directives/follow/followButton',
    'app/common/directives/voteup',
    'app/common/directives/votedown',
    'app/common/directives/refresh',
    'app/common/directives/share/share',
    'app/common/directives/report/report',
    'app/common/directives/defaultSrc'
  ],
  function (angular, templatePost, templatePostProfile, postCtrl, postProfileCtrl) {
    'use strict';

    var module = angular.module('ernr.test', [
      'ngRoute',
      'ernr.userService',
      'ernr.postService',
      'ernr.directives.jwPlayer',
      'ernr.directives.postsComments',
      'ernr.directives.followButton',
      'ernr.directives.votedown',
      'ernr.directives.voteup',
      'ernr.directives.refresh',
      'ernr.directives.share',
      'ernr.directives.report',
      'ernr.post.directives.rabbitHoles',
      'ernr.directives.defaultSrc'
    ]);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('test', templatePost);
      $templateCache.put('testProfile', templatePostProfile);
    }]);

    module.config(
      ['$routeProvider',
        function ($routeProvider) {
          $routeProvider
            .when('/test', {
              template: templatePostProfile,
              controller: postProfileCtrl
            })
            .when('/test/:id', {
              template: templatePostProfile,
              controller: postProfileCtrl
              
            });
        }
      ]
    );

    return module;
  });
