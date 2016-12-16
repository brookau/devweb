define([
    'angular',
    'angularBootstrap',
    'text!./../../modules/navbar/templates/signin.html',
    './../../modules/navbar/controllers/signInModalController',
    'app/common/context/user',
    'app/common/services/favoritesService'
  ],
  function (angular,
            angularBootstrap,
            signInTemplate,
            signInController) {
    'use strict';

    var module = angular.module('ernr.directives.like', [
      'ui.bootstrap',
      'ernr.userService',
      'ernr.favoritesService'
    ])
      .directive("like", function () {
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
            'favoritesFactory',
            function ($scope, $modal, currentUser, favorites) {

              function like(model) {
                favorites.add(model.id)
                  .success(function (data) {
                    $scope.isLike = true;
                    $scope.model.favorites = data.result.favorites;
                  });
              }

              function unlike(model) {
                favorites.remove(model.id)
                  .success(function (data) {
                    $scope.isLike = false;
                    $scope.model.favorites -= 1;
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
                  like(m);
                }, function (r) {
                });
              }

              $scope.isLike = favorites.isLike($scope.model.id);

              $scope.action = function (model) {
                if (currentUser.isLoggedIn && !$scope.isLike) {
                  like(model);
                } else if (currentUser.isLoggedIn && $scope.isLike) {
                  unlike(model);
                } else {
                  openSignInModal(model);
                }
              };
            }
          ],
          template: '<a ng-click="action(model)"><i class="fa fa-fw post-like" ng-class="{ \'fa-heart\': isLike, \'fa-heart-o\': !isLike }"></i></a>'
        };
      });

    return module;

  });
