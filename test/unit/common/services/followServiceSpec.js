define(function (require) {
    'use strict';
    var angular = require('angular'),
        followService = require('app/common/services/followService'),
        followFactory;

    describe('follow service', function () {
        beforeEach(module('ernr.followService'));

        beforeEach(function () {
            inject(function (_followFactory_) {
                followFactory = _followFactory_;
            });
        });

        it('should be a valid service', function () {
            expect(followService).to.be.an('object');
        });

        it('should has the getFollowers method', function () {
            expect(followFactory.getFollowers).to.be.an('function');
        });

        it('should has the getFollowing method', function () {
            expect(followFactory.getFollowing).to.be.an('function');
        });

        it('should has the follow method', function () {
            expect(followFactory.follow).to.be.an('function');
        });

        it('should has the unfollow method', function () {
            expect(followFactory.unfollow).to.be.an('function');
        });

        it('should return promises when call to getFollowers method', function () {
            expect(followFactory.getFollowers()).to.be.an('object');
            expect(followFactory.getFollowers().then).to.be.an('function');
            expect(followFactory.getFollowers().success).to.be.an('function');
        });

        it('should return promises when call to getFollowing method', function () {
            expect(followFactory.getFollowing()).to.be.an('object');
            expect(followFactory.getFollowing().then).to.be.an('function');
            expect(followFactory.getFollowing().success).to.be.an('function');
        });

        it('should return promises when call to follow method', function () {
            expect(followFactory.follow).to.be.an('function');
        });

        it('should return promises when call to unfollow method', function () {
            expect(followFactory.unfollow).to.be.an('function');
        });
    });
});
