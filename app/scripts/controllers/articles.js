'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope, articleService) {
        
        var ctrl = this;
        ctrl.showModale;

        (ctrl.init = function() {
            // Will load the data directly from the database
            articleService.getAll().then(function(articles) {
                ctrl.articles = articles;
                console.log(articles);
            });
        })();

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            var promptToUser = prompt("What is the name of your article ?");
            articleService.create({'name': promptToUser}).then(function(element){
                console.log(element);
                ctrl.init();
            });
        }
        
    });
