define(['angular'], function (angular) {
  'use strict';

  return angular.module('ernr.directives.defaultSrc', [])
    .directive('defaultSrc', function() {
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attr) {
          element.on('error', function() {
            element[0].src = '/img/user-ico.png';
          });
        }
      };
    });
});
