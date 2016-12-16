define([
  'angular',
  'angularBootstrap',
  'text!./templates/signInUpModal.html',
  'angularReCaptcha',
  'angular-messages',
  'app/common/context/user',
  'app/common/services/loginService',
  'app/common/services/userCreationService'
],
function (angular, angularBootstrap, templateModal) {
  'use strict';

  return angular.module('ernr.directives.signInUp', [
    'reCAPTCHA',
    'ui.bootstrap',
    'ngMessages',
    'ernr.userService',
    'ernr.loginService',
    'ernr.userCreationService'
  ])
  .config(['reCAPTCHAProvider', function (reCAPTCHAProvider) {
    reCAPTCHAProvider.setPublicKey('6LemHgITAAAAAFpb1visOPxdCRnrAsTid-qAqqNQ');
    reCAPTCHAProvider.setOptions({
      theme: 'white'
    });
  }])
  .controller("signInUpController", [
              "$scope",
              "$modalInstance",
              "loginFactory",
              "userCreationFactory",
              "state",
    function ($scope, $modalInstance, loginFactory, userCreationFactory, state) {
      var prevState;

      $scope.state = state;
      $scope.isPending = false;
      $scope.data = {};

      $scope.setState = function (state) {
        $scope.state = state;
      };

      $scope.setPrevState = function () {
        $scope.state = prevState;
      };

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.login = function (e) {
        e.preventDefault();

        $scope.isPending = true;
        loginFactory.login($scope.data.username, $scope.data.password)
          .then(function (data) {
            $modalInstance.close();
          })
          .catch(function (data) {
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.signUp = function (e) {
        e.preventDefault();

        $scope.isPending = true;
        userCreationFactory.create($scope.data)
          .success(function (data) {
            $scope.state = 'success';
            $scope.isPending = false;
          })
          .error(function (data) {
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.$watch('state', function (newValue, oldValue) {
        var validValues = ['signin', 'forgot', 'error', 'success', 'signup'],
          isValid = validValues.indexOf(newValue) >= 0;

        if (isValid) {
          $scope.state = newValue;
          prevState = oldValue;
          $scope.isPending = false;
        } else {
          $scope.state = oldValue;
        }
      });
    }
  ])
  .directive("signInUp", function () {
    return {
      restrict: 'A',
      scope: {
        state: '@signInUp'
      },
      controller: ['$scope', '$modal', 'userFactory',
        function ($scope, $modal, currentUser) {
          $scope.currentUser = currentUser;
          
          $scope.action = function () {
            var modalInstance = $modal.open({
              template: templateModal,
              controller: "signInUpController",
              keyboard: false,
              resolve: {
                state: function () {
                  var res = $scope.state;

                  if (!res) {
                    res = 'signin';
                  }

                  return res;
                }
              }
            });
          };
        }
      ],
      link: function (scope, element, attr) {
        element.on('click', scope.action);
      }
    };
  });
});

