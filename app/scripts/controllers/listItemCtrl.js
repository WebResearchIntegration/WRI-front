'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:listItemCtrl
 * @description
 * # listItemCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('listItemCtrl', function ($scope) {
        
        $scope.listItems = [
            {
                'name' : 'Author X'
            },
            {
                'name' : 'Author X'
            }
            
        ];
    });
