define(function (require) {
  'use strict';

  var angular = require('angular'),
    ngRoute = require('angularRoute'),
    uploadMenu = require('app/common/directives/upload/upload'),
    uploadMenuCtrl = require('app/common/directives/upload/controllers/upload'),
    uploadTmpl = require('text!app/common/directives/upload/templates/upload.html'),
    notifications = require('app/common/services/notificationsService'),
    $compile, $scope, $modal, _modal, controller, template;

  _modal = {
    open: function () {
      return {
        result: {
          then: function () {
          }
        }
      };
    }
  };

  describe('uploadMenu directive', function () {
    // notificationServices
    beforeEach(module('ernr.notifications'));

    beforeEach(module('ernr.directives.upload', function ($provide, $controllerProvider) {
      $provide.factory('$modal', function () {
        // Service/Factory Mock
        return _modal;
      });
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();

      var element = angular.element("<upload-menu></upload-menu>");
      template = $compile(element)($scope);
      $scope.currentUser.isLoggedIn = true;
      $scope.$digest();
    }));

    it('should be a valid module', function () {
      expect(uploadMenu).to.be.an('object');
    });

    it('should has uploadMenu directive', function () {
      expect(angular.element(template.children(0)[0]).text().trim()).to.equal('Upload Photo');
      expect(angular.element(template.children(0)[1]).text().trim()).to.equal('Upload Text');
      expect(angular.element(template.children(0)[2]).text().trim()).to.equal('Upload Audio');
      expect(angular.element(template.children(0)[3]).text().trim()).to.equal('Upload Video');
    });

    it('should open modal when click', function () {
      // trigger click
      var once = sinon.spy(_modal, 'open');

      angular.element(template.children(0).children(0)[0]).triggerHandler('click');

      expect(once.called).to.be.true;
    });

    it('should show "Please sign in" when user is not logged in', function () {
      $scope.currentUser.isLoggedIn = false;
      $scope.$digest();

      expect(angular.element(template.children(0)[0]).text().trim()).to.equal('Please sign in');
    });
  });
});
