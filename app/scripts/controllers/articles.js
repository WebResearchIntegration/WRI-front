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
            });
        })();

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            ctrl.articles.push({'name' : 'null'});
            console.log(ctrl.articles);
        }

        
    });
