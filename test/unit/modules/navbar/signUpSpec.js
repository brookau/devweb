define(function(require) {
  'use strict';

  var angular = require('angular'),
      navbarModule = require('app/modules/navbar/navbar'),
      signUpCtrl = require('app/modules/navbar/controllers/signUpModalController'),
      templateSignUpModal = require('text!app/modules/navbar/templates/signup.html'),
      $controller, $rootScope, $scope, modalInstance, element, $compile, $httpBackend,
      constants;

  describe('signUp modal', function() {
    beforeEach(module('ernr.navbar', function ($provide, $controllerProvider) {
      $controllerProvider.register('signUpCtrl', signUpCtrl);
    }));

    beforeEach(function () {
      inject(function (_$controller_, _$rootScope_, _$compile_, _$httpBackend_, _apiDomain_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        constants = _apiDomain_;

        $scope = $rootScope.$new();

        modalInstance = {
          close: sinon.spy(),
          dismiss: sinon.spy(),
          result: {
            then: sinon.spy()
          }
        };

        $controller('signUpCtrl', {
          $scope: $scope,
          $modalInstance: modalInstance
        });

        element = angular.element(templateSignUpModal);
        $compile(element)($scope);

        element.controller('signUpCtrl');
        $scope.$digest();
      });
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('controller', function() {
      it('should be a array', function() {
        expect(signUpCtrl).to.be.an('array');
      });
    });

    describe('$scope', function() {
      it('should have closeDialog method', function () {
        expect($scope.closeDialog).to.be.an('function');
      });

      it('should have showForm method', function () {
        expect($scope.showForm).to.be.an('function');
      });

      it('should have submitDialog method', function () {
        expect($scope.submitDialog).to.be.an('function');
      });

      it('should call close modal method', function () {
        $scope.closeDialog();
        expect(modalInstance.close.called).to.be.true;
      });

      it('should call showForm method', function () {
        $scope.showForm();
        expect($scope.state).to.equal('form');
      });

      it('should call submitDialog method', function () {
        var url = constants.domain + '/account/create',
            params = {
              username: 'test-name',
              email: 'test@example.com',
              password: 'password'
            },
            respond = {
              "error": "",
              "result": {
                "success": true
              }
            };

        $scope.data = params;

        $httpBackend.when('POST', url).respond(respond);
        $httpBackend.expectPOST(url, params);

        $scope.submitDialog();
        $httpBackend.flush();

        expect($scope.state).to.equal('success');
      });
    });
  });
});
