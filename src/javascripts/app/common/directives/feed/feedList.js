define([
    'angular',
    'text!./templates/feedList.html',
    'app/common/directives/feed/feed',
    'app/common/services/feedService',
    'app/common/services/notificationsService'
  ],
  function (angular, template) {
    'use strict';

    var module = angular.module('ernr.directives.feedList', [
      'ernr.directives.feed',
      'ernr.feedService',
      'ernr.notifications'
    ])
      .directive("feedsList", function () {
        return {
          restrict: 'A',
          scope: {
            feedDatestamp: '=',
            feedType: '=',
            currentTopic: '=',
            feedTopic: '='
          },
          template: template,
          controller: ['$scope', 'feedFactory', 'notifications', '$timeout', function ($scope, feedFactory, notifications, $timeout) {
            var init = true;

            $scope.filter = {
              page: 1,
              per_page: 20,
              datestamp: $scope.feedDatestamp,    // recent, activity, popularity
              type: $scope.feedType,              // video, audio, image, text
              topic: $scope.feedTopic             // main, mentions, public;
            };

            $scope.onLoading = false;
            $scope.stopLoadMore = false;

            $scope.feeds = [];

            function loadFeeds() {
              if ($scope.onLoading || $scope.stopLoadMore || (angular.isDefined($scope.currentTopic) && $scope.currentTopic !== $scope.filter.topic && !init)) {
                return;
              }

              var params = {
                page: $scope.filter.page,
                per_page: $scope.filter.per_page,
                datestamp: $scope.filter.datestamp,
                type: $scope.filter.type,
                topic: $scope.filter.topic
              };

              $scope.onLoading = true;

              feedFactory.search(params).then(function (resp) {
                // success
                $scope.feeds.push.apply($scope.feeds, resp.data.result.items);

                $scope.stopLoadMore = resp.data.result.items.length < $scope.filter.per_page;
                $scope.filter.page++;
              }, function (err) {
                // error
              }).finally(function () {
                $timeout(function () {
                  $scope.onLoading = false;
                }, 500);
                init = false;
              });
            }

            function clearFeeds() {
              $scope.feeds.splice(0, $scope.feeds.length);
            }

            function updateFilters() {
              $scope.filter.page = 1;
              $scope.filter.datestamp = $scope.feedDatestamp;
              $scope.filter.type = $scope.feedType;
            }

            $scope.loadFeeds = loadFeeds;

            $scope.$watch('feedDatestamp', function (o, n) {
              if (o !== n) {
                $scope.stopLoadMore = false;
                init = true;
                clearFeeds();
                updateFilters();
                loadFeeds();
              }
            });

            $scope.$watch('feedType', function (o, n) {
              if (o !== n) {
                $scope.stopLoadMore = false;
                init = true;
                clearFeeds();
                updateFilters();
                loadFeeds();
              }

            });

            notifications.onNewFeedAdded($scope, function (newFeed) {
              if (newFeed) {
                $scope.feeds.unshift(newFeed);
              }
            });
          }],
          link: function (scope, element, attributes) {

          }
        };
      });

    return module;
  })
;
