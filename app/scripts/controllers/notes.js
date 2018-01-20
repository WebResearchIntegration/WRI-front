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

        // [PUBLIC VARIABLES]
        ctrl.notes;

        // [INIT]
        init();

        // [PUBLIC METHODS]
        ctrl.addNote = addNote;
        
        ///////////////////

        // [METHODS : begin]
        /**
        * @name init
        * @desc Will init the controller with data from database
        * @memberOf Directives.questionViewer
        */
        function init(){
            Notes.getAll().then(function(notes) {
                ctrl.notes = notes;
            });
        }

        /**
        * @name addNote
        * @desc Will send an empty question into the question editor
        * @memberOf Directives.questionViewer
        */
        function addNote() {
            var newNote = {
                text: ""
            };
            $scope.$emit('notes:new', newNote);
        }
        // [METHODS : end]

        // [PRIVATE METHODS : begin]
        // [PRIVATE METHODS : end]

        // [EVENTS]
        $rootScope.$on('notes:refresh', function(event) {
            init();
        });

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




