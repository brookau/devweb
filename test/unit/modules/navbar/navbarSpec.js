define(function(require) {
  'use strict';

  var angular = require('angular'),
      navbarModule = require('app/modules/navbar/navbar'),
      navbarTemplate = require('text!app/modules/navbar/templates/navbar.html'),
      navbarCtrl = require('app/modules/navbar/controllers/navbarController'),
      $controller, $rootScope, $scope;

  describe('navbar module', function() {
    beforeEach(module('ernr.navbar'));

    beforeEach(function () {
      inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        $scope = $rootScope.$new();
        $controller(navbarCtrl, { $scope: $scope });
      });
    });

    it('should be a valid module', function() {
      expect(navbarModule).to.be.an('object');
    });

    describe('$scope', function() {
      it('should has the currentUser property', function() {
        expect($scope.currentUser).to.be.an('object');
      });

      it('should has the signout method', function() {
        expect($scope.signout).to.be.an('function');
      });

      it('should has the openSignUpModal method', function() {
        expect($scope.openSignUpModal).to.be.an('function');
      });

      it('should has the openSignInModal method', function() {
        expect($scope.openSignInModal).to.be.an('function');
      });
    });
  });
});
