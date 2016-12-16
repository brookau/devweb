define([
  'angular',
  'lodash',
  'text!../templates/postsComments.html',
  'app/common/services/postService',
  'app/common/services/commentsService',
  'app/common/context/user',
  'app/common/directives/report/report',
  'angular-messages'
],
function (angular, _, template) {
  'use strict';

  return angular.module('ernr.directives.postsComments', [
    'ernr.postService',
    'ernr.commentsService',
    'ernr.userService',
    'ernr.directives.report',
    'ngMessages'
  ])
    .directive('postsComments', function () {

      return {
        restrict: 'E',
        replase: true,
        scope: {
          post: '='
        },
        controller: [
          '$scope',
          'postFactory',
          'commentsFactory',
          'userFactory',
          function ($scope, posts, comments, currentUser) {
            $scope.comments = [];
            $scope.currentUser = currentUser.getInfo();
            $scope.isUpdate = false;
            $scope.page = 1;
            $scope.per_page = 20;
            $scope.onLoading = false;
            $scope.stopLoadMore = false;

            function update () {
              $scope.isUpdate = true;
              $scope.page = 1;
              $scope.per_page = 20;
              $scope.onLoading = false;
              $scope.stopLoadMore = false;
              $scope.loadMore();
            }

            $scope.loadMore = function () {
              if ($scope.onLoading || $scope.stopLoadMore) {
                return;
              }

              $scope.onLoading = true;

              posts.comments($scope.post.id, { page: $scope.page, per_page: $scope.per_page })
                .success(function (data) {
                  var items = data.result.items;
                  $scope.total = data.result.total;

                  if ($scope.isUpdate) {
                    $scope.isNewComment = false;
                    $scope.comments = items;
                  } else {
                    $scope.comments = $scope.comments.concat(items);
                  }

                  $scope.page++;
                  $scope.stopLoadMore = items.length < $scope.per_page;
                  $scope.onLoading = false;
                });
            };

            $scope.createComment = function () {
              comments.create($scope.post.id, $scope.comment).success(function (resp) {
                $scope.comment = "";
                update();
              });
            };

            $scope.vote = function (id, method) {
              comments[method](id).success(function (resp) {
                var comment = _.findWhere($scope.comments, { id: resp.result.id });

                comment.votesbalance = resp.result.votesbalance;
                comment.votesdown = resp.result.votedown;
                comment.votessum = resp.result.votessum;
                comment.votesup = resp.result.votesup;
              });
            };

            $scope.remove = function (id) {
              comments.remove(id).success(update);
            };

            $scope.toggleEdit = function (id, comment) {
              $scope.editedComment = {
                id: id,
                text: comment
              };
            };

            $scope.editComment = function () {
              comments.edit($scope.editedComment.id, $scope.editedComment.text)
                .success(function (resp) {
                  var comment = _.findWhere($scope.comments, { 'id': resp.result.id });

                  if (comment) {
                    comment.text = resp.result.text;
                  }

                  $scope.toggleEdit();
                });
            };
          }
        ],
        template: template
      };
    });
});
