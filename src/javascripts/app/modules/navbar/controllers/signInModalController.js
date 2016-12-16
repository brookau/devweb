define(function () {
  'use strict';

  return ['$scope', '$modalInstance', 'loginFactory', 'userFactory', 'profileFactory',
    function ($scope, $modalInstance, loginFactory, currentUser, profileFactory) {
      $scope.isValid = false;
      $scope.isPending = false;
      $scope.message = '';
      $scope.data = {};
      $scope.state = 'signin';

      $scope.closeDialog = function () {
        $modalInstance.close();
      };

      $scope.showForgotForm = function (e) {
        e.preventDefault();
        $scope.state = 'forgot';
      };

      $scope.showSignInForm = function (e) {
        e.preventDefault();
        $scope.state = 'signin';
      };

      $scope.submitDialog = function (e) {
        e.preventDefault();

        if (!$scope.isValid) {
          return false;
        }

        $scope.isPending = true;
        loginFactory.login($scope.data.login, $scope.data.password)
          .then(function (data) {
            $modalInstance.close();
          })
          .catch(function (data) {
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.$watch('data', function (newValue, oldValue) {
        var isLogin = newValue.login && newValue.login.length >= 3,
          isPassword = newValue.password && newValue.password.length > 0;

        $scope.isValid = isLogin && isPassword;
      }, true);

      $scope.$watch('state', function (newValue, oldValue) {
        var validValues = ['signin', 'forgot', 'error', 'success'],
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
