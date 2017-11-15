'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope, Articles) {
        
        var ctrl = this;
        $scope.selectedElementType = "article";
        $scope.selectedElement = {
            status : {
              saved: false,
              printed: false,
              read: false
            },
            title: "Donald Duck and the Golden Rain",
            score: 443,
            conference: "City Of Disneyland",
            date: 2016,
            authors: [
              { 
                id: 4,
                name: "Igor"
              }, 
              { 
                id: 21,
                name: "Griechka"
              }, 
              { 
                id: 211,
                name: "Bernadette Fingus"
              }, 
              { 
                id: 45,
                name: "M. Krieffman"
              }, 
              { 
                id: 21,
                name: "Griechka"
              }, 
              { 
                id: 12,
                name: "Merlin"
              }],
            keywords: ["disney", "duck", "gold"],
            problematic: "What will happened to Donald Duck?",
            solution: "He becames rich",
            abstract: "Donald Duck discover some gold",
            references: [        
            { 
              id: 34,
              title: "Donald Duck in the Forest"
            }, 
            { 
              id: 16,
              title: "Donald Duck is dead"
            }, 
            { 
              id: 9,
              title: "Donald Duck GlobeTrotter"
            }],
            notes: [
              {
                id: 12,
                content: "Ceci est plutot sympatique pour se divertir"
              },
              {
                id: 33,
                content: "Je viens de le relire et c'est toujours excellent"
              },
              {
                id: 87,
                content: "Est-ce qu'ils en ont fait un dessin animé ?"
              }]
          };

        ctrl.showModale;

        (ctrl.init = function() {
            // Will load the data directly from the database
            Articles.getAll().then(function(articles) {
                ctrl.articles = articles;
                console.log(articles);
            });
        })();

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            var promptToUser = prompt("What is the name of your article ?");
            Articles.create({'name': promptToUser}).then(function(element){
                console.log(element);
                ctrl.init();
            });
        }
        
        ctrl.deleteArticle = function() {
            Articles.delete(29).then(function(el){
                ctrl.init();
            });
        }
    });
