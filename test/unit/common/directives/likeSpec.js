define(function (require) {
  'use strict';

  var angular = require('angular'),
    like = require('app/common/directives/like'),
    userFactory, $compile, $scope;

  describe('Like directive', function () {
    beforeEach(module('ernr.directives.like'));

    beforeEach(function () {
      inject(function (_$compile_, _$rootScope_, _userFactory_) {
        userFactory = _userFactory_;
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      });
    });

    it('should be a valid module', function () {
      expect(like).to.be.an('object');
    });

    it('should has the like directive that is not liked', function () {
      $scope.feed = {
        model: { id: 1 }
      };

      var element = $compile("<span like model='feed'></span>")($scope);
      $scope.$digest();

      expect(element.find('i').attr('class')).to.equal('fa fa-fw post-like fa-heart-o');
    });

    it('should has the like directive that is liked', function () {
      $scope.feed = {
        model: { id: 1 }
      };

      var element = $compile("<span like model='feed'></span>")($scope);
      var scope = element.isolateScope() || element.scope();

      scope.isLike = true;
      scope.$digest();

      expect(element.find('i').attr('class')).to.equal('fa fa-fw post-like fa-heart');
    });
  });
});
