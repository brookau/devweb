define(function (require) {
  'use strict';
  var angular = require('angular'),
    tagsService = require('app/common/services/tagsService'),
    tagsFactory, constant;

  describe('tags service', function () {
    beforeEach(module('ernr.tagsService'));

    beforeEach(function () {
      inject(function (_tagsFactory_, _apiDomain_) {
        tagsFactory = _tagsFactory_;
        constant = _apiDomain_;
      });
    });

    it('should be a valid service', function () {
      expect(tagsService).to.be.an('object');
    });

    it('should has the autocomplete method', function () {
      expect(tagsFactory.autocomplete).to.be.an('function');
    });

    it('should has the getList method', function () {
      expect(tagsFactory.getList).to.be.an('function');
    });

    it('should has the getFollowing method', function () {
      expect(tagsFactory.getFollowing).to.be.an('function');
    });

    it('should has the follow method', function () {
      expect(tagsFactory.follow).to.be.an('function');
    });

    it('should has the unfollow method', function () {
      expect(tagsFactory.unfollow).to.be.an('function');
    });

    it('should has the loadToLocalStorage method', function () {
      expect(tagsFactory.loadToLocalStorage).to.be.an('function');
    });

    it('should has the isFollowing method', function () {
      expect(tagsFactory.isFollowing).to.be.an('function');
    });

    it('should return promises when call to autocomplete function', function () {
      expect(tagsFactory.autocomplete()).to.be.an('object');
      expect(tagsFactory.autocomplete().then).to.be.an('function');
      expect(tagsFactory.autocomplete().success).to.be.an('function');
    });

    it('should return promises when call to getList function', function () {
      expect(tagsFactory.getList()).to.be.an('object');
      expect(tagsFactory.getList().then).to.be.an('function');
      expect(tagsFactory.getList().success).to.be.an('function');
    });
  });
});
