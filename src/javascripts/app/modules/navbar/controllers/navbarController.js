define([
    'text!../templates/signup.html',
    './signUpModalController',
    'text!../templates/signin.html',
    './signInModalController'
  ],
  function (signUpTemplate,
            signUpController,
            signInTemplate,
            signInController) {
    'use strict';

    return ['$scope', '$modal', '$route', 'userFactory', 'loginFactory',
      function ($scope, $modal, $route, currentUser, loginFactory) {
        $scope.currentUser = currentUser;

        $scope.isSearchPage = function () {
          return $route.current.originalPath === "/search";
        };

        $scope.signout = function (e) {
          e.preventDefault();
          loginFactory.logout();
        };

        $scope.openSignUpModal = function (e) {
          e.preventDefault();
          var modalInstance = $modal.open({
            template: signUpTemplate,
            controller: signUpController,
            backdrop: 'static',
            keyboard: false
          });
        };

        $scope.openSignInModal = function (e) {
          e.preventDefault();
          var modalInstance = $modal.open({
            template: signInTemplate,
            controller: signInController,
            backdrop: 'static',
            keyboard: false
          });
        };
      }
    ];
  });
