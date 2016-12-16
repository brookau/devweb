define(function (require) {
    'use strict';
    var angular = require('angular'),
        commentsService = require('app/common/services/commentsService'),
        commentsFactory, constant, $httpBackend;

    describe('comments service', function () {
        beforeEach(module('ernr.commentsService'));

        beforeEach(function () {
            inject(function (_commentsFactory_, _apiDomain_, _$httpBackend_) {
                commentsFactory = _commentsFactory_;
                constant = _apiDomain_;
                $httpBackend = _$httpBackend_;
            });
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be a valid service', function () {
            expect(commentsService).to.be.an('object');
        });

        it('should has the get method', function () {
            expect(commentsFactory.get).to.be.an('function');
        });

        it('should has the create method', function () {
            expect(commentsFactory.create).to.be.an('function');
        });

        it('should has the edit method', function () {
            expect(commentsFactory.edit).to.be.an('function');
        });

        it('should has the remove method', function () {
            expect(commentsFactory.remove).to.be.an('function');
        });

        it('should has the voteup method', function () {
            expect(commentsFactory.voteup).to.be.an('function');
        });

        it('should has the votedown method', function () {
            expect(commentsFactory.votedown).to.be.an('function');
        });

        it('should return promises when call to create function', function () {
            expect(commentsFactory.create()).to.be.an('object');
            expect(commentsFactory.create().then).to.be.an('function');
            expect(commentsFactory.create().success).to.be.an('function');
        });

        it('should return promises when call to get function', function () {
            expect(commentsFactory.get()).to.be.an('object');
            expect(commentsFactory.get().then).to.be.an('function');
            expect(commentsFactory.get().success).to.be.an('function');
        });

        it('should return promises when call to edit function', function () {
            expect(commentsFactory.edit()).to.be.an('object');
            expect(commentsFactory.edit().then).to.be.an('function');
            expect(commentsFactory.edit().success).to.be.an('function');
        });

        it('should return promises when call to remove function', function () {
            expect(commentsFactory.remove()).to.be.an('object');
            expect(commentsFactory.remove().then).to.be.an('function');
            expect(commentsFactory.remove().success).to.be.an('function');
        });

        it('should return promises when call to voteup function', function () {
            expect(commentsFactory.voteup()).to.be.an('object');
            expect(commentsFactory.voteup().then).to.be.an('function');
            expect(commentsFactory.voteup().success).to.be.an('function');
        });

        it('should return promises when call to votedown function', function () {
            expect(commentsFactory.votedown()).to.be.an('object');
            expect(commentsFactory.votedown().then).to.be.an('function');
            expect(commentsFactory.votedown().success).to.be.an('function');
        });
    });
});
