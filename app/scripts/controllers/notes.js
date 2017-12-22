'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('notesCtrl', function ($scope, ngDialog, $rootScope, $compile) {
        
        var ctrl = this;

        ctrl.noteEdit = {
            'name' : '',
            'content' :  '',
            'tex' : ''
        };

        ctrl.noteEdit.totalContent = ctrl.noteEdit.content + ctrl.noteEdit.tex


        ctrl.notes = [
            {
                'name' : 'Note X',
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

        ctrl.newNote = function(note){
            var obj = {
                'name' : note.name,
                'content' : note.content,
                'tex': note.tex
            }

            var isDuplicate = _.find(ctrl.notes, ['name', obj.name])
            ctrl.newArray = _.pullAllWith(ctrl.notes, [isDuplicate], _.isEqual);
            ctrl.notes.unshift(obj);
            ctrl.noteEdit.name = '';
            ctrl.noteEdit.content = '';
            ctrl.noteEdit.tex = '';
        }

        ctrl.saveNote = function(note){
            var obj = {};

            var isDuplicate = _.find(ctrl.notes, ['name', note.name])

            if(!isDuplicate){
                var promptVal = prompt('name ?')
                console.log(promptVal );

                    
                obj = {
                    'name' : promptVal,
                    'content' : note.content,
                    'tex': note.tex
                };

                ctrl.notes.unshift(obj);
                ctrl.noteEdit.name = '';
                ctrl.noteEdit.content = '';
                ctrl.noteEdit.tex = '';
            } else {
                obj.content = note.content
                isDuplicate.content = obj.content
            }

            
        }

        ctrl.editNote = function(note){
            ctrl.noteEdit = note;
            console.log(note );
            // ctrl.reload(note.tex);       
        }

        // ctrl.reload = function(texExprssion){
        //     var el = angular.element(document.getElementsByClassName('mathjax'))
        //     el.html(texExprssion);
        //     MathJax.Hub.Queue(["Typeset", MathJax.Hub, el[0]]);
        // }


        ctrl.addFormula = function(data){
            var el =  angular.element(document.querySelector("div[contenteditable='true']"));
            ctrl.noteEdit.tex += data.tex;
            angular.element(el[0].childNodes[0]).append(data.div);
        }

        $rootScope.$on('mathFormula', function(event, data){
            ctrl.addFormula(data);
        })

    });




