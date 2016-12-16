define(function(require) {
  'use strict';

  var angular = require('angular'),
      userCardModule = require('app/common/directives/userCard/userCard'),
      filters = require('app/common/filters'),
      $compile, $httpBackend, $scope, element, domain;

  describe('userCard directive', function() {
    beforeEach(module('ernr.directives.userCard'));
    beforeEach(module('ernr.filters'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_, _$httpBackend_, _apiDomain_) {
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
        $scope = _$rootScope_.$new(true);
        domain = _apiDomain_.domain;

        element = $compile("<user-card></user-card>")($scope);
      });
    });

    it('should be a valid module', function() {
      expect(userCardModule).to.be.an('object');
    });

    it('should has user\'s name', function () {
      var scope = element.isolateScope() || element.scope();

      scope.user = {
        id: "igor",
        user_name: "igor",
        username: "igor",
        bio: "bio"
      };

      $scope.$digest();

      expect(element.find('div').find('b').text()).to.equal('igor');
    });

    it('should use current user if userId is undefined', function () {
      var scope = element.isolateScope() || element.scope();

      $scope.$digest();

      expect(scope.isMe).to.equal(true);
    });

    it.skip('should get user if userId is defined', function () {
      var element = $compile('<user-card user-id="\'igor\'"></user-card>')($scope),
          scope = element.isolateScope() || element.scope(),
          url = domain + '/user/igor/profile',
          respond = {
            "error": "",
            "result": {
              "success": true
            }
          };

      $httpBackend.when('GET', url).respond(respond);
      $httpBackend.expectGET(url);

      $httpBackend.flush();
      $scope.$digest();

      expect(scope.isMe).to.equal(false);
    });
  });
});
