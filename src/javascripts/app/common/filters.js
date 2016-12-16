define(['angular'],
  function(angular) {
    'use strict';

    var module = angular.module('ernr.filters', [])
      .filter('tagToLink', function() {
        return function(input) {
          var reg = new RegExp('#([a-zA-Z0-9])*', 'g');

          var text = input.replace(reg, function(str) {
            var tag = str.replace(/#/g, '');
            return '<a href="/tags/' + tag + '">' + str + '</a>';
          });

          return text;
        };
      })
      .filter('nameToLink', function() {
        return function(input) {
          var reg = new RegExp('@([a-zA-Z0-9_])*', 'g');

          var text = input.replace(reg, function(str) {
            var name = str.replace(/@/g, '');
            return '<a href="/users/' + name + '">' + str + '</a>';
          });

          return text;
        };
      })
      .filter('unsafe', function($sce) {
        return function(input) {
          return $sce.trustAsHtml(input);
        };
      })
      .filter('pager', function() {
        return function(input, offset, limit) {
          if (!(input instanceof Array)) {
            return input;
          }

          var out = [];
          offset = parseInt(offset, 10);
          limit = parseInt(limit, 10);

          if (!limit) {
            limit = input.length;
          } else {
            limit += offset;
          }

          for (var i = offset; i < limit; i++) {
            if (input[i]) {
              out.push(input[i]);
            }
          }

          return out;
        };
      })
      .filter('parseName', function() {
        return function (post) {
          var name = post.user_name;
          var id = post.user_id ? post.user_id : post.id;

          if (!name) {
            name = id;
          }

          return name;
        };
      })
      .filter('parseAvatar', function($sce) {
        return function(obj) {
          var id = obj.tags ? obj.user_id : obj.id;
          var src = 'http://cdn1.small.rabadaba.com/prod/thumbs/users/' + id + '/m/1';

          return $sce.trustAsHtml(src);
        };
      })
      .filter('parseFileUrl', function() {
        return function(post) {
          var url = '';
          if (post.file_url) {
            url = post.file_url.replace('s3', 'cdn1.large');
          }
          return url;
        };
      })
     .filter('parseThumb', function() {
        return function(post) {
          var url = '';
          if (post.thumbtype) {
            url = 'http://cdn1.small.rabadaba.com/prod/thumbs/posts/'+ post.id + '/m/1.' + post.thumbtype;
          } else {
            url = 'http://cdn1.small.rabadaba.com/prod/thumbs/users/'+ post.user_id + '/m/1';
          }
          return url;
        };
      });

    return module;

  });
