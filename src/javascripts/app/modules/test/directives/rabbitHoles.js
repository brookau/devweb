define([
  'angular',
  'text!../templates/rabbitHoles.html',
  'app/common/services/rabbitHoleService'
],
function(angular, rabbitHolesTemplate) {
  'use strict';

  return angular.module('ernr.post.directives.rabbitHoles', [
      'ernr.rabbitHoleService'
    ])
    .controller('rabbitHolesController', ['$scope', 'rabbitHoleFactory',
      function ($scope, rabbitHole) {
        $scope.offset = 0;
        $scope.size = 5;
        $scope.limit = parseInt($scope.size, 10);
        $scope.isDisabled = false;
        $scope.rabbitHoles = [];
        $scope.total = 0;
        function parse(result) {
          if ( !(result && result.data && result.data.hits && result.data.hits.hits) ) {
            //console.error('parse rabbitHole error');
            return false;
          }
          //$scope.total = result.data.hits.total;
          var res = result.data.hits.hits.map(function (e) {
            //console.log(e._source);
            // construct thumb

            // we have thumb from url but later we wont.
            e._source.thumb_type = e._source.thumb_type.replace('jpeg', 'jpg');

            e._source.thumb = 'http://cdn1.small.rabadaba.com/dev/thumbs/posts/' + e._source.id + '/s/1.'+ e._source.thumb_type;

            return e._source;
          });

          if (res.length < $scope.limit) {
            $scope.isDisabled = true;
          }

          $scope.total = result.data.hits.total;
          $scope.rabbitHoles = $scope.rabbitHoles.concat(res);
        }

        $scope.update = function () {
          console.log($scope.post);

          rabbitHole.get($scope.post, $scope.offset, $scope.limit).then(parse);
        };

        $scope.next = function () {
          var isNext;

          $scope.offset += $scope.limit;

          isNext = !$scope.isDisabled && ($scope.offset + $scope.limit) < ($scope.total + $scope.size);
          if (isNext) {
            $scope.update();
          }
        };

        $scope.prev = function () {
          $scope.offset -= $scope.limit;
        };

        //$scope.update();
      }
    ])
    .directive('rabbitHoles', function() {
      return {
        restrict: 'EA',

        controller: 'rabbitHolesController',
        template: rabbitHolesTemplate
      };
    });
});
