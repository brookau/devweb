define(function(require) {
  'use strict';

  var angular = require('angular'),
      rabbitHolesModule = require('app/modules/post/directives/rabbitHoles'),
      rabbitHolesTemplate = require('text!app/modules/post/templates/rabbitHoles.html'),
      $controller, $scope, element, $compile, domain;

  describe('rabbitHoles module', function() {
    beforeEach(module('ernr.filters'));
    beforeEach(module('ernr.post.directives.rabbitHoles'));

    beforeEach(function () {
      inject(function (_$controller_, _$rootScope_, _$compile_) {
        $controller = _$controller_;
        $compile = _$compile_;
        $scope = _$rootScope_.$new();

        element = angular.element(rabbitHolesTemplate);
        $compile(element)($scope);

        $scope.$digest();
      });
    });

    it('should be a valid module', function() {
      expect(rabbitHolesModule).to.be.an('object');
    });
  });
});

