define(function(require) {
  'use strict';

  var angular = require('angular'),
      loginService = require('app/common/services/loginService'),
      loginFactory, userFactory;

  describe('login service', function() {
    beforeEach(module('ernr.loginService'));

    beforeEach(function() {
      inject(function(_loginFactory_, _userFactory_) {
        loginFactory = _loginFactory_;
        userFactory = _userFactory_;
      });
    });

    it('should be a valid service', function() {
      expect(loginService).to.be.an('object');
    });

    it('should has the login method', function() {
      expect(loginFactory.login).to.be.an('function');
    });

    it('should has the logout method', function() {
      expect(loginFactory.logout).to.be.an('function');
    });

    it('should change the userContext when call to logout method', function() {
      loginFactory.logout();
      expect(userFactory.isLoggedIn).to.equal(false);
    });

    it('should return promises when call to login function', function() {
      expect(loginFactory.login()).to.be.an('object');
      expect(loginFactory.login().then).to.be.an('function');
    });
  });
});
