define(function(require) {
  'use strict';

  var angular = require('angular'),
      signInUpModule = require('app/common/directives/signInUp/signInUp'),
      signInUpModalTpl = require('text!app/common/directives/signInUp/templates/signInUpModal.html'),
      $controller, $rootScope, $scope, modalInstance, element, $compile, $httpBackend,
      domain;

  describe('signInUp directive', function() {
    beforeEach(module('ernr.directives.signInUp'));

    beforeEach(function () {
      inject(function (_$controller_,
                       _$rootScope_,
                       _$compile_,
                       _$httpBackend_,
                       _apiDomain_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        domain = _apiDomain_.domain;

        $scope = $rootScope.$new();

        modalInstance = {
          close: sinon.spy(),
          dismiss: sinon.spy(),
          result: {
            then: sinon.spy()
          }
        };

        $controller('signInUpController', {
          $scope: $scope,
          $modalInstance: modalInstance,
          state: 'signin'
        });

        element = angular.element(signInUpModalTpl);
        $compile(element)($scope);

        element.controller('signInUpController');
        $scope.$digest();
      });
    });

    it('should be a valid module', function() {
      expect(signInUpModule).to.be.an('object');
    });

    describe(' -> modal', function() {
      it('should have close method', function () {
        expect($scope.close).to.be.an('function');
      });

      it('should have setState method', function () {
        expect($scope.setState).to.be.an('function');
      });

      it('should have setPrevStage method', function () {
        expect($scope.setPrevState).to.be.an('function');
      });

      it('should have login method', function () {
        expect($scope.login).to.be.an('function');
      });
      it('should have signUp method', function () {
        expect($scope.signUp).to.be.an('function');
      });

      it('should call close modal method', function () {
        $scope.close();
        expect(modalInstance.dismiss.called).to.be.true;
      });

      it('should call setState method', function () {
        $scope.setState('error');
        expect($scope.state).to.equal('error');
      });

      it('should call Login method', function () {
        var url = domain + '/account/login',
            url2 = domain + '/account/profile',
            url3 = domain + '/account/stats',
            params = {
              login: 'test-name',
              password: 'password'
            },
            respond = {
              "error": "",
              "result": {
                "success": true
              }
            },
            $event = { preventDefault: function () {} };

        $scope.data = {
          username: 'test-name',
          password: 'password'
        };

        $httpBackend.when('POST', url).respond(respond);
        $httpBackend.expectPOST(url, params);

        $httpBackend.when('GET', url2).respond(respond);
        $httpBackend.when('GET', url3).respond(respond);

        $scope.login($event);
        $httpBackend.flush();

        expect(modalInstance.close.called).to.be.true;
      });

      it('should call signUp method', function () {
        var url = domain + '/account/create',
            params = {
              username: 'test-name',
              email: 'test-name@example.com',
              password: 'password'
            },
            respond = {
              "error": "",
              "result": {
                "success": true
              }
            },
            $event = { preventDefault: function () {} };

        $scope.data = params;

        $httpBackend.when('POST', url).respond(respond);
        $httpBackend.expectPOST(url, params);

        $scope.signUp($event);
        $httpBackend.flush();

        expect($scope.state).to.equal('success');
      });
    });
  });
});
