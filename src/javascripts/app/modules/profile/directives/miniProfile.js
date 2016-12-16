define([
      'text!./../miniProfile.html'
  ],
  function (template) {
    'use strict';

    var directive = function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            template: template,
            controller: ['$scope', 'userFactory', 'notifications', '$timeout', function ($scope, currentUser, notifications, $timeout) {
                $scope.info = currentUser.getInfo();

                notifications.onLoginSuccess($scope, function () {
                    $scope.info = currentUser.getInfo();
                });
            }],
            link: function (scope, element, attributes) {

            }
        };
    };

    return directive;
});