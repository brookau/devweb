define([
  'angular',
  'moment',
  'app/common/resources/constants/constants'
],
function(angular, moment) {
  'use strict';

  return angular.module('ernr.rabbitHoleService', [
      'common.resources.constant',
    ])
    .factory('rabbitHoleFactory', ['apiDomain', '$http',
      function(constant, $http) {
        

        function getQuery(post, from, size) {
          //var _query = "";
          //console.log(post);
          var _query = {},
            d = new Date(),
            n = d.getTime();
          _query.id = post.id;
          if (post.title.length > 0) {
            _query.title = post.title;
          }
          if (post.tags) {
            if (post.tags.length > 0) {
              _query.tags = post.tags.join(' ');
            }
          }
          if (from) {
            _query.from = from;
          }
          //_query += '&cachebust='+ n;
          
          //console.log(_query);

          return _query;
        }

        return {
          get: function(post, from, size) {
            //console.log(post);
            var params = getQuery(post, from, size);
            //console.log(params);
            return $http.post(constant.rabbitHole, params);
          }
        };
      }
    ]);
});
