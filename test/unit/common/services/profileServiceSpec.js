define(function(require) {
  'use strict';

  var angular = require('angular'),
      profileService = require('app/common/services/profileService'),
      profileFactory;

  describe('login service', function() {
    beforeEach(module('ernr.ProfileService'));

    beforeEach(function() {
      inject(function(_profileFactory_) {
        profileFactory = _profileFactory_;
      });
    });

    it('should be a valid service', function() {
      expect(profileService).to.be.an('object');
    });

    it('should has the getProfile method', function() {
      expect(profileFactory.getProfile).to.be.an('function');
    });

    it('should has the setProfile method', function() {
      expect(profileFactory.setProfile).to.be.an('function');
    });

    it('should return promises when call to getProfile function', function() {
      expect(profileFactory.getProfile()).to.be.an('object');
      expect(profileFactory.getProfile().then).to.be.an('function');
      expect(profileFactory.getProfile().catch).to.be.an('function');
    });

    it('should return promises when call to setProfile function', function() {
      expect(profileFactory.setProfile()).to.be.an('object');
      expect(profileFactory.setProfile().then).to.be.an('function');
      expect(profileFactory.setProfile().success).to.be.an('function');
    });
  });
});
