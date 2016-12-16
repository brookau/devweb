define([
    'angular',
    'app/common/resources/constants/constants',
    'mentio',
    'text!./templates/mentio-menu.tpl.html',
    './services/mentionService',
    './controllers/mentionCtrl'
  ],
  function (angular,
            constantsModule,
            mentio,
            mentioMenuTpl,
            mentionService,
            mentionCtrl) {

    return angular.module('ernr.directives.mentio', [
      'mentio',
      'common.resources.constant'
    ])
      .run(["$templateCache", function ($templateCache) {
        $templateCache.put("mentio-menu.tpl.html", mentioMenuTpl);
      }])
      .factory('mentionFactory', mentionService)
      .directive("mentionTextarea", function () {
        return {
          restrict: 'E',
          replace: true,
          controller: mentionCtrl,
          template: '<textarea ' +
          'mentio ' +
          'mentio-search="searchPeople(term)" ' +
          'mentio-select="getPeopleTextRaw(item)" ' +
          'mentio-typed-text="typedTerm" ' +
          'mentio-items="people"></textarea>'
        };
      })
      .directive("mentionInput", function () {
        return {
          restrict: 'E',
          replace: true,
          controller: mentionCtrl,
          template: '<input ' +
          'mentio ' +
          'mentio-search="searchPeople(term)" ' +
          'mentio-select="getPeopleTextRaw(item)" ' +
          'mentio-typed-text="typedTerm" ' +
          'mentio-items="people"></input>'
        };
      });
  });
