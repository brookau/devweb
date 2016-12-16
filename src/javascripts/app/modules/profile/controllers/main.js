/*global RGraph:false */
define(function () {
  'use strict';

  var controller = [
    '$scope',
    '$routeParams',
    'profileFactory',
    'userFactory',
    'uploadFileFactory',
    '$window',
    function ($scope, $routeParams, profileFactory, currentUser, uploadFile, $window) {
      $scope.currentUser = currentUser;
      $scope.isPending = false;
      $scope.avatar = {};

      $scope.isFileAPISupported = !!($window.File && $window.FileReader && $window.FileList && $window.Blob);

      function saveProfile() {
        profileFactory.setProfile($scope.info)
          .success(function (data) {
            $scope.isPending = false;
            currentUser.fillInfo(data.result);
          });
      }

      $scope.save = function (e) {
        e.preventDefault();
        $scope.isPending = true;

        if (!$scope.avatar.blob) {
          saveProfile();
          return false;
        }

        uploadFile.uploadAvatar($scope.avatar.blob)
          .success(function (data) {
            $scope.info.avatar = data.result.url;
            saveProfile();
          });
      };

      $scope.$watch('currentUser.isLoggedIn', function (newValue, oldValue) {
        $scope.isLoggedIn = newValue;
        $scope.info = currentUser.getInfo();
        $scope.avatar = {
          url: $scope.info.avatar
        };
      });
    }
  ];

  return controller;
});
