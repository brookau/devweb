define(function(require) {
  'use strict';

  var angular = require('angular'),
      voteup = require('app/common/directives/voteup'),
      userFactory, $compile, $rootScope;

  describe('Vote Up directive', function() {
    beforeEach(module('ernr.directives.voteup'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_, _userFactory_) {
        userFactory = _userFactory_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      });
    });

    it('should be a valid module', function() {
      expect(voteup).to.be.an('object');
    });

    it('should has the voteup directive', function() {
      var element = $compile("<span voteup model='post'></span>")($rootScope);
      $rootScope.$digest();
      expect(element.length).to.equal(1);
    });
  });
});
