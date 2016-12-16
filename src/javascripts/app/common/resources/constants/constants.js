define([
    'angular'
],function(angular) {
    'use strict';

    var constansModule = angular.module('common.resources.constant', [])
    .constant('apiDomain', {
        domain: 'http://api-prod.rabadaba.com',
        search: 'http://search-prod.rabadaba.com',
        rabbitHole: 'http://r-prod.rabadaba.com/query'
    });
  //    rabbitHole: http://r-dev.rabadaba.com/query?'
  
    return constansModule;
});
