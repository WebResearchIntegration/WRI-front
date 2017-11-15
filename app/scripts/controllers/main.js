'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

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
      references_ids: [        { 
        id: 34,
        name: "Donald Duck in the Forest"
      }, 
      { 
        id: 16,
        name: "Donald Duck is dead"
      }, 
      { 
        id: 9,
        name: "Donald Duck GlobeTrotter"
      }],
      notes_ids: [12, 34, 56]
    };

    $scope.selectedElementType = "article";
  }]);
