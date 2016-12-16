define(function(require) {
  'use strict';

  var angular = require('angular'),
    galleryModule = require('app/modules/gallery/gallery'),
    galleryTemplate = require('text!app/modules/gallery/templates/gallery.html'),
    galleryCtrl = require('app/modules/gallery/controllers/gallery'),
    $controller, $rootScope, $scope, _$routeParams;

  describe('gallery module', function() {
    beforeEach(module('ernr.gallery'));

    beforeEach(function() {
      inject(function(_$controller_, _$location_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        _$routeParams = {
          tag: '123'
        };
        $scope = $rootScope.$new();
        $controller(galleryCtrl, {$scope: $scope, $routeParams: _$routeParams});
      });
    });

    describe('$scope', function() {
      it('should have isLoading property', function() {
        expect($scope.isLoading).to.not.be.undefined;
      });
      it('should have params property', function() {
        expect($scope.params).to.not.be.undefined;
      });
      it('should have tag property', function() {
        expect($scope.tag).to.not.be.undefined;
      });
      it('should have topic property', function() {
        expect($scope.topic).to.not.be.undefined;
      });
      it('should have setType function', function() {
        expect($scope.setType).to.be.an('function');
      });
      it('should have setSort function', function() {
        expect($scope.setSort).to.be.an('function');
      });
    });

    it('$scope.params.type should be updated when call setType function', function() {
      $scope.setType('123');
      expect($scope.params.type).to.equal('123');
    });

    it('$scope.params.type should be removed when call setType with parameter same with $scope.params.type', function() {
      $scope.setType('123');
      $scope.setType('123');
      expect($scope.params.type).to.be.undefined;
    });

    it('$scope.params.sort should be updated when call setSort function', function() {
      $scope.setSort('123');
      expect($scope.params.sort).to.equal('123');
    });

    it('$scope.params.sort should be removed when call setSort function with parameter same with $scope.params.sort', function() {
      $scope.setSort('123');
      $scope.setSort('123');
      expect($scope.params.sort).to.be.undefined;
    });
  });
});