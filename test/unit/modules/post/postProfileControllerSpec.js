define(function(require) {
    'use strict';

    var angular = require('angular'),
        postModule = require('app/modules/post/post'),
        postFactory;

    describe('post-profile module', function() {
        beforeEach(module('ernr.post'));

        beforeEach(function(){
            inject(function(_postFactory_){
                postFactory = _postFactory_;
            })
        });
    });
});
