define(function (require) {
  'use strict';

  var angular = require('angular'),
    feedList = require('app/common/directives/feed/feedList'),
    filters = require('app/common/filters'),
    $compile, $scope, $document, $window, innerScope;

  describe('Feed directive', function () {
    beforeEach(module('ernr.filters'));
    beforeEach(module('ernr.directives.feedList'));

    beforeEach(function () {
      inject(function (_$compile_, _$rootScope_, _$document_, _$window_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $document = _$document_;
        $window = _$window_;
      });
    });

    it('should be a valid module', function () {
      expect(feedList).to.be.an('object');
    });

    it('should has render feeds list', function () {
      var element = $compile('<div feeds-list=""></div>')($scope);
      $scope.$digest();
      innerScope = element.isolateScope();
      innerScope.feeds = [
        {
          "id": "41",
          "created": "2015-03-09T02:52:19.136Z",
          "user_id": "test",
          "user_name": "test",
          "user_avatar": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/profile/test",
          "title": "FROZEN - Let it GO",
          "description": "Test",
          "type": "video",
          "file_url": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/post_files/48R7.mp4",
          "tags": [],
          "assets": [],
          "balance": 0,
          "votesup": 0,
          "votesdown": 0,
          "votessum": 0,
          "rank": 1,
          "score": 1425869539136
        },
        {
          "id": "30",
          "created": "2015-03-05T07:33:10.204Z",
          "user_id": "test",
          "user_name": "test",
          "user_avatar": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/profile/test",
          "title": "Bleed it out - Linkin Park",
          "description": "Awesome...",
          "type": "video",
          "file_url": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/post_files/4AYk.mp4",
          "tags": [],
          "assets": [],
          "balance": 0,
          "votesup": 0,
          "votesdown": 0,
          "votessum": 0,
          "rank": 2,
          "score": 1425540790204
        }
      ];
      innerScope.$digest();

      var $el = angular.element(element.children(0)[0]);
      expect(angular.element($el.children()[2]).children().length).to.equal(innerScope.feeds.length);
    });
  });
});
