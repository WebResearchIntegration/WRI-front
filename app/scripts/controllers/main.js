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
      date: Date.now(),
      authors_ids: [4, 21, 18],
      keywords: ["#disney", "#duck", "#gold"],
      abstract: "Donald Duck discover some gold",
      description: "Donald Duck was relaxing when a golden meteor dropped off in his garden ...",
      references_ids: [],
      notes_ids: [12, 34, 56]
    };

    $scope.selectedElementType = "article";
  }]);
