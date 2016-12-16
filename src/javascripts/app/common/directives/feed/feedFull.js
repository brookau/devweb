define([
  'angular',
  'angular-moment',
  'text!./templates/feedFull.html',
  'app/common/directives/voteup',
  'app/common/directives/votedown',
  'app/common/directives/share/share',
  'app/common/directives/refresh',
  'app/common/directives/like',
  'app/common/directives/mentionsLink'
],
function (angular, angularMoment, template) {
  'use strict';

  var module = angular.module('ernr.directives.feedFull', [
    'angularMoment',
    'ernr.directives.voteup',
    'ernr.directives.votedown',
    'ernr.directives.share',
    'ernr.directives.refresh',
    'ernr.directives.like',
    'ernr.directives.mentionsLink'
  ])
    .directive("feedFull", function () {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          post: '=feedFull'
        },
        template: template,
        controller: ['$scope', '$sce', function ($scope, $sce) {
          $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
          };
        }]
      };
    });

  return module;
});

