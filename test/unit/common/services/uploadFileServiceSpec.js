define(function(require) {
  'use strict';

  var angular = require('angular'),
      uploadFileService = require('app/common/services/uploadFileService'),
      uploadFileFactory;

  describe('uploadFileService service', function() {
    beforeEach(module('ernr.uploadFile'));

    beforeEach(function() {
      inject(function(_uploadFileFactory_) {
        uploadFileFactory = _uploadFileFactory_;
      });
    });

    it('should be a valid service', function() {
      expect(uploadFileService).to.be.an('object');
    });

    it('should has the login upload', function() {
      expect(uploadFileFactory.upload).to.be.an('function');
    });

    it('should return promises when call to upload function', function() {
      expect(uploadFileFactory.upload()).to.be.an('object');
      expect(uploadFileFactory.upload().then).to.be.an('function');
      expect(uploadFileFactory.upload().success).to.be.an('function');
    });

    it('should return promises when call to uploadAvatar function', function() {
      expect(uploadFileFactory.uploadAvatar()).to.be.an('object');
      expect(uploadFileFactory.uploadAvatar().then).to.be.an('function');
      expect(uploadFileFactory.uploadAvatar().success).to.be.an('function');
    });
  });
});
