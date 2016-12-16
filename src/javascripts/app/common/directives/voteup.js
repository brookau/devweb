define([
    'angular',
    'angularBootstrap',
    'text!./../../modules/navbar/templates/signin.html',
    './../../modules/navbar/controllers/signInModalController',
    'app/common/context/user',
    'app/common/services/voteService'
  ],
  function (angular,
            angularBootstrap,
            signInTemplate,
            signInController) {
    'use strict';

    var module = angular.module('ernr.directives.voteup', [
      'ui.bootstrap',
      'ernr.userService',
      'ernr.voteService',
    ])
      .directive("voteup", function () {
        return {
          restrict: 'A',
          scope: {
            model: '='
          },
          controller: [
            '$scope',
            '$modal',
            'userFactory',
            'voteFactory',
            function ($scope, $modal, currentUser, vote) {
              function voteup () {
                vote.up($scope.model.id)
                  .success(function (data) {
                    $scope.model.votessum = data.result.votessum;
                    $scope.model.votesdown = data.result.votesdown;
                    $scope.model.votesup = data.result.votesup;
                    $scope.model.balance = data.result.balance;
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
                  voteup(m);
                }, function (r) {
                });
              }

              $scope.action = function () {
                if (currentUser.isLoggedIn) {
                  voteup();
                } else {
                  openSignInModal();
                }
              };
            }
          ],
          link: function (scope, element, attr) {
            element.on('click', scope.action);
          }
        };
      });

    return module;

  });
