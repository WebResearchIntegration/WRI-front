'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:questionsCtrl
 * @description
 * # questionsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('questionsCtrl', function ($scope, Questions, $rootScope) {
        
        var ctrl = this;

        // [PUBLIC VARIABLES]
        ctrl.questions;

        // [INIT]
        init();

        // [PUBLIC METHODS]
        ctrl.addQuestion = addQuestion;
        
        ///////////////////

        // [METHODS : begin]
        /**
        * @name init
        * @desc Will init the controller with data from database
        * @memberOf Directives.questionViewer
        */
        function init(){
            Questions.getAll().then(function(questions) {
                ctrl.questions = questions;
            });
        }

        /**
        * @name addQuestion
        * @desc Will send an empty question into the question editor
        * @memberOf Directives.questionViewer
        */
        function addQuestion() {
            var newQuestion = {
                problematic: "",
                answer: ""
            };
            $scope.$emit('questions:new', newQuestion);
        }
        // [METHODS : end]

        // [PRIVATE METHODS : begin]
        // [PRIVATE METHODS : end]

        // [EVENTS]
        $rootScope.$on('questions:refresh', function(event) {
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
