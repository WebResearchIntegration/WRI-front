'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('notesCtrl', function ($scope) {
        
        $scope.listItems = [
            {
                'name' : 'Note X'
            },
            {
                'name' : 'Note X'
            },
            {
                'name' : 'Note X'
            },
            {
                'name' : 'Note X'
            },
            {
                'name' : 'Note X'
            },
            {
                'name' : 'Note X'
            },
            
        ];
    });
