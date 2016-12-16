define(function(require) {
  'use strict';

  var angular = require('angular'),
      userCreationService = require('app/common/services/userCreationService'),
      userCreationFactory, $httpBackend, constant;

  describe('user creation service', function() {
    beforeEach(module('ernr.userCreationService'));

    beforeEach(function() {
      inject(function(_userCreationFactory_, _$httpBackend_, _apiDomain_) {
        userCreationFactory = _userCreationFactory_;
        $httpBackend = _$httpBackend_;
        constant = _apiDomain_;
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be a valid service', function() {
      expect(userCreationService).to.be.an('object');
    });

    it('should has the create method', function() {
      expect(userCreationFactory.create).to.be.an('function');
    });

    it('should return a promises when call to the create method', function() {
      expect(userCreationFactory.create()).to.be.an('object');
      expect(userCreationFactory.create().then).to.be.an('function');
      expect(userCreationFactory.create().success).to.be.an('function');
    });

    it('should send a request when call to the create method', function() {
      var request,
          url = constant.domain + '/account/create',
          params = {
            username: 'Test-name',
            email: 'test@example.com',
            password: 'password'
          },
          respond = {
            "error": "",
            "result": {
              "success": true
            }
          };

      $httpBackend.when('POST', url).respond(respond);
      $httpBackend.expectPOST(url, params);

      userCreationFactory.create(
        params.username,
        params.email,
        params.password
      ).success(function (data) {
        request = data;
      });

      $httpBackend.flush();

      expect(request.result.success).to.equal(true);
    });
  });
});
