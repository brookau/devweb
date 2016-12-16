define(function(require) {
  'use strict';

  var angular = require('angular'),
      postsComments = require('app/modules/post/directives/postsComments'),
      $compile, $scope;

  describe('posts comments directive', function() {
    beforeEach(module('ernr.filters'));
    beforeEach(module('ernr.directives.postsComments'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      });
    });

    it('should be a valid module', function() {
      expect(postsComments).to.be.an('object');
    });

    it('should has postsComments derective', function() {
      var element = $compile("<posts-comments post='{ id: 1 }'></posts-comments>")($scope);
      var scope = element.isolateScope() || element.scope();

      $scope.$digest();

      expect(scope.post.id).to.equal(1);
      expect(element.find('form').attr('name')).to.equal('createComentForm');
    });
  });
});
