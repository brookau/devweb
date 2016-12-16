define([
  'angular',
  'text!./templates/followButtonTpl.html',
  'app/common/directives/signInUp/signInUp',
  'angularBootstrap',
  'app/common/resources/constants/constants',
  'app/common/services/followService',
  'app/common/services/tagsService',
  'app/common/context/user'
],

function (angular, followButtonTpl) {

  return angular.module('ernr.directives.followButton', [
    'ui.bootstrap',
    'common.resources.constant',
    'ernr.followService',
    'ernr.userService',
    'ernr.tagsService'
  ])
    .directive("followButton", function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          userId: '=',
          tagId: '='
        },
        controller: [
          '$scope',
          '$modal',
          'followFactory',
          'userFactory',
          'tagsFactory',
          function ($scope, $modal, follow, user, tags) {
            $scope.isLoading = false;
            $scope.user = user;

            if ($scope.userId) {
              $scope.isFollowing = follow.isFollowing($scope.userId);
            } else if ($scope.tagId) {
              $scope.isFollowing = tags.isFollowing($scope.tagId);
            } else {
              $scope.isFollowing = false;
            }

            function followUser() {
              $scope.isLoading = true;

              follow.follow($scope.userId).success(function (data) {
                $scope.isFollowing = true;
                $scope.isLoading = false;
              });
            }

            function followTag() {
              $scope.isLoading = true;

              tags.follow($scope.tagId).success(function (data) {
                $scope.isFollowing = true;
                $scope.isLoading = false;
              });
            }

            function unFollowUser() {
              $scope.isLoading = true;

              follow.unfollow($scope.userId).success(function (data) {
                $scope.isFollowing = false;
                $scope.isLoading = false;
              });
            }

            function unFollowTag() {
              $scope.isLoading = true;

              tags.unfollow($scope.tagId).success(function (data) {
                $scope.isFollowing = false;
                $scope.isLoading = false;
              });
            }

            $scope.action = function () {
              if ($scope.isLoading) {
                return false;
              }

              if ($scope.isFollowing) {
                if ($scope.userId) {
                  unFollowUser();
                } else if ($scope.tagId) {
                  unFollowTag();
                }
              } else {
                if ($scope.userId) {
                  followUser();
                } else if ($scope.tagId) {
                  followTag();
                }
              }
            };

            $scope.$watch('isFollowing', function (newValue) {
              $scope.caption = (newValue) ? 'unfollowing' : 'following';
            });
          }
        ],
        template: followButtonTpl
      };
    });
});
