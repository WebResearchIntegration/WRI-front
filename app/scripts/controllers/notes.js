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

        $scope.notes = [
            {
                'id' : 1,
                'text' : ''
            }
        ];

        $scope.selectedElementType = "note"

        init()

        ctrl.newNote = function(){
            var targetId = _.maxBy($scope.notes, 'id')
            var id = targetId.id + 1;

            var obj = {
                'id' : id,
                'problematic' : '',
            }

            $scope.notes.unshift(obj);
            $scope.noteEdit.id = obj.id
            $scope.noteEdit.text = obj.text;

        }

        ctrl.saveNote = function(note){
            var obj = {};

            var isDuplicate = _.find($scope.notes, ['id', note.id])

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
            $scope.noteEdit = {
                'id' : 1,
                'text' : ''
            }
            // $scope.notes.forEach(function(note){
            //     var elToBind = document.getElementById(note.id)
            //     elToBind.innerHTML = angular.element(note.text)[0].innerHTML
            // })
        }

        function init(){
            initList()
        }
    });




