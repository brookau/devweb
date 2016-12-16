define([
  'angular',
  'text!./templates/followCardTpl.html',
  'app/common/directives/follow/followButton'
],

function (angular, followCardTpl) {
  return angular.module('ernr.directives.followCard', [
    'ernr.directives.followButton'
  ])
    .directive("followCard", function () {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          user: '=followCard'
        },
        template: followCardTpl
      };
    });
});
