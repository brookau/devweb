define([
  'isMobile'
], function (isMobile) {
  'use strict';

  var angular = require('angular'),
    controller = function ($scope, $sce, $http) {
    $scope.query = {};

    console.log('post test');
    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };
    $scope.testQuery = function() {
      console.log($scope.query);
      var x = angular.element(document.getElementById('testQ'));
      var query = x.context.value;
      
      $http.post('http://apiuser:wxs123Qsxa45QaP1uL@posts-prod.rabadaba.com' + '/_search', query)
      .success(function (data, status) {
        $scope.results = data.hits.hits;
        $scope.stats = data;
        console.log(data);
      })
      .error(function (data, status) {
      });

    };
    
  };

  return [
    '$scope',
    '$sce',
    '$http',
    controller
  ];
});
