define(function(require) {
  'use strict';

  var angular = require('angular'),
      mentioModule = require('app/common/directives/mentio/mentio'),
      $compile, $rootScope, mentionFactory;

  describe('mention', function() {
    beforeEach(module('ernr.directives.mentio'));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_, _mentionFactory_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        mentionFactory = _mentionFactory_;
      });
    });

    it('should be a valid module', function() {
      expect(mentioModule).to.be.an('object');
    });

    it('should has mentionTextarea derective', function() {
      var element = $compile("<mention-textarea ng-model='test'></mention-textarea>")($rootScope);
      $rootScope.$digest();
      expect(element.attr('mentio-search')).to.equal('searchPeople(term)');
      expect(element.attr('mentio-select')).to.equal('getPeopleTextRaw(item)');
      expect(element.attr('mentio-typed-text')).to.equal('typedTerm');
      expect(element.attr('mentio-items')).to.equal('people');
    });

    it('should has mentionInput derective', function() {
      var element = $compile("<mention-input ng-model='test'></mention-input>")($rootScope);
      $rootScope.$digest();
      expect(element.attr('mentio-search')).to.equal('searchPeople(term)');
      expect(element.attr('mentio-select')).to.equal('getPeopleTextRaw(item)');
      expect(element.attr('mentio-typed-text')).to.equal('typedTerm');
      expect(element.attr('mentio-items')).to.equal('people');
    });

    it('should has mentionFactory', function() {
      expect(mentionFactory).to.be.an('object');
    });

    it('should has autocomplete method from mentionFactory', function() {
      expect(mentionFactory.autocomplete).to.be.an('function');
      expect(mentionFactory.autocomplete()).to.be.an('object');
      expect(mentionFactory.autocomplete().then).to.be.an('function');
      expect(mentionFactory.autocomplete().success).to.be.an('function');
    });
  });
});
