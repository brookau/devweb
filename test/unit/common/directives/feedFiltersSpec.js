define(function(require) {
  'use strict';

  var angular = require('angular'),
      feedFilters = require('app/common/directives/feedFilters/feedFilters'),
      $compile, $scope;

  describe('feed filters directive', function() {
    beforeEach(module('ernr.directives.feedFilters'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      });
    });

    it('should be a valid module', function() {
      expect(feedFilters).to.be.an('object');
    });

    it('should has 7 button', function() {
      var element = $compile('<feed-filters ng-model="f"></feed-filters>')($scope);
      $scope.$digest();
      expect(element.find('button').length).to.equal(7);
    });

    it('should set correct values', function() {
      var element = $compile('<feed-filters ng-model="f"></feed-filters>')($scope);
      var scope = element.isolateScope() || element.scope();

      scope.changeType('video');
      scope.changeDate('recent');
      $scope.$digest();

      expect(scope.filter).to.be.an('object');
      expect(scope.filter.type).to.equal('video');
      expect(scope.filter.datestamp).to.equal('');
    });

    it('should set empty values if newValue === oldValue', function() {
      var element = $compile('<feed-filters ng-model="f"></feed-filters>')($scope);
      var scope = element.isolateScope() || element.scope();

      scope.changeType('video');
      scope.changeType('video');

      scope.changeDate('activity');
      scope.changeDate('activity');
      $scope.$digest();

      expect(scope.filter.type).to.equal('');
      expect(scope.filter.datestamp).to.equal('');
    });
  });
});
