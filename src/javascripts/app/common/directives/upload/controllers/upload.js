define([
    'text!../templates/uploadModal.html',
    './uploadmodal',
    './uploadPhotoModalController',
    './uploadTextModalController',
    './uploadAudioModalController',
    './uploadVideoModalController'
  ],
  function (templateUploadModal,
            uploadCtrl,
            uploadPhotoCtrl,
            uploadTextCtrl,
            uploadAudioCtrl,
            uploadVideoCtrl) {
    'use strict';

    return ['$scope', '$modal', 'userFactory', 'notifications',
      function ($scope, $modal, userFactory, notifications) {
        function getCurrentController(type) {
          var result = uploadCtrl;

          if (type === 'photo') {
            result = uploadPhotoCtrl;
          } else if (type === 'text') {
            result = uploadTextCtrl;
          } else if (type === 'audio') {
            result = uploadAudioCtrl;
          } else if (type === 'video') {
            result = uploadVideoCtrl;
          }

          return result;
        }

        $scope.LoginSuccessHandler = function (args) {
          // console.log('received login success event');
        };

        // subscribe to loginsuccess
        notifications.onLoginSuccess($scope, $scope.LoginSuccessHandler);

        $scope.openModal = function (type) {
          var modal = $modal.open({
            template: templateUploadModal,
            controller: getCurrentController(type),
            keyboard: false,
            resolve: {
              modalType: function () {
                return type;
              }
            }
          });

          modal.result.then(function (feed) {
            notifications.newFeedAdded(feed);
          });
        };

        $scope.currentUser = userFactory;
      }
    ];
  });
