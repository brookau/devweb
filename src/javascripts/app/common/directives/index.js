define([
    'angular',
    './voteup',
    './votedown',
    './like',
    './refresh',
    './share',
    './upload/upload',
    './searchField',
    './validFile',
    './tagsField',
    './mentio/mentio',
    './feed/feed',
    './feed/feedList'
  ],
  function (angular) {

    angular.module('common.directives', [
      'ernr.directives.voteup',
      'ernr.directives.votedown',
      'ernr.directives.like',
      'ernr.directives.refresh',
      'ernr.directives.share',
      'ernr.directives.upload',
      'ernr.directives.searchField',
      'ernr.directives.validFile',
      'ernr.directives.tagsField',
      'ernr.directives.mentio',
      'ernr.directives.feed',
      'ernr.directives.feedList'
    ]);
  });
