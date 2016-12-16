define([
    'angular',
    'angularBootstrap',
    'text!./../../modules/navbar/templates/signin.html',
    './../../modules/navbar/controllers/signInModalController',
    'app/common/context/user',
    'app/common/services/postService'
  ],
  function (angular,
            angularBootstrap,
            signInTemplate,
            signInController) {
    'use strict';

    var module = angular.module('ernr.directives.refresh', [
      'ui.bootstrap',
      'ernr.userService',
      'ernr.postService'
    ])
      .directive("refresh", function () {
        return {
          restrict: 'A',
          transclude: true,
          scope: {
            model: '='
          },
          controller: [
            '$scope',
            '$modal',
            'userFactory',
            'postFactory',
            function ($scope, $modal, currentUser, posts) {
              $scope.isMe = $scope.model.user_id === currentUser.getInfo().id;

              function refresh(model) {
                if ($scope.isMe) {
                  return;
                }

                posts.share($scope.model.id).success(function (data) {
                  $scope.model.reshare = data.result.reshare;
                  $scope.model.balance = data.result.balance;
                  $scope.model.reshareUsers = data.result.reshareUsers;
                });
              }

              function openSignInModal(m) {
                var modalInstance = $modal.open({
                  template: signInTemplate,
                  controller: signInController,
                  backdrop: 'static',
                  keyboard: false
                });

                modalInstance.result.then(function (rs) {
                  refresh(m);
                }, function (r) {
                });
              }

              $scope.action = function (model) {
                if (currentUser.isLoggedIn) {
                  refresh(model);
                } else {
                  openSignInModal(model);
                }
              };
            }
          ],
          template: '<a ng-class="{ \'disable-is-me\': isMe }" ng-click="action(model)"><i class="fa fa-refresh fa-fw post-refresh"></i></a>'
        };
      });

    return module;

  });
