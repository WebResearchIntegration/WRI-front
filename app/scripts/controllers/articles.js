'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($rootScope, $scope, $q, Articles, Selector) {
        
        var ctrl = this;

        var needToReinitList;
        var needToSetList;

        // [PUBLIC VARIABLES]
        ctrl.articles;

        // [INIT]
        init();

        // [PUBLIC METHODS]
        ctrl.addArticle = addArticle;

        ///////////////////

        // [METHODS: begin]
            /**
             * @name init
             * @desc will load data directly from database
             * @return {void} 
             */
            function init() {
                Articles.getAll().then(function(articles) {
                    ctrl.articles = articles;
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
             * @name addArticle
             * @desc Send event to create a new article in viewer
             * @return {void} 
             */
            function addArticle() {
                var newArticle = {
                    name : "",
                    conference : "",
                    writtenDate : null,
                    publishedDate : null,
                    score : null,
                    isSaved : false,
                    isRead : false,
                    isPrinted : false,
                    problematic : "",
                    solution : "",
                    abstract : "",
                    authors : [],
                    keywords : [],
                    references : [],
                    notes : [],
                    link : ''
                };
                $scope.$emit('articles:new', newArticle);
            }
        // [METHODS: end]
        
        // [PRIVATE METHODS: begin]
            /**
             * @name reinitSelection()
             * @desc will unselect all articles
             */
            function reinitSelection() {
                if (Selector.getSelectionType() == "articles"){
                    Selector.reinitSelection(ctrl.articles);
                }
            }

            /**
             * @name setSelection()
             * @desc will select all articles already present in the item which is being edited
             */
            function setSelection() {
                if (Selector.getSelectionType() == "articles") {
                    Selector.setSelectionInCtrl(ctrl.articles);
                }
            }
        // [PRIVATE METHODS: end]


        // [EVENTS]
        $rootScope.$on("articles:refresh", function(event){
            init();
        });

        $scope.$on("manage:reset-list", function(event){
            reinitSelection();
        });

        // [WATCHERS]
        $scope.$watch(function(){
            return Selector.isEnabled;
        }, function(){
            if (!ctrl.articles) {
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
                if(!ctrl.articles){
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
                $scope.order = {};
            } else {
                $scope.filter = data;
            }
        });

        $rootScope.$on('sendOrderBy', function(event, data) {
            $scope.order = data;
        });


    });
