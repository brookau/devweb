define(function(require) {
  'use strict';

  var angular = require('angular'),
      share = require('app/common/directives/share/share'),
      userFactory, $compile, $rootScope;

  describe('Share directive', function() {
    beforeEach(module('ernr.directives.share'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_, _userFactory_) {
        userFactory = _userFactory_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      });
    });

    it('should be a valid module', function() {
      expect(share).to.be.an('object');
    });

    it('should has the share directive', function() {
      var element = $compile("<span share model='{ user_id: 1 }'></span>")($rootScope);
      $rootScope.$digest();
      expect(element.find('i').attr('class')).to.equal('fa fa fa-share post-share');
    });
  });
});
