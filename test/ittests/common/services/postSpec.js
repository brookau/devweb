define(['angular', 'angularMocks'], function (angular, angularMocks) {

    var postFactory, scope, $httpBackend, constant,
        postService = require('app/common/services/postService');

    beforeEach(module('common.resources.constant'));
    beforeEach(module('ernr.postService'));

    beforeEach(inject(function (_postFactory_, $rootScope, _$httpBackend_, _apiDomain_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        postFactory = _postFactory_;
        constant = _apiDomain_;
    }));

    describe('Test create new post', function () {

        it('should send a request when call to the create method and return result', function () {
            var request,
                url = constant.domain + '/posts',
                params = {
                    title: "Post title",
                    description: "Post description",
                    token: "[Authorization Token]",
                    thumb: "",
                    image_url: "",
                    tags: ["Tag 1", "Tag 2"],
                    assets: []
                },
                respond = {
                    "error": "",
                    "result": {
                        "id": "1",
                        "created": "2015-02-26T10:58:50",
                        "userid": "1",
                        "title": "Post title",
                        "description": "Post description",
                        "thumb": "",
                        "image_url": "",
                        "tags": ["Tag 1", "Tag 2"],
                        "assets": []
                    }
                };

            $httpBackend.when('POST', url).respond(respond);
            $httpBackend.expectPOST(url, params);

            postFactory.createpost(params).success(function (resp) {
                request = resp;
            });

            $httpBackend.flush();

            expect(request.result).to.not.be.undefined();
            expect(request.result.id).to.not.be.undefined();

            expect(request.result.id).to.eql("1");
            expect(request.result.title).to.eql(params.title);
            expect(request.result.description).to.eql(params.description);
            expect(request.result.tags).to.eql(params.tags);
        });

        it('should send a request when call to the create method and return error when title, description and token are empty', function () {
            var request,
                url = constant.domain + '/posts',
                params = {
                    title: "",
                    description: "",
                    token: "",
                    thumb: "",
                    image_url: "",
                    tags: [],
                    assets: []
                },
                respond = {
                    "error": "Something give errors"
                };

            $httpBackend.when('POST', url).respond(respond);
            $httpBackend.expectPOST(url, params);

            postFactory.createpost(params).success(function (data) {
                request = data;
            });

            $httpBackend.flush();

            expect(request.result).to.be.undefined();
            expect(request.error).to.not.eql("");


        });

        it('should send a request when call to the create method and return error when title is empty', function () {
            var request,
                url = constant.domain + '/posts',
                params = {
                    title: "",
                    description: "Description",
                    token: "Token",
                    thumb: "",
                    image_url: "",
                    tags: [],
                    assets: []
                },
                respond = {
                    "error": "Something give errors"
                };

            $httpBackend.when('POST', url).respond(respond);
            $httpBackend.expectPOST(url, params);

            postFactory.createpost(params).success(function (data) {
                request = data;
            });

            $httpBackend.flush();

            expect(request.result).to.be.undefined();
            expect(request.error).to.not.eql("");


        });

        it('should send a request when call to the create method and return error when description is empty', function () {
            var request,
                url = constant.domain + '/posts',
                params = {
                    title: "Title",
                    description: "",
                    token: "Token",
                    thumb: "",
                    image_url: "",
                    tags: [],
                    assets: []
                },
                respond = {
                    "error": "Something give errors"
                };

            $httpBackend.when('POST', url).respond(respond);
            $httpBackend.expectPOST(url, params);

            postFactory.createpost(params).success(function (data) {
                request = data;
            });

            $httpBackend.flush();

            expect(request.result).to.be.undefined();
            expect(request.error).to.not.eql("");
        });

        it('should send a request when call to the create method and return error when token is empty', function () {
            var request,
                url = constant.domain + '/posts',
                params = {
                    title: "Title",
                    description: "Description",
                    token: "",
                    thumb: "",
                    image_url: "",
                    tags: [],
                    assets: []
                },
                respond = {
                    "error": "Something give errors"
                };

            $httpBackend.when('POST', url).respond(respond);
            $httpBackend.expectPOST(url, params);

            postFactory.createpost(params).success(function (data) {
                request = data;
            });

            $httpBackend.flush();

            expect(request.result).to.be.undefined();
            expect(request.error).to.not.eql("");
        });

    });

    describe('Test get paths data', function () {
        it('should send a request when call to the get paths method and return paths list', function () {
            var request,
            //url = constant.domain + '/posts',
                url = 'javascripts/app/common/resources/json/mock/pathList.json',
                params = {
                    page: 0,
                    per_page: 20
                },
                respond = [
                    {
                        "id": 1,
                        "thumb_image": "http://placeimg.com/48/48/people",
                        "name": "sit amet",
                        "balan": "Frank Romero"
                    },
                    {
                        "id": 2,
                        "thumb_image": "http://placeimg.com/48/48/people",
                        "name": "eget semper",
                        "balan": "Elizabeth Mcdonald"
                    },
                    {
                        "id": 3,
                        "thumb_image": "http://placeimg.com/48/48/people",
                        "name": "sapien",
                        "balan": "Tina Snyder"
                    }];

            $httpBackend.when('GET', url).respond(respond);
            //$httpBackend.expectGET(url, params);

            postFactory.getPaths(params.page, params.per_page).then(function (resp) {
                request = resp;
            });

            $httpBackend.flush();

            expect(request).to.not.be.undefined();
            expect(request).to.eql(respond);
        });
    });

    describe('Test get rabbit holes data', function () {
        it('should send a request when call to the get rabbit holes method and return rabbit holes list', function () {
            var request,
            //url = constant.domain + '/posts',
                url = 'javascripts/app/common/resources/json/mock/rabbitHoles.json',
                params = {
                    page: 0,
                    per_page: 20
                },
                respond = [
                    {"id": 1, "thumb_image": "http://placeimg.com/48/48/tech", "name": "erat", "balan": "Gloria Rose"},
                    {
                        "id": 2,
                        "thumb_image": "http://placeimg.com/48/48/tech",
                        "name": "faucibus",
                        "balan": "Gary Snyder"
                    },
                    {
                        "id": 3,
                        "thumb_image": "http://placeimg.com/48/48/tech",
                        "name": "interdum",
                        "balan": "Doris Hamilton"
                    },
                    {
                        "id": 4,
                        "thumb_image": "http://placeimg.com/48/48/tech",
                        "name": "enim",
                        "balan": "Douglas Hamilton"
                    },
                    {
                        "id": 5,
                        "thumb_image": "http://placeimg.com/48/48/tech",
                        "name": "aliquam erat",
                        "balan": "Jessica Schmidt"
                    },
                    {
                        "id": 6,
                        "thumb_image": "http://placeimg.com/48/48/tech",
                        "name": "nisl",
                        "balan": "George Grant"
                    }];

            $httpBackend.when('GET', url).respond(respond);
            //$httpBackend.expectGET(url, params);

            postFactory.getRabbitHoles(params.page, params.per_page).then(function (resp) {
                request = resp;
            });

            $httpBackend.flush();

            expect(request).to.not.be.undefined();
            expect(request).to.eql(respond);
        });
    });
});
