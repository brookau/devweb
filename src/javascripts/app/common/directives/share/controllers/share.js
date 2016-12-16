define(function (require) {
  'use strict';

  function controller ($scope, $modalInstance) {
    $scope.data = {};

    $scope.send = function () {
      $modalInstance.close($scope.data);
    };

    $scope.closeDialog = function () {
      $modalInstance.dismiss('cancel');
    };
  }

  return ['$scope', '$modalInstance', controller];
});
