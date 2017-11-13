'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope, Restangular) {
        
        var ctrl = this;
        ctrl.showModale;
        Restangular.all('article').getList().then(function(articles) {
            console.log(articles);
            ctrl.articles = articles;
        });
        

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            ctrl.articles.push({'name' : 'null'})
            console.log(ctrl.articles );
        }

    });
