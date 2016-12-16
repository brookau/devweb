define(function (require) {
  'use strict';

  var angular = require('angular'),
    mentionsLink = require('app/common/directives/mentionsLink'),
    $compile, $scope;

  describe('Mentions link directive', function () {
    beforeEach(module('ernr.directives.mentionsLink'));

    beforeEach(function () {
      inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      });
    });

    it('should be a valid module', function () {
      expect(mentionsLink).to.be.an('object');
    });

    it('should has one link in the result', function () {
      var element = $compile('<mentions-link text="\'this is @test message\'" />')($scope);
      $scope.$digest();
      expect(element.find('a').length).to.equal(1);
    });
  });
});
