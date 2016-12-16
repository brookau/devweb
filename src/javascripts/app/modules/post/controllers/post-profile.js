define([
  'isMobile'
], function (isMobile) {
  'use strict';

  var controller = function ($scope, $sce, userFactory, $routeParams, paths, postFactory) {
    $scope.paths = paths;

    $scope.isMobile = isMobile;
    $scope.isMe = true;

    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };

    postFactory.getPostById($routeParams.id)
      .success(function (data) {
        $scope.post = data.result;
        $scope.isMe = userFactory.getInfo().id === $scope.post.user_id;
      });
  };

  return [
    '$scope',
    '$sce',
    'userFactory',
    '$routeParams',
    'paths',
    'postFactory',
    controller
  ];
});
