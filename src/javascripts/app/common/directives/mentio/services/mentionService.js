define(function (require) {
  'use strict';

  function factory ($http, constant) {
    return {
      autocomplete: function (query) {
        return $http.get(constant.search + '/elasticsearch/suggestusers', {params: {q: query } });
      }
    };
  }

  return ['$http', 'apiDomain', factory];
});
