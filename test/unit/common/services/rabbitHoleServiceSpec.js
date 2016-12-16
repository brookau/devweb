define(function (require) {
  'use strict';
  var angular = require('angular'),
      moment = require('moment'),
      rabbitHoleService = require('app/common/services/rabbitHoleService'),
      rabbitHoleFactory, constant, $httpBackend;

  describe('rabbitHole service', function () {
    beforeEach(module('ernr.rabbitHoleService'));

    beforeEach(function () {
        inject(function (_rabbitHoleFactory_, _apiDomain_, _$httpBackend_) {
            rabbitHoleFactory = _rabbitHoleFactory_;
            constant = _apiDomain_;
            $httpBackend = _$httpBackend_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be a valid service', function () {
        expect(rabbitHoleService).to.be.an('object');
    });

    it('should has the get method', function () {
        expect(rabbitHoleFactory.get).to.be.an('function');
    });

    
    it.skip('should send a request when call to the get method', function() {
      var request,
          url = constant.rabbitHole,
          votes = "votes_" + moment().format('YYYYMMDD'),
          params = {
            "indices_boost": {
              "rabadaba": 1,
            },
            "query": {
              "function_score": {
                "query": {
                  "multi_match": {
                    "fields": ["title", "tags"],
                    "query": "test"
                  }
                },
                "functions": [{
                  "filter": {
                    "term": {
                      "tags": "hot"
                    }
                  },
                  "weight": 1
                }],
                "boost_mode": "replace"
              }
            }
          },
          respond = {
            "error": "",
            "result": {
              "success": true
            }
          };

      params.indices_boost[votes] = 10;

      $httpBackend.when('POST', url).respond(respond);
      $httpBackend.expectPOST(url, params);

      rabbitHoleFactory.get('test').success(function (data) {
        request = data;
      });

      $httpBackend.flush();

      expect(request.result.success).to.equal(true);
    });
  });
});


