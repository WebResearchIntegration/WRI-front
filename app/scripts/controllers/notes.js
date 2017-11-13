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
        
        var ctrl = this;

        ctrl.notes = [
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
