define([
  'angular',
  'jwPlayer',
  'isMobile'
],
function (angular, jwplayer, isMobile) {
  'use strict';

  return angular.module('ernr.directives.jwPlayer', [])
    .constant('constants', {
      jwPlayerKey: 'd7DaazV+uAdVHOH7pVjuV6ZPUkhXO+eJIkqLYQ==',
      pathToFlashplayer: '/bower_components/jwplayer/jwplayer.flash.swf',
      pathToHtml5player: '/bower_components/jwplayer/jwplayer.html5.js'
    })
    .directive('jwPlayer', ['constants', function (constants) {
      jwplayer.key = constants.jwPlayerKey;

      return {
        restrict: 'E',
        scope: {
          src: '=',
          type: "=",
          id: '=jwplayerId',
          width: '=',
          height: '='
        },
        link: function (scope, el, attrs) {
          var id = 'jwplayer-' + scope.id,
              width, height;

          if (scope.width || scope.height) {
            width = scope.width;
            height = scope.height;
          } else {
            width  = isMobile.any ? 480 : 584;
            height = isMobile.any ? 270 : 328;

            if (scope.type === 'audio') {
              height = 30;
            }
          }

          el.attr('id', id);

          jwplayer(id).setup({
            file: scope.src,
            width: width,
            height: height,
            flashplayer: constants.pathToFlashplayer,
            html5player: constants.pathToHtml5player
          });
        },
        template: '<div class="jw-player-wrapper"></div>'
      };
    }]);
});
