'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope) {
        
        var ctrl = this;
        ctrl.showModale;

        ctrl.articles = [
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            },
            {
                'name' : 'Article X'
            }
            
        ];

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            ctrl.articles.push({'name' : 'null'})
            console.log(ctrl.articles );
        }

    });
