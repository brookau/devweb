define(function (require) {
  'use strict';

  function factory ($http, constant) {
    return {
      find: function (params) {
        return $http.get(constant.search + '/elasticsearch/find', { params: params });
      }
    };
  }


  return ['$http', 'apiDomain', factory];

});
