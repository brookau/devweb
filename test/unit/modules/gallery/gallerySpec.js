define(function(require) {
  'use strict';

  var angular = require('angular'),
    galleryModule = require('app/modules/gallery/gallery'),
    galleryTemplate = require('text!app/modules/gallery/templates/gallery.html'),
    galleryCtrl = require('app/modules/gallery/controllers/gallery'),
    constant, $httpBackend;

  describe('gallery module', function() {
    beforeEach(module('ernr.gallery'));

    it('should be a valid module', function() {
      expect(galleryModule).to.be.an('object');
    });
  });
});
