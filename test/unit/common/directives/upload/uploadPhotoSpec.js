define(function (require) {
  'use strict';

  var angular = require('angular'),
    templateUploadModal = require('text!app/common/directives/upload/templates/uploadModal.html'),
    ctrl = require('app/common/directives/upload/controllers/uploadPhotoModalController'),
    postServiceModule = require('app/common/services/postService'),
    uploadFileServiceModule = require('app/common/services/uploadFileService'),
    $scope, template, $compile, controller, modalInstance, element;

  describe('Upload text modal', function () {
    beforeEach(module('ernr.postService'));
    beforeEach(module('ernr.uploadFile'));
    beforeEach(module('ernr.directives.upload', function ($provide, $controllerProvider) {
      $controllerProvider.register('uploadPhotoModalController', ctrl);
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
      controller = $controller('uploadPhotoModalController', {$scope: $scope, $modalInstance: modalInstance});
      element = angular.element(templateUploadModal);
      template = $compile(element)($scope);
      // assign controller to template
      element.controller('uploadPhotoModalController');
      $scope.$digest();
    }));



    it('should have closeDialog method', function () {
      expect($scope.closeDialog).not.to.be.undefined;
    });

    it('should call close modal method', function () {
      $scope.closeDialog();
      expect(modalInstance.close.called).to.be.true;
    });

    //it('should hide submit button when submit', function () {
    //  $scope.data = {
    //    title: 'post title',
    //    description: 'post description',
    //    tags: [],
    //    type: 'text'
    //  };
    //  $scope.$digest();
    //
    //  console.log(element.find('.modal-close'));
    //
    //  expect($scope.onAjax).to.be.false;
    //
    //  $scope.createPost();
    //
    //  expect($scope.onAjax).to.be.true;
    //})
  });
});