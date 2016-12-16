define(function (require) {
  'use strict';

  function controller ($scope, mention) {
    $scope.people = [];

    $scope.searchPeople = function (term) {
      if (!term) {
        return false;
      }

      return mention.autocomplete(term)
        .then(function (response) {
          $scope.people = response.data.result.items;
        });
    };

    $scope.getPeopleTextRaw = function (item) {
      return '@' + item.id;
    };
  }

  return ['$scope', 'mentionFactory', controller];
});
