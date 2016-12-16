define(function () {
  'use strict';

  var controller = function ($scope, $routeParams, $location) {
    $scope.state = $routeParams.page;
    $scope.userId = $routeParams.id;

    if (!$scope.state) {
      $location.path('/users/' + $routeParams.id + '/posts');
    }
  };

  return ['$scope', '$routeParams', '$location', controller];
});
