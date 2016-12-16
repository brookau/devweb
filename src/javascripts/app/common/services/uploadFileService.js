define([
  'angular',
  'app/common/resources/constants/constants',
  'angularFileUpload'
], function (angular) {
  'use strict';

  return angular.module('ernr.uploadFile', [
    'common.resources.constant',
    'angularFileUpload'
  ])
    .factory('uploadFileFactory', [
      'apiDomain',
      '$upload',
      '$window',
      function (constant, $upload, $window) {
        return {
          upload: function (file) {
            return $upload.upload({
              url: constant.domain + '/files/upload',
              file: file
            });
          },
          uploadAvatar: function (file) {
            return $upload.upload({
              url: constant.domain + '/files/uploadavatar',
              file: file
            });
          },
          getThumb: function (file) {
            return $upload.upload({
              sendObjectsAsJsonBlob: true,
              url: constant.domain + '/files/getthumb',
              file: file
            });
          },
          generateThumb: function (file, callback) {
            if (file === null || !file.type.match('image.*') || !callback) {
              return;
            }

            var fileReader = new $window.FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
              file.dataUrl = e.target.result;
              callback(e.target.result);
            };
          }
        };
      }
    ]);
});
