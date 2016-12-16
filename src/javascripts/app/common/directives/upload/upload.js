/* istanbul ignore next */
define([
    'angular',
    'angularRoute',
    'angularFileUpload',
    'angularBootstrap',
    'app/common/context/user',
    'app/common/services/notificationsService',
    'app/common/services/postService',
    'app/common/directives/mentio/mentio',
    'app/common/directives/tagsField',
    'text!./templates/upload.html',
    './controllers/upload',
    'text!./templates/uploadphoto.html',
    'text!./templates/uploadtext.html',
    'text!./templates/uploadaudio.html',
    'text!./templates/uploadvideo.html',
    'app/common/directives/thumbEditor/thumbEditor'
  ],
  function (angular,
            angularRoute,
            angularFileUpload,
            angularBootstrap,
            userServiceModule,
            notificationsServiceModule,
            postServiceModule,
            mentioModule,
            tagsFieldModule,
            uploadTmpl,
            uploadCtrl,
            templateUploadPhoto,
            templateUploadText,
            templateUploadAudio,
            templateUploadVideo) {
    'use strict';

    var module = angular.module('ernr.directives.upload', [
      'ngRoute',
      'ui.bootstrap',
      'ernr.userService',
      'ernr.postService',
      'angularFileUpload',
      'ernr.notifications',
      'ernr.directives.mentio',
      'ernr.directives.tagsField',
      'ernr.directives.thumbEditor'
    ]);

    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('upload.photo', templateUploadPhoto);
      $templateCache.put('upload.text', templateUploadText);
      $templateCache.put('upload.audio', templateUploadAudio);
      $templateCache.put('upload.video', templateUploadVideo);
    }]);

    module.directive('uploadMenu', function () {
      return {
        restrict: 'E',
        replace: true,
        controller: uploadCtrl,
        template: uploadTmpl
      };
    });

    return module;
  });
