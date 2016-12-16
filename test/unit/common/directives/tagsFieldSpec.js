define(function(require) {
  'use strict';

  var angular = require('angular'),
      tagsField = require('app/common/directives/tagsField'),
      $compile, $rootScope;

  describe('tags field directive', function() {
    beforeEach(module('ernr.directives.tagsField'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      });
    });

    it('should be a valid module', function() {
      expect(tagsField).to.be.an('object');
    });

    it('should has one child', function() {
      var element = $compile('<tags-field tags=["song"]></tags-field>')($rootScope);
      $rootScope.$digest();
      expect(element.children().length).to.equal(1);
    });

    it('should not contain any #', function() {
      var element = $compile('<tags-field tags=[]></tags-field>')($rootScope);
      var scope = element.isolateScope() || element.scope();

      scope.innerTags = [{ id: 'awesome#song' }, { id: '#awesome#move' }];
      $rootScope.$digest();

      expect(scope.tags).to.be.an('array');
      expect(scope.tags.length).to.equal(2);
      expect(scope.tags[0]).to.equal('awesomesong');
      expect(scope.tags[1]).to.equal('awesomemove');

      expect(scope.innerTags).to.be.an('array');
      expect(scope.innerTags.length).to.equal(2);
      expect(scope.innerTags[0]).to.be.an('object');
      expect(scope.innerTags[1]).to.be.an('object');
      expect(scope.innerTags[0].id).to.equal('awesomesong');
      expect(scope.innerTags[1].id).to.equal('awesomemove');
    });
  });
});
