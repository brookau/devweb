define(function (require) {
  'use strict';

  var angular = require('angular'),
    templateUploadModal = require('text!app/common/directives/upload/templates/uploadModal.html'),
    ctrl = require('app/common/directives/upload/controllers/uploadTextModalController'),
    postServiceModule = require('app/common/services/postService'),
    uploadFileServiceModule = require('app/common/services/uploadFileService'),
    $scope, template, $compile, controller, modalInstance, element;

  describe('Upload text modal', function () {
    beforeEach(module('ernr.postService'));
    beforeEach(module('ernr.uploadFile'));
    beforeEach(module('ernr.directives.upload', function ($provide, $controllerProvider) {
      $controllerProvider.register('uploadTextModalController', ctrl);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, $controller) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();

      // fake $modalInstance
      modalInstance = {
        close: sinon.spy(),
        dismiss: sinon.spy()
      };

      // create controller
      controller = $controller('uploadTextModalController', {$scope: $scope, $modalInstance: modalInstance});
      $scope.$digest();
    }));

    it('should have closeDialog method', function () {
      expect($scope.closeDialog).not.to.be.undefined;
    });

    it('should close modal when call closeDialog', function () {
      $scope.closeDialog();
      expect(modalInstance.close.called).to.be.true;
    });
  });
});
