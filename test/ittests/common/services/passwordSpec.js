define(['loginService', 'angular', 'angularMocks'], function(loginService, angular) {
  describe('Forgot password', function() {

    var loginFactory, scope;

    beforeEach(module('ernr.loginService'));

    beforeEach(inject(function (_loginFactory_, $rootScope) {
        scope = $rootScope.$new();
        scope.requestSended = false;
        loginFactory = _loginFactory_;
    }));

    it('test forgot password', function() {
      loginFactory.passwordRequest(scope, 'http://api.dev.rabadaba.com/account/password', {
        email: 'asd@zero.com'
      });
      expect(scope.requestSended).to.equal(true);

      loginFactory.passwordRequest(scope, '', {
        email: 'zero@zero.com'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.passwordRequest(scope, 'http://api.dev.rabadaba.com/account/password', {
        email: 'zerozero.com'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.passwordRequest(scope, 'http://api.dev.rabadaba.com/account/password', {
        email: ''
      });
      expect(scope.requestSended).to.equal(false);
    });
  });
});