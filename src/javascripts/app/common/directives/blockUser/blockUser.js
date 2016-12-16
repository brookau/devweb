define([
  'angular',
  'text!./templates/blockUserModal.html',
  'text!./templates/unBlockUserModal.html',
  'app/common/services/blockListService',
  'angularBootstrap'
],
function (angular, blockUserTemplate, unBlockUserTemplate, blockListService) {
  'use strict';

  var module = angular.module('ernr.directives.blockUser', [
    'ui.bootstrap',
    'ernr.blockListService'
  ])
  .controller('blockUserModalCtrl', ['$scope', '$modalInstance',
    function controller ($scope, $modalInstance) {
      $scope.block = function () {
        $modalInstance.close();
      };

      $scope.closeDialog = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ])
  .directive("blockUser", ['blockListFactory', function (blockList) {
    return {
      restrict: 'A',
      scope: {
        userId: '='
      },
      controller: [
        '$scope',
        '$modal',
        function ($scope, $modal) {
          $scope.showBlockUserPopUp = function () {
            var modalInstance = $modal.open({
              template: blockUserTemplate,
              controller: 'blockUserModalCtrl',
              backdrop: 'static',
              keyboard: false
            });

            modalInstance.result.then(function () {
              blockList.add($scope.userId)
                .success(function (data) {
                  console.info('blockUser success', data);
                })
                .error(function (data) {
                  console.error('blockUser error', data);
                });
            });
          };

          $scope.showUnBlockUserPopUp = function () {
            var modalInstance = $modal.open({
              template: unBlockUserTemplate,
              controller: 'blockUserModalCtrl',
              backdrop: 'static',
              keyboard: false
            });

            modalInstance.result.then(function () {
              blockList.remove($scope.userId)
                .success(function (data) {
                  console.info('unBlockUser success', data);
                })
                .error(function (data) {
                  console.error('unBlockUser error', data);
                });
            });
          };
        }
      ],
      link: function (scope, element, attr) {
        if (blockList.isBlocked(scope.userId)) {
          element.on('click', scope.showUnBlockUserPopUp);
        } else {
          element.on('click', scope.showBlockUserPopUp);
        }
      }
    };
  }]);

  return module;
});

