define([
    'angular',
    'angular-moment',
    'text!./templates/feed.html',
    'app/common/directives/voteup',
    'app/common/directives/votedown',
    'app/common/directives/share/share',
    'app/common/directives/refresh',
    'app/common/directives/like',
    'app/common/directives/mentionsLink'
  ],
  function (angular, angularMoment, template) {
    'use strict';

    var module = angular.module('ernr.directives.feed', [
      'angularMoment',
      'ernr.directives.voteup',
      'ernr.directives.votedown',
      'ernr.directives.share',
      'ernr.directives.refresh',
      'ernr.directives.like',
      'ernr.directives.mentionsLink'
    ])
      .directive("feed", function () {
        return {
          restrict: 'A',
          replace: true,
          scope: {
            feed: '='
          },
          template: template,
          controller: ['$scope', '$sce', function ($scope, $sce) {
            $scope.getThumb = function() {
              console.log('getThumb');

              return '';
            };
            $scope.trustSrc = function (src) {
              return $sce.trustAsResourceUrl(src);
            };
          }]
        };
      });

    return module;
  });
