define([
  'angular',
  'angularBootstrap',
  'text!./../../../modules/navbar/templates/signin.html',
  './../../../modules/navbar/controllers/signInModalController',
  'text!./templates/share.html',
  './controllers/share',
  'app/common/context/user',
  'app/common/services/postService'
],
function (angular, angularBootstrap, signInTemplate, signInController, shareTemplate, shareController) {
  'use strict';

  var module = angular.module('ernr.directives.share', [
    'ui.bootstrap',
    'ernr.userService',
    'ernr.postService'
  ])
  .directive("share", function () {
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

          function share(mention) {
            var reg = new RegExp('@([a-zA-Z0-9])*', 'g');
            var isHasUsername = reg.test(mention);

            if (!mention || !isHasUsername) {
              return;
            }

            var userId = mention.replace(/@/g, '');

            posts.shareTo($scope.model.id, userId)
              .success(function (data) {
                console.log(data);
              });
          }

          function openSignInModal() {
            var modalInstance = $modal.open({
              template: signInTemplate,
              controller: signInController,
              backdrop: 'static',
              keyboard: false
            });

            modalInstance.result.then(function (rs) {
              share($scope.model);
            }, function (r) {
            });
          }

          function openModal() {
            if ($scope.isMe) {
              return;
            }

            var modalInstance = $modal.open({
              template: shareTemplate,
              controller: shareController,
              backdrop: 'static',
              keyboard: false
            });

            modalInstance.result.then(function (data) {
              share(data.mention);
            });
          }

          $scope.action = function () {
            if (currentUser.isLoggedIn) {
              openModal();
            } else {
              openSignInModal();
            }
          };
        }
      ],
      template: '<a href ng-class="{ \'disable-is-me\': isMe }" ng-click="action()"><i class="fa fa fa-share post-share"></i></a>'
    };
  });

  return module;

});
