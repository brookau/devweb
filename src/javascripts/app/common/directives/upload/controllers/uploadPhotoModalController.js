define(['angular', 'lodash'],
  function (angular, _) {
  'use strict';

  return ['$scope', '$modalInstance', '$window', 'uploadFileFactory', 'postFactory', '$timeout',
    function ($scope, $modalInstance, $window, uploadFile, postFactory, $timeout) {
      $scope.postFormType = 'photo';

      $scope.data = {
        thumb: '',
        tags: [],
        files: null
      };

      $scope.onAjax = false;

      $scope.isFileAPISupported = !!($window.File && $window.FileReader && $window.FileList && $window.Blob);

      $scope.closeDialog = function () {
        $modalInstance.close();
      };

      $scope.discard = function () {
        $scope.data.files = null;
      };

      $scope.generateThumb = function (file) {
        if (file === null || !file.type.match('image.*')) {
          return;
        }

        var fileReader = new $window.FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
          file.dataUrl = e.target.result;
          $timeout(function () {
            $scope.data.thumb = e.target.result;
          });
        };
      };

      $scope.createPost = function (thumb, file_url, mobile_url) {
        $scope.parseMessage();

        var data = {
          "title": $scope.data.title,
          "description": $scope.data.description,
          "type": "image",
          "thumb": thumb,
          "file_url": file_url,
          "mobile_url": mobile_url,
          "tags": $scope.data.alltags,
          "mentions": $scope.data.mentions
        };

        return postFactory.createpost(data)
          .success(function (data) {
            $scope.onAjax = false;
            $modalInstance.close(data.result);
          })
          .error(function (data) {
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
        if (!$scope.data.files || !$scope.data.files[0] || $scope.onAjax) {
          return;
        }

        $scope.onAjax = true;
        uploadFile.upload($scope.data.files[0])
          .success(function (data) {
            $scope.createPost(data.result.thumbnail_url, data.result.url, data.result.mobile_url);
          })
          .error(function (data) {
            $scope.onAjax = false;
            $scope.message = data.error;
            $scope.state = 'error';
          });
      };

      $scope.onFileChange = function (files) {
        $scope.data.files = files;
        files.forEach(function (file) {
          $scope.generateThumb(file);
        });
      };
    }
  ];

});
