'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:questionsCtrl
 * @description
 * # questionsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('questionsCtrl', function ($scope, Questions, $rootScope, Selector) {
        
        var ctrl = this;

        // [PRIVATE VARIABLES]
        var needToReinitList;
        var needToSetList;

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

                if(needToReinitList){
                    needToReinitList = false;
                    reinitSelection();
                }
                if (needToSetList){
                    needToSetList = false;
                    setSelection();
                }
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
            /**
             * @name reinitSelection()
             * @desc will unselect all questions
             */
            function reinitSelection() {
                if (Selector.getSelectionType() == "questions"){
                    Selector.reinitSelection(ctrl.questions); 
                }
            }

             /**
             * @name setSelection()
             * @desc will select all questions already present in the item which is being edited
             */
            function setSelection() {
                if (Selector.getSelectionType() == "questions") {
                    Selector.setSelectionInCtrl(ctrl.questions);
                }
            }
        // [PRIVATE METHODS : end]

        // [EVENTS]
        $rootScope.$on('questions:refresh', function(event) {
            init();
        });

        $scope.$on("manage:reset-list", function(event){
            reinitSelection();
        });

        // [WATCHERS]
        $scope.$watch(function(){
            return Selector.isEnabled;
        }, function(newVal, oldVal){
            if (!ctrl.authors) {
                needToReinitList = true;
            }
            else {
                reinitSelection();
            }
        });

        $scope.$watch(function(){
            return Selector.itemsAlreadySelectedSize;
        }, function(newVal, oldVal){
            if(newVal != 0){
                if(!ctrl.authors){
                    needToSetList = true;
                }
                else {
                    setSelection();
                }
            }
        });


        // [FILTER / ORDER]
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
