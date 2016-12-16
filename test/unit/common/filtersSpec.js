define(function (require) {
  'use strict';

  var angular = require('angular'),
      filters = require('app/common/filters'),
      $filter;

  describe('filter', function() {
    beforeEach(module('ernr.filters'));

    beforeEach(function () {
      inject(function (_$filter_) {
        $filter = _$filter_;
      });
    });

    it('tagToLink should convert #tag to link', function() {
      var input = "This is #tag",
          result = 'This is <a href="/tags/tag">#tag</a>';

      expect($filter('tagToLink')(input)).to.equal(result);
    });

    it('nameToLink should convert #tag to link', function() {
      var input = "This is @name",
          result = 'This is <a href="/users/name">@name</a>';

      expect($filter('nameToLink')(input)).to.equal(result);
    });

    it('pager should return pat of array', function() {
      var input = [1,2,3,4,5];

      expect($filter('pager')(input, 0, 2).length).to.equal(2);
      expect($filter('pager')(input, 4, 4).length).to.equal(1);
    });

    it('parseAvatar should return src', function() {
      var input = { user_id: 'qwerty', tags: []};
      var src = 'http://cdn1.small.rabadaba.com/prod/thumbs/users/' + input.user_id + '/m/1';
      expect($filter('parseAvatar')(input).toString()).to.equal(src);
    });

    it('parseName should return src', function() {
      var input = { user_id: 'qwerty', user_name: '123456'};
      var input2 = { user_id: 'qwerty'};
      expect($filter('parseName')(input)).to.equal('123456');
      expect($filter('parseName')(input2)).to.equal('qwerty');
    });
  });
});


