define(function (require) {
  'use strict';

  var angular = require('angular'),
    feed = require('app/common/directives/feed/feedFull'),
    $compile, $scope;

  describe('Feed full directive', function () {
    beforeEach(module('ernr.filters'));
    beforeEach(module('ernr.directives.feedFull'));

    beforeEach(function () {
      inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
      });

      $scope.feeds = [{
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
      }, {
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
      }, {
        "id": "28",
        "created": "2015-03-04T19:49:18.230Z",
        "user_id": "jason",
        "user_name": "jason",
        "user_avatar": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/profile/jason",
        "title": "WMV Test",
        "description": "dsfsdfsdfsd",
        "type": "video",
        "file_url": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/post_files/45z9.wmv",
        "tags": [],
        "assets": [],
        "balance": 0,
        "votesup": 0,
        "votesdown": 0,
        "votessum": 0,
        "rank": 3,
        "score": 1425498558230
      }, {
        "id": "27",
        "created": "2015-03-04T19:37:40.582Z",
        "user_id": "jason",
        "user_name": "jason",
        "user_avatar": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/profile/jason",
        "title": "video",
        "description": "dfvdsfgdfgdfgdfgdf",
        "type": "video",
        "file_url": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/post_files/QMJy.avi",
        "tags": [],
        "assets": [],
        "balance": 0,
        "votesup": 0,
        "votesdown": 0,
        "votessum": 0,
        "rank": 4,
        "score": 1425497860582
      }, {
        "id": "25",
        "created": "2015-03-04T18:37:09.213Z",
        "user_id": "jason",
        "user_name": "jason",
        "user_avatar": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/profile/jason",
        "title": "Uji Love Letter",
        "description": "Uji sings love letter",
        "type": "video",
        "file_url": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/post_files/oVg1.mp4",
        "tags": [],
        "assets": [],
        "balance": 0,
        "votesup": 0,
        "votesdown": 0,
        "votessum": 0,
        "rank": 5,
        "score": 1425494229213
      }, {
        "id": "19",
        "created": "2015-03-04T14:28:01.534Z",
        "user_id": "igor",
        "user_name": "igor",
        "user_avatar": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/profile/igor",
        "title": "cat",
        "description": "robot",
        "type": "video",
        "file_url": "http://ernrdevapp.s3-website-us-east-1.amazonaws.com/post_files/4zV4.mp4",
        "tags": [],
        "assets": [],
        "balance": 0,
        "votesup": 0,
        "votesdown": 0,
        "votessum": 0,
        "rank": 6,
        "score": 1425479281534
      }];
    });

    it('should be a valid module', function () {
      expect(feed).to.be.an('object');
    });

    it('should has feed directive', function () {
      $scope.post = $scope.feeds[0];

      var element = $compile('<div feed-full="post"></div>')($scope);
      $scope.$digest();
      var a = angular.element(element.children().find('a')[1]);

      expect(a.text()).to.equal($scope.post.user_name);
    });
  });
});

