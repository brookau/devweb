define(function (require) {
  'use strict';

  return ['$scope', '$modalInstance', 'userCreationFactory',
    function ($scope, $modalInstance, userCreationFactory) {
      $scope.isPending = false;
      $scope.message = '';
      $scope.data = {};
      $scope.state = 'form';

      $scope.showForm = function () {
        $scope.state = 'form';
      };

      $scope.closeDialog = function () {
        $modalInstance.close();
      };

      $scope.submitDialog = function () {
        $scope.isPending = true;
        userCreationFactory.create($scope.data)
          .success(function (data) {
            $scope.state = 'success';
          })
          .error(function (data) {
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.$watch('state', function (newValue, oldValue) {
        var validValues = ['form', 'error', 'success'],
            isValid = validValues.indexOf(newValue) >= 0;

        if (isValid) {
          $scope.state = newValue;
          $scope.isPending = false;
        } else {
          $scope.state = oldValue;
        }
      });
    }
  ];

});
