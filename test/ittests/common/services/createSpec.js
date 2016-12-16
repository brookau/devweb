define(['loginService', 'angular', 'angularMocks'], function(loginService, angular) {
  describe('Create new account', function() {

    var loginFactory, scope;

    beforeEach(module('ernr.loginService'));

    beforeEach(inject(function (_loginFactory_, $rootScope) {
        scope = $rootScope.$new();
        scope.requestSended = false;
        loginFactory = _loginFactory_;
    }));

    it('test create', function() {
      loginFactory.createRequest(scope, 'http://api.dev.rabadaba.com/account/create', {
        username: 'zero', email: 'zero@zero.com', password: 'zero'
      });
      expect(scope.requestSended).to.equal(true);

      loginFactory.createRequest(scope, '', {
        username: 'zero', email: 'zero@zero.com', password: 'zero'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.createRequest(scope, 'http://api.dev.rabadaba.com/account/create', {
        username: '', email: 'zero1@zero.com', password: 'zero1'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.createRequest(scope, 'http://api.dev.rabadaba.com/account/create', {
        username: 'zero2', email: '', password: 'zero2'
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.createRequest(scope, 'http://api.dev.rabadaba.com/account/create', {
        username: 'zero3', email: 'zero3@zero.com', password: ''
      });
      expect(scope.requestSended).to.equal(false);

      loginFactory.createRequest(scope, 'http://api.dev.rabadaba.com/account/create', {});
      expect(scope.requestSended).to.equal(false);

      loginFactory.createRequest(scope, 'http://api.dev.rabadaba.com/account/create', {
        username: 'zero4', email: 'zero4zero.com', password: 'zero'
      });
      expect(scope.requestSended).to.equal(false);

    });
  });
});