define(function (require) {
    'use strict';
    var angular = require('angular'),
        favoritesService = require('app/common/services/favoritesService'),
        favoritesFactory;

    describe('favorites service', function () {
        beforeEach(module('ernr.favoritesService'));

        beforeEach(function () {
            inject(function (_favoritesFactory_) {
                favoritesFactory = _favoritesFactory_;
            });
        });

        it('should be a valid service', function () {
            expect(favoritesFactory).to.be.an('object');
        });

        it('should has the get method', function () {
            expect(favoritesFactory.get).to.be.an('function');
        });

        it('should has the add method', function () {
            expect(favoritesFactory.add).to.be.an('function');
        });

        it('should has the remove method', function () {
            expect(favoritesFactory.remove).to.be.an('function');
        });

        it('should return promises when call to get function', function () {
            expect(favoritesFactory.get()).to.be.an('object');
            expect(favoritesFactory.get().then).to.be.an('function');
            expect(favoritesFactory.get().success).to.be.an('function');
        });

        it('should return promises when call to add function', function () {
            expect(favoritesFactory.add).to.be.an('function');
        });

        it('should return promises when call to remove function', function () {
            expect(favoritesFactory.remove).to.be.an('function');
        });
    });
});
