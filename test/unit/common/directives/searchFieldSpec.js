define(function (require) {
  'use strict';

  var angular = require('angular'),
    searchField = require('app/common/directives/searchField'),
    $compile, $scope;

  describe('search field directive', function () {

    beforeEach(module('ernr.directives.searchField'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      })
    );

    it('should be a valid module', function () {
      expect(searchField).to.be.an('object');
    });

    it('should has searchField directive', function () {
      var element = $compile("<input search-field />")($scope);
      $scope.$digest();
      expect(element.attr('ng-model')).to.equal('params.q');
    });
  });
});
