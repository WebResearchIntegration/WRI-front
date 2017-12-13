'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('notesCtrl', function ($scope, ngDialog, $rootScope) {
        
        var ctrl = this;

        ctrl.noteEdit = {
            'name' : '',
            'content' : ''
        };

        ctrl.notes = [
            {
                'name' : 'Note X',
                'content' : ''
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

        ctrl.saveNote = function(note){

            var isDuplicate = _.find(ctrl.notes, ['name', note.name])
            console.log('notes : ', ctrl.notes );
            console.log('name : ', note.name );
            console.log('isDuplicate : ', isDuplicate );
            
            if(!isDuplicate){
                var promptVal = prompt('name ?')
                console.log(promptVal );
                var obj = {
                    'name' : promptVal,
                    'content' : note.content
                };
                ctrl.notes.unshift(obj);

            } else {
                isDuplicate.content = note.content;
            }

            // ctrl.noteEdit.content = '';
        }

        ctrl.editNote = function(note){
            ctrl.noteEdit.content = note.content;
            ctrl.noteEdit.name = note.name;
        }
  
    });
