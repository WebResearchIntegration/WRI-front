'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('notesCtrl', function ($scope, ngDialog, $rootScope, $compile, Notes) {
        
        var ctrl = this;

        $scope.noteEdit = {};

        // $scope.selectedElementType = "note"

        init()

        ctrl.newNote = function(){
            var targetId = _.maxBy(ctrl.notes, 'id')
            var id = targetId.id + 1;

            var obj = {
                'id' : id,
                'problematic' : '',
            }

            ctrl.notes.unshift(obj);
            $scope.noteEdit.id = obj.id
            $scope.noteEdit.text = obj.text;

        }

        ctrl.saveNote = function(note){
            var obj = {};

            var isDuplicate = _.find(ctrl.notes, ['id', note.id])

            obj.text = note.text
            isDuplicate.text = obj.text

            var elToBind = document.getElementById(isDuplicate.id)
            elToBind.innerHTML = angular.element(isDuplicate.text)[0].innerHTML

        }

        ctrl.editNote = function(note){
            var obj = {
                'id': note.id,
                'text': note.text,
            }

            $scope.noteEdit.id = obj.id;
            $scope.noteEdit.text = obj.text;

        }

        function initList(){
            Notes.getAll().then(function(notes) {
                ctrl.notes = notes;
            });
        }

        function init(){
            initList()
        }


        $rootScope.$on('sendFilters', function(event, data) {
            if(data === 'reset'){
                $scope.filter = {}    
                $scope.order = {};
            } else {
                $scope.filter = data;
            }
        });

        $rootScope.$on('sendOrderBy', function(event, data) {
            $scope.order = data;
        });
    });




