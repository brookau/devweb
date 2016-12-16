define(function(require) {
  'use strict';

  var angular = require('angular'),
      reportModule = require('app/common/directives/report/report'),
      templateReportModal = require('text!app/common/directives/report/templates/reportModal.html'),
      $controller, $rootScope, $scope, modalInstance, element, $compile, $httpBackend,
      domain;

  describe('reportModule module', function() {
    beforeEach(module('ernr.directives.report'));

    beforeEach(function () {
      inject(function (_$controller_, _$rootScope_, _$compile_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;

        $scope = $rootScope.$new();

        modalInstance = {
          close: sinon.spy(),
          dismiss: sinon.spy(),
          result: {
            then: sinon.spy()
          }
        };

        $controller('reportModalCtrl', {
          $scope: $scope,
          $modalInstance: modalInstance,
          showReason: true,
          target: 'posts'
        });

        element = angular.element(templateReportModal);
        $compile(element)($scope);

        element.controller('reportModalCtrl');
        $scope.$digest();
      });
    });

    it('should be a valid module', function() {
      expect(reportModule).to.be.an('object');
    });

    describe(' -> reportModal', function() {
      it('should have closeDialog method', function () {
        expect($scope.closeDialog).to.be.an('function');
      });

      it('should have chooseReason method', function () {
        expect($scope.chooseReason).to.be.an('function');
      });

      it('should have send method', function () {
        expect($scope.send).to.be.an('function');
      });

      it('should call closeDialog method', function () {
        $scope.closeDialog();
        expect(modalInstance.dismiss.called).to.be.true;
      });

      it('should call send method', function () {
        $scope.data = {
          message: '12345',
          reason: '54321'
        };
        $scope.send();
        expect(modalInstance.close.args[0][0].message).to.equal('12345');
        expect(modalInstance.close.args[0][0].reason).to.equal('54321');
      });

      it('should call chooseReason method', function () {
        $scope.chooseReason('12345');
        expect($scope.data.reason).to.equal('12345');
        expect($scope.showReason).to.be.false;
      });
    });
  });
});
