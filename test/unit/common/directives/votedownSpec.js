define(function(require) {
  'use strict';

  var angular = require('angular'),
      votedown = require('app/common/directives/votedown'),
      userFactory, $compile, $rootScope;

  describe('Vote Down directive', function() {
    beforeEach(module('ernr.directives.votedown'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_, _userFactory_) {
        userFactory = _userFactory_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      });
    });

    it('should be a valid module', function() {
      expect(votedown).to.be.an('object');
    });

    it('should has votedown derective', function() {
      var element = $compile("<span votedown model='post'></span>")($rootScope);
      $rootScope.$digest();
      expect(element.length).to.equal(1);
    });
  });
});
