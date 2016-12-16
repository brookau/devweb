define([
    'angular',
    './loginService',
    './profileService',
    './userCreationService',
    './postService',
    './feedService',
    './uploadFileService',
    './notificationsService',
    './favoritesService',
    './tagsService',
    './followService'
  ],
  function (angular) {
    angular.module('common.services', [
      'ernr.loginService',
      'ernr.ProfileService',
      'ernr.userCreationService',
      'ernr.postService',
      'ernr.uploadFile',
      'ernr.feedService',
      'ernr.notifications',
      'ernr.favoritesService',
      'ernr.tagsService',
      'ernr.followService'
    ]);
  });
