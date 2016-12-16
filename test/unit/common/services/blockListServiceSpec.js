define(function (require) {
  'use strict';
  var angular = require('angular'),
      blockListService = require('app/common/services/blockListService'),
      blockListFactory, constant;

  describe('block list service', function () {
    beforeEach(module('ernr.blockListService'));

    beforeEach(function () {
        inject(function (_blockListFactory_, _apiDomain_) {
            blockListFactory = _blockListFactory_;
            constant = _apiDomain_;
        });
    });

    it('should be a valid service', function () {
        expect(blockListService).to.be.an('object');
    });

    it('should has the get method', function () {
        expect(blockListFactory.get).to.be.an('function');
    });

    it('should has the add method', function () {
        expect(blockListFactory.add).to.be.an('function');
    });

    it('should has the remove method', function () {
        expect(blockListFactory.remove).to.be.an('function');
    });
  });
});

