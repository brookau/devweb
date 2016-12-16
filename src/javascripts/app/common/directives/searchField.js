define(['angular'],
  function (angular) {
    'use strict';

    return angular.module('ernr.directives.searchField', [])
      .directive("searchField", function () {
        return {
          restrict: 'A',
          replace: true,
          controller: ['$scope', '$location', function ($scope, $location) {
            $scope.params = $location.search();

            $scope.search = function (e) {
              if (e.keyCode === 13) {
                $location.path('search');
                $location.search($scope.params);
              }
            };
          }],
          template: '<input ng-model="params.q" ng-keypress="search($event)" type="text" />'
        };
      });
  });
