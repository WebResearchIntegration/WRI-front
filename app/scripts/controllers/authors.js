'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:authorsCtrl
 * @description
 * # authorsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('authorsCtrl', function ($scope) {
        
        $scope.listItems = [
            {
                'name' : 'Author X'
            },
            {
                'name' : 'Author X'
            }
            
        ];
    });
