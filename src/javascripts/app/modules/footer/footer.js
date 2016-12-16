/* istanbul ignore next */
define(function(require) {
    'use strict';
    var angular = require('angular'),
        template = require('text!./footer.html'),
        module;

    module = angular.module('ernr.footer', []);

    // Add navbar into the cache so ng-include can resolve and not go into an infinite loop
    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('footer', template);
    }]);

    return module;
});