'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:authorsCtrl
 * @description
 * # authorsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('authorsCtrl', function ($rootScope, $scope, Authors, Selector) {
        
        var ctrl = this;

        // [PRIVATE VARIABLES]
        var needToReinitList;
        var needToSetList;
        
        // [PUBLIC VARIABLES]
        ctrl.authors;

        // [INIT]
        init();

        // [PUBLIC METHODS]
        ctrl.addAuthor = addAuthor;

        ///////////////////

        // [METHODS: begin]
            /**
             * @name init
             * @desc will load data directly from database
             * @return {void} 
             */
            function init() {
                Authors.getAll().then(function(authors) {
                    ctrl.authors = authors;

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
             * @name addAuthor
             * @desc Send event to create a new author in viewer
             * @return {void} 
             */
            function addAuthor() {
                var newAuthor = {
                    name : "",
                    birthDate : "",
                    gender : "M",
                    rating : "",
                    photoUrl : "",
                    email : "",
                    linkedIn : "",
                    description : "",
                    articles : []
                };
                $scope.$emit('authors:new', newAuthor);
            }
        // [METHODS: end]
        
        // [PRIVATE METHODS: begin]
            /**
             * @name reinitSelection()
             * @desc will unselect all authors
             */
            function reinitSelection() {
                if (Selector.getSelectionType() == "authors"){
                    Selector.reinitSelection(ctrl.authors); 
                }
            }

            /**
             * @name setSelection()
             * @desc will select all authors already present in the item which is being edited
             */
            function setSelection() {
                if (Selector.getSelectionType() == "authors") {
                    Selector.setSelectionInCtrl(ctrl.authors);
                }
            }

        // [PRIVATE METHODS: end]


        // [EVENTS]
        $rootScope.$on("authors:refresh", function(event){
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
                $scope.filter = {};  
                $scope.order = 'id';
            } else {
                $scope.filter = data;
            }
        });

        $rootScope.$on('sendOrderBy', function(event, data) {
            $scope.order = data;
        });

    });
