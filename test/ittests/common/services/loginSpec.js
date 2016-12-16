define(['loginService', 'angular', 'angularMocks'], function(loginService, angular) {
  describe('Login in', function() {

    var loginFactory, scope;

    beforeEach(module('ernr.loginService'));

    beforeEach(inject(function (_loginFactory_, $rootScope) {
        scope = $rootScope.$new();
        scope.requestSended = false;
        loginFactory = _loginFactory_;
    }));

    it('test login', function() {
      loginFactory.loginRequest(scope, 'http://api.dev.rabadaba.com/account/login', {
        login: 123, password: 'qwe'
      });
      expect(scope.requestSended).to.equal(true);

      loginFactory.loginRequest(scope, '', {
        login: 123, password: 'qwe'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.loginRequest(scope, 'http://api.dev.rabadaba.com/account/login', {
        login: 123, password: ''
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.loginRequest(scope, 'http://api.dev.rabadaba.com/account/login', {
        password: 'qwe'
      });
      expect(scope.requestSended).to.equal(false);
    });
  });
});