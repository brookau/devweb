define([
  'angular',
  'text!./templates/feedFilters.html'
],

function (angular, feedFiltersTemplate) {

  return angular.module('ernr.directives.feedFilters', [])
    .directive("feedFilters", function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          filter: '=ngModel'
        },
        controller: ['$scope', function ($scope) {
          if (!$scope.filter) {
            $scope.filter = { type: '', datestamp: '' };
          }

          $scope.changeType = function (type) {
            if (type === $scope.filter.type) {
              $scope.filter.type = '';
            } else {
              $scope.filter.type = type;
            }
          };

          $scope.changeDate = function (datestamp) {
            if (datestamp === $scope.filter.datestamp || datestamp === 'recent') {
              $scope.filter.datestamp = '';
            } else {
              $scope.filter.datestamp = datestamp;
            }
          };
        }],
        template: feedFiltersTemplate
      };
    });

});
