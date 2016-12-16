define(function (require) {
    'use strict';
    var angular = require('angular'),
        postService = require('app/common/services/postService'),
        postFactory, constant, $httpBackend;

    describe('post service', function () {
        beforeEach(module('ernr.postService'));

        beforeEach(function () {
            inject(function (_postFactory_, _apiDomain_, _$httpBackend_) {
                postFactory = _postFactory_;
                constant = _apiDomain_;
                $httpBackend = _$httpBackend_;
            });
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be a valid service', function () {
            expect(postService).to.be.an('object');
        });

        it('should has the createpost method', function () {
            expect(postFactory.createpost).to.be.an('function');
        });

        it('should has the getPaths method', function () {
            expect(postFactory.getPaths).to.be.an('function');
        });

        it('should has the getRabbitHoles method', function () {
            expect(postFactory.getRabbitHoles).to.be.an('function');
        });

        it('should has the comments method', function () {
            expect(postFactory.comments).to.be.an('function');
        });

        it('should has the share method', function () {
            expect(postFactory.share).to.be.an('function');
        });

        it('should has the shareTo method', function () {
            expect(postFactory.shareTo).to.be.an('function');
        });

        it('should has the setThumb method', function () {
            expect(postFactory.setThumb).to.be.an('function');

            expect(postFactory.setThumb()).to.be.an('object');
            expect(postFactory.setThumb().then).to.be.an('function');
            expect(postFactory.setThumb().success).to.be.an('function');
        });

        it('should return promises when call to createpost function', function () {
            expect(postFactory.createpost()).to.be.an('object');
            expect(postFactory.createpost().then).to.be.an('function');
            expect(postFactory.createpost().success).to.be.an('function');
        });

        it('should return promises when call to getPaths function', function () {
            expect(postFactory.getPaths()).to.be.an('object');
            expect(postFactory.getPaths().then).to.be.an('function');
            expect(postFactory.getPaths().success).to.be.undefined;
        });

        it('should return promises when call to getRabbitHoles function', function () {
            expect(postFactory.getRabbitHoles()).to.be.an('object');
            expect(postFactory.getRabbitHoles().then).to.be.an('function');
            expect(postFactory.getRabbitHoles().success).to.be.undefined;
        });

        it('should return promises when call to comments function', function () {
            expect(postFactory.comments()).to.be.an('object');
            expect(postFactory.comments().then).to.be.an('function');
            expect(postFactory.comments().success).to.be.an('function');
        });

        it('should return promises when call to share function', function () {
            expect(postFactory.share()).to.be.an('object');
            expect(postFactory.share().then).to.be.an('function');
            expect(postFactory.share().success).to.be.an('function');
        });

        it('should return promises when call to shareTo function', function () {
            expect(postFactory.shareTo()).to.be.an('object');
            expect(postFactory.shareTo().then).to.be.an('function');
            expect(postFactory.shareTo().success).to.be.an('function');
        });
    });
});
