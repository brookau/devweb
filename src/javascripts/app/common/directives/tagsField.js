define([
    'angular',
    'lodash',
    'ngTagsInput',
    'app/common/services/tagsService'
  ],
  function (angular, _) {
    'use strict';

    return angular.module('ernr.directives.tagsField', [
      'ngTagsInput',
      'ernr.tagsService'
    ])
      .directive("tagsField", function () {
        return {
          restrict: 'E',
          transclude: true,
          scope: {
            tags: '='
          },
          controller: ['$scope', '$q', 'tagsFactory', function ($scope, $q, tags) {
            if (!angular.isArray($scope.tags)) {
              $scope.tags = [];
            }

            $scope.innerTags = $scope.tags.map(function (tag) {
              return { id: tag };
            });

            $scope.loadTags = function (query) {
              var deferred = $q.defer();

              tags.autocomplete(query).success(function (data) {
                deferred.resolve(data.result.items);
              });

              return deferred.promise;
            };

            $scope.$watch('innerTags', function (newValue) {
              $scope.tags = _.compact(newValue.map(function (tag) {
                return tag.id.replace(/#/g, '');
              }));

              $scope.innerTags = $scope.tags.map(function (tag) {
                return { id: tag };
              });
            }, true);
          }],
          template: '<tags-input ng-model="innerTags" replace-spaces-with-dashes="false" add-on-space="true" display-property="id">' +
          '<auto-complete source="loadTags($query)"></auto-complete>' +
          '</tags-input>'
        };
      });
  });
