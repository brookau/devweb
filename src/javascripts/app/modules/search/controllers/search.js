define(function (require) {
  'use strict';

  var controller = function ($scope, $location, search) {
    $scope.params = $location.search();
    $scope.items = [];
    $scope.page = 1;
    $scope.per_page = 20;

    $scope.onLoading = false;
    $scope.stopLoadMore = false;

    $scope.loadMore = function () {
      if ($scope.onLoading || $scope.stopLoadMore) {
        return;
      }

      $scope.onLoading = true;

      search.find({ q: $scope.params.q, page: $scope.page, per_page: $scope.per_page })
        .success(function (data) {
          var items = data.result.items;
          $scope.items = $scope.items.concat(items);
          $scope.page++;
          $scope.stopLoadMore = items.length < $scope.per_page;
          $scope.onLoading = false;
        });
    };
  };

  return ['$scope', '$location', 'searchFactory', controller];
});
