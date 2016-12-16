define([
  'angular',
  'text!./templates/userCard.html',
  'app/common/services/profileService',
  'app/common/context/user',
  'app/common/directives/blockUser/blockUser',
  'app/common/services/blockListService',
  'app/common/directives/defaultSrc'
],
function (angular, userCardTemplates) {
  return angular.module('ernr.directives.userCard', [
    'ernr.ProfileService' ,
    'ernr.userService',
    'ernr.directives.blockUser',
    'ernr.blockListService',
    'ernr.directives.defaultSrc'
  ])
    .directive("userCard", function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          userId: '='
        },
        controller: [
          '$scope',
          '$location',
          'profileFactory',
          'userFactory',
          'blockListFactory',
          function ($scope, $location, profile, currentUser, blockList) {
            $scope.isMe = !$scope.userId;
            $scope.isBlocked = blockList.isBlocked;

            if ($scope.isMe) {
              $scope.user = currentUser.getInfo();
            } else {
              profile.getProfile($scope.userId).then(function (data) {
                $scope.user = data;
              });
            }

            $scope.changeLocation = function (location) {
              var path;

              if ($scope.isMe) {
                if (!location) { location = ''; }

                path = 'dashboard/' + location;
              } else {
                path = '/users/' + $scope.userId + '/' + location;
              }
              $location.path(path);
            };
          }
        ],
        template: userCardTemplates
      };
    });
});


