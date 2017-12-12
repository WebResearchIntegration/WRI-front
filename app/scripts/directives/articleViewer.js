'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:articleViewer
 * @description
 * # articleViewer
 */
angular.module('wriApp')
  .directive('articleViewer', function () {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/article-viewer.html',
      scope: {
        article: '='
      },
      controller: function($scope, Articles) {
        // Code to write
      },
      link: function(scope, element, attrs) {
        // Code to write

        // Watcher on scope.element
      }
    };
  });
