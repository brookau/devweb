define([
  'angular',
  'text!./templates/reportModal.html',
  'app/common/services/reportService',
  'angularBootstrap'
],
function (angular, reportModalTemplate, reportService) {
  'use strict';

  var module = angular.module('ernr.directives.report', [
    'ui.bootstrap',
    'ernr.reportService'
  ])
  .controller('reportModalCtrl', ['$scope', '$modalInstance', 'showReason', 'target',
    function controller ($scope, $modalInstance, showReason, target) {
      $scope.data = {};
      $scope.showReason = showReason;
      $scope.target = target;

      $scope.chooseReason = function (reason) {
        $scope.data.reason = reason;

        if ($scope.target === 'comments') {
          $scope.data.message = reason;
          $modalInstance.close($scope.data);
          return false;
        }

        $scope.showReason = false;
      };

      $scope.send = function () {
        $modalInstance.close($scope.data);
      };

      $scope.closeDialog = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ])
  .directive("report", function () {
    return {
      restrict: 'A',
      scope: {
        target: '@',
        targetId: '=',
        showReason: '@'
      },
      controller: [
        '$scope',
        '$modal',
        'reportFactory',
        function ($scope, $modal, report) {
          $scope.showFlagPopUp = function () {
            var modalInstance = $modal.open({
              template: reportModalTemplate,
              controller: 'reportModalCtrl',
              keyboard: false,
              resolve: {
                showReason: function () {
                  return $scope.showReason;
                },
                target: function () {
                  return $scope.target;
                }
              }
            });

            modalInstance.result.then(function (data) {
              report.create($scope.target, $scope.targetId, data.reason, data.message)
                .success(function (data) {
                  console.info('report success', data);
                })
                .error(function (data) {
                  console.error('report error', data);
                });
            });
          };
        }
      ],
      link: function (scope, element, attr) {
        element.on('click', scope.showFlagPopUp);
      }
    };
  });

  return module;
});
