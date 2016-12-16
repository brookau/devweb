/* istanbul ignore next */
define([
    'angular',
    'angularReCaptcha',
    'angularRoute',
    'text!./templates/navbar.html',
    'text!./templates/navbar_new.html',
    './controllers/navbarController',
    'app/common/context/user',
    'app/common/services/profileService',
    'app/common/services/loginService',
    'app/common/directives/upload/upload',
    'app/common/directives/searchField',
    'app/common/services/userCreationService',
    'angular-messages',
    'app/common/directives/signInUp/signInUp',
    'app/common/directives/defaultSrc'
  ],
  function (angular,
            captcha,
            angularRoute,
            template,
            templateNew,
            navbarController) {
    'use strict';

    var module = angular.module('ernr.navbar', [
      'reCAPTCHA',
      'ernr.userService',
      'ernr.ProfileService',
      'ernr.loginService',
      'ernr.directives.upload',
      'ernr.userCreationService',
      'ernr.directives.searchField',
      'ngMessages',
      'ernr.directives.signInUp',
      'ernr.directives.defaultSrc'
    ]);

    // Add navbar into the cache so ng-include can resolve and not go into an infinite loop
    module.run(['$templateCache', function ($templateCache) {
      $templateCache.put('navbar', template);
      $templateCache.put('navbar.new', templateNew);
    }]);

    module
      // .config(['reCAPTCHAProvider', function (reCAPTCHAProvider) {

      //   reCAPTCHAProvider.setPublicKey('6LemHgITAAAAAFpb1visOPxdCRnrAsTid-qAqqNQ');
      //   reCAPTCHAProvider.setOptions({
      //     theme: 'clean'
      //   });
      // }])
      .controller('navbarController', navbarController);

    return module;
  });
