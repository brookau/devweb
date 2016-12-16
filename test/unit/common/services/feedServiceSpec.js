define(function (require) {
  'use strict';
  var angular = require('angular'),
    feedService = require('app/common/services/feedService'),
    feedFactory, constant, $httpBackend;

  describe('feed service', function () {
    beforeEach(module('ernr.feedService'));

    beforeEach(function () {
      inject(function (_feedFactory_, _apiDomain_, _$httpBackend_) {
        feedFactory = _feedFactory_;
        constant = _apiDomain_;
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be a valid service', function () {
      expect(feedService).to.be.an('object');
    });

    it('should has the search method', function () {
      expect(feedFactory.search).to.be.an('function');
    });

    it('should return promises when call to search function', function () {
      expect(feedFactory.search()).to.be.an('object');
      expect(feedFactory.search().then).to.be.an('function');
      expect(feedFactory.search().success).to.be.an('function');
    });

  });
});