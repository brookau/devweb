define(['angular', 'lodash'],
  function (angular, _) {
  'use strict';

  return ['$scope', '$modalInstance', '$window', 'uploadFileFactory', 'postFactory', '$timeout',
    function ($scope, $modalInstance, $window, uploadFile, postFactory, $timeout) {
      $scope.postFormType = 'audio';

      $scope.data = {
        thumb: {},
        thumb_url: '',
        tags: [],
        audiofiles: null
      };

      $scope.onAjax = false;

      $scope.isFileAPISupported = !!($window.File && $window.FileReader && $window.FileList && $window.Blob);

      $scope.closeDialog = function() {
        $modalInstance.close();
      };

      $scope.discard = function () {
        $scope.data.audiofiles = null;
      };

      $scope.createPost = function(file_url) {
        $scope.parseMessage();

        var data = {
          "title": $scope.data.title,
          "description": $scope.data.description,
          "type": "audio",
          "thumb": $scope.data.thumb_url,
          "file_url": file_url,
          "tags": $scope.data.alltags,
          "mentions": $scope.data.mentions
        };

        return postFactory.createpost(data)
          .success(function(data) {
            $modalInstance.close(data.result);
          })
          .error(function(data) {
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

      $scope.getThumbnail = function () {
        if ($scope.onAjax) {
          return;
        }

        if (!$scope.data.thumb || !$scope.data.thumb.blob) {
          if (angular.isDefined($scope.data.audiofiles) && $scope.data.audiofiles[0]) {
            $scope.upload();
          }
          return;
        }

        $scope.onAjax = true;
        uploadFile.getThumb($scope.data.thumb.blob)
          .success(function (data) {
            $scope.data.thumb_url = data.result.url;
            $scope.upload();
          })
          .error(function (data) {
            $scope.onAjax = false;
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.upload = function() {
        $scope.onAjax = true;
        uploadFile.upload($scope.data.audiofiles[0])
          .progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = 'progress: ' + progressPercentage + '% ' + evt.config.file.name;
          })
          .success(function(data) {
            $scope.createPost(data.result.url);
            $scope.onAjax = false;
          })
          .error(function(data) {
            $scope.message = data.error;
            $scope.state = 'error';
            $scope.onAjax = false;
          });
      };
    }
  ];

});
