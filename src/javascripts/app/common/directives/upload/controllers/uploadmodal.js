define(function (require) {
  'use strict';

  return ['$scope', '$modalInstance', 'modalType',
    function ($scope, $modalInstance, modalType) {
      $scope.postFormType = 'text';

      $scope.modalData = {
        'title': '',
        'description': ''
      };

      $scope.closeDialog = function () {
        $modalInstance.close();
      };

      $scope.submitDialog = function () {
        $modalInstance.close();
      };

      $scope.init = function () {
        $scope.postFormType = modalType;
      };

      $scope.init();
    }
  ];
});
