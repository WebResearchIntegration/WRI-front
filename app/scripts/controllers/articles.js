'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope) {
        
        $scope.listItems = [
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            
        ];
    });
