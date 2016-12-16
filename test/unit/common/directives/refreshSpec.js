define(function(require) {
  'use strict';

  var angular = require('angular'),
      refresh = require('app/common/directives/refresh'),
      userFactory, $compile, $rootScope;

  describe('Refresh directive', function() {
    beforeEach(module('ernr.directives.refresh'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_, _userFactory_) {
        userFactory = _userFactory_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      });
    });

    it('should be a valid module', function() {
      expect(refresh).to.be.an('object');
    });

    it('should has the refresh directive', function() {
      var element = $compile("<span refresh model='{ user_id: 1 }'></span>")($rootScope);
      $rootScope.$digest();
      expect(element.find('i').attr('class')).to.equal('fa fa-refresh fa-fw post-refresh');
    });
  });
});
