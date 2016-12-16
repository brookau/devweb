define(function(require) {
  'use strict';

  var angular = require('angular'),
      pendingPostModule = require('app/modules/dashboard/directives/pendingPost'),
      templateSetThumbModule = require('text!app/modules/dashboard/templates/setThumbModal.html'),
      $controller, $rootScope, $scope, modalInstance, element, $compile, $httpBackend,
      domain;

  describe('pendingPost module', function() {
    beforeEach(module('ernr.directives.pendingPost'));

    beforeEach(function () {
      inject(function (_$controller_, _$rootScope_, _$compile_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;

        $scope = $rootScope.$new();

        element = angular.element(templateSetThumbModule);
        $compile(element)($scope);

        $scope.$digest();
      });
    });

    it('should be a valid module', function() {
      expect(pendingPostModule).to.be.an('object');
    });
  });
});
