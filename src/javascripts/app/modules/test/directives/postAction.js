define([
    'app/modules/login/controllers/login',
    'text!app/modules/login/loginModal.html'
  ],
  function (loginController,
            loginModalTemplate) {
    'use strict';

    var directive = ['$timeout', '$rootScope', 'userFactory', '$modal', '$templateCache', function ($timeout, $rootScope, userFactory, $modal, $templateCache) {
      return {
        restrict: 'A',
        scope: {
          postAction: '&'
        },
        link: function (scope, element, attributes) {
          $templateCache.put('loginModal', loginModalTemplate);

          var modalInstance;
          element.on('click', function () {
            if (userFactory.isLoggedIn) {
              scope.postAction();
            } else {
              modalInstance = $modal.open({
                templateUrl: 'loginModal',
                controller: loginController
              });

              modalInstance.result.then(function (rs) {
                scope.postAction();
              }, function (r) {
              });
            }
          });

          scope.$on("$destroy", function () {
            element.off('click');
          });
        }
      };
    }];

    return directive;
  });