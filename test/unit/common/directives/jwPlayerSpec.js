define(function(require) {
  'use strict';

  var angular = require('angular'),
      jwPlayerModule = require('app/common/directives/jwPlayer'),
      $compile, $scope;

  describe('jwPlayer directive', function() {
    beforeEach(module('ernr.directives.jwPlayer'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      });
    });

    it('should be a valid module', function() {
      expect(jwPlayerModule).to.be.an('object');
    });
  });
});
