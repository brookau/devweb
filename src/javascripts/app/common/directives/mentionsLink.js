define(['angular'],
  function (angular) {
    'use strict';

    var module = angular.module('ernr.directives.mentionsLink', [])
      .directive('mentionsLink', function ($compile) {
        return {
          restrict: 'E',
          scope: {
            text: '='
          },
          link: function (scope, el, attrs) {
            var reg = new RegExp('@([a-zA-Z0-9])*', 'g');

            var text = scope.text.replace(reg, function (str) {
              var name = str.replace(/@/g, '');
              return '<a href="/users/' + name + '"><b>' + str + '</b></a>';
            });

            el.html(text);
          },
        };
      });

    return module;

  });
