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
        Restangular.one('article').get().then(function(articles) {
            ctrl.articles = articles.articles;
        });
        

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            ctrl.articles.push({'name' : 'null'})
            console.log(ctrl.articles );
        }

    });
