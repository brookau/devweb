define(['loginService', 'angular', 'angularMocks'], function(loginService, angular) {
  describe('Validation', function() {

    var loginFactory, scope;

    beforeEach(module('ernr.loginService'));

    beforeEach(inject(function (_loginFactory_, $rootScope) {
        scope = $rootScope.$new();
        scope.requestSended = false;
        loginFactory = _loginFactory_;
    }));

    it('test validation', function() {
      loginFactory.validRequest(scope, 'http://api.dev.rabadaba.com/account/validate', {
        username: 'zero', code: '123'
      });
      expect(scope.requestSended).to.equal(true);

      loginFactory.validRequest(scope, '', {
        username: 'zero', code: '123'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.validRequest(scope, 'http://api.dev.rabadaba.com/account/validate', {
        username: 'zero'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.validRequest(scope, 'http://api.dev.rabadaba.com/account/validate', {
        code: '123'
      });
      expect(scope.requestSended).to.equal(false);
    });
  });
});