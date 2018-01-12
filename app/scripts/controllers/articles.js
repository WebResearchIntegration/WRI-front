'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope, Articles, Selector) {
        
        var ctrl = this;

        // [PUBLIC VARIABLES]


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

        // [PRIVATE METHODS: end]

        // [WATCHERS]
        $scope.$watch(function(){
            return Selector.isEnabled;
        }, function(newVal, oldVal){
            if (Selector.getSelectionType() == "articles"){
                Selector.reinitSelection(ctrl.articles); 
            }
        });

        $scope.$watch(function(){
            return Selector.itemsAlreadySelectedSize;
        }, function(newVal, oldVal){
            if (newVal > oldVal && Selector.getSelectionType() == "articles") {
                Selector.setSelectionInCtrl(ctrl.articles);
            }
        });
    });
