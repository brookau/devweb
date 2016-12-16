define(function(require) {
  'use strict';

  var angular = require('angular'),
      searchModule = require('app/modules/search/search'),
      searchTemplate = require('text!app/modules/search/search.html'),
      searchCtrl = require('app/modules/search/controllers/search'),
      searchService = require('app/modules/search/services/searchService'),
      searchFactory, constant, $httpBackend;

  describe('search module', function() {
    beforeEach(module('ernr.search'));

    beforeEach(function () {
      inject(function (_searchFactory_, _apiDomain_, _$httpBackend_) {
        searchFactory = _searchFactory_;
        constant = _apiDomain_;
        $httpBackend = _$httpBackend_;
      });
    });

    it('should be a valid module', function() {
      expect(searchModule).to.be.an('object');
    });
  });

  describe('search factory', function() {
    it('sshould be a valid factory', function() {
      expect(searchFactory).to.be.an('object');
    });

    it('should return promises when call to find method', function () {
      expect(searchFactory.find()).to.be.an('object');
      expect(searchFactory.find().then).to.be.an('function');
      expect(searchFactory.find().success).to.be.an('function');
    });
  });
});
