define(function (require) {
    'use strict';
    var angular = require('angular'),
        voteService = require('app/common/services/voteService'),
        voteFactory;

    describe('favorites service', function () {
        beforeEach(module('ernr.voteService'));

        beforeEach(function () {
            inject(function (_voteFactory_) {
                voteFactory = _voteFactory_;
            });
        });

        it('should be a valid service', function () {
            expect(voteService).to.be.an('object');
        });

        it('should has the up method', function () {
            expect(voteFactory.up).to.be.an('function');
        });

        it('should has the down method', function () {
            expect(voteFactory.down).to.be.an('function');
        });

        it('should return promises when call to up function', function () {
            expect(voteFactory.up()).to.be.an('object');
            expect(voteFactory.up().then).to.be.an('function');
            expect(voteFactory.up().success).to.be.an('function');
        });

        it('should return promises when call to down function', function () {
            expect(voteFactory.down()).to.be.an('object');
            expect(voteFactory.down().then).to.be.an('function');
            expect(voteFactory.down().success).to.be.an('function');
        });
    });
});
