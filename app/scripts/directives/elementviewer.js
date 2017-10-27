'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:elementViewer
 * @description
 * # elementViewer
 */
angular.module('wriApp')
  .directive('elementViewer', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the elementViewer directive');
      }
    };
  });
