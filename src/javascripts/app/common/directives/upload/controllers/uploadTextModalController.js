define(['angular', 'lodash'],
  function (angular, _) {
  'use strict';

  return ['$scope', '$modalInstance', '$window', 'uploadFileFactory', 'postFactory', '$timeout',
    function ($scope, $modalInstance, $window, uploadFile, postFactory, $timeout) {
      $scope.postFormType = 'text';

      $scope.data = {
        thumb: {},
        tags: []
      };

      $scope.onAjax = false;

      $scope.closeDialog = function() {
        $modalInstance.close();
      };

      $scope.discard = function () {
        $scope.data.files = null;
      };

      $scope.createPost = function(thumb) {
        $scope.parseMessage();

        var data = {
          "title": $scope.data.title,
          "description": $scope.data.description,
          "type": "text",
          "thumb": thumb,
          "tags": $scope.data.alltags,
          "mentions": $scope.data.mentions
        };

        return postFactory.createpost(data)
          .success(function(data) {
            $scope.onAjax = false;
            $modalInstance.close(data.result);
          })
          .error(function(data) {
            $scope.onAjax = false;
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.parseMessage = function () {
        var message = $scope.data.description,
          tagsRegex = new RegExp('(^|\\s)#(\\S+)', 'g'),
          mentionsRegex = new RegExp('(^|\\s)@(\\S+)', 'g'),
          tags = [],
          tag = tagsRegex.exec(message),
          mentions = [],
          mention = mentionsRegex.exec(message);
        while (tag) {
          tags.push(tag[2].replace(/#/g, ''));
          tag = tagsRegex.exec(message);
        }
        tags = _.compact($scope.data.tags.concat(tags));
        $scope.data.alltags = _.uniq(tags);
        while (mention) {
          mentions.push(mention[2].replace(/^@/, ''));
          mention = mentionsRegex.exec(message);
        }
        $scope.data.mentions = mentions;
      };

      $scope.upload = function () {
        if ($scope.onAjax) {
          return;
        }
        if (!$scope.data.thumb.blob) {
          $scope.createPost(null);
          return;
        }

        $scope.onAjax = true;
        uploadFile.getThumb($scope.data.thumb.blob)
          .success(function (data) {
            $scope.createPost(data.result.url);
          })
          .error(function (data) {
            $scope.onAjax = false;
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };
    }
  ];

});
