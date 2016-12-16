define([
  'angular',
  'app/common/services/followService',
  'text!./templates/followingTpl.html',
  'app/common/directives/follow/followCard',
  'app/common/directives/defaultSrc'
],

function (angular, followService, followingTpl) {

  return angular.module('ernr.directives.following', [
    'ernr.followService',
    'ernr.directives.followCard',
    'ernr.directives.defaultSrc'
  ])
    .directive("following", function () {
      return {
        restrict: 'A',
        scope: {
          userId: '='
        },
        controller: ['$scope', 'followFactory',  function ($scope, follow) {
          $scope.users = [];
          $scope.page = 1;
          $scope.per_page = 20;
          $scope.onLoading = false;
          $scope.stopLoadMore = false;

          $scope.loadMore = function () {
            if ($scope.onLoading || $scope.stopLoadMore) {
              return;
            }

            $scope.onLoading = true;

            follow.getFollowing({ page: $scope.page, per_page: $scope.per_page }, $scope.userId)
              .success(function (data) {
                var items = data.result.items;
                $scope.users = $scope.users.concat(items);
                $scope.page++;
                $scope.stopLoadMore = items.length < $scope.per_page;
                $scope.onLoading = false;
              });
          };
        }],
        template: followingTpl
      };
    });
});

