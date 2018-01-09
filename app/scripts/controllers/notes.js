'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('notesCtrl', function ($scope, Notes) {
        
        var ctrl = this;

        ctrl.notes = [];

        (ctrl.init = function() {
            Notes.getAll().then( function(notes) {
                ctrl.notes = notes;
            });
        })();
    });
