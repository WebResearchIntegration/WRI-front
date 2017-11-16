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
      restrict: 'E',
      templateUrl: '/views/directives/element-viewer/element-viewer.html',
      scope: {
        type: '@',
        element: '=',
        isViewerOpen:'='
      },
      controller: function($scope, Articles) {
        // [PARAMETERS]
        var types = ["article", "author"];

        // [PUBLIC METHODS]
        $scope.availableType = function(elementType){
          for (var i = 0; i < types.length; i++){
            if (elementType.toLowerCase() == types[i].toLowerCase()){
              return true;
            }
          }
          return false;
        };

        $scope.toggleStatus = function(status){
          $scope.element.status[status] = !$scope.element.status[status];
          // don't forget to update element with back
        };

        $scope.isArray = function(elementToAnalyze) {
          return Array.isArray(elementToAnalyze);
        }

        $scope.$watch('isViewerOpen', function(old) {
          console.log(old)
        })

        $scope.closePanel =  function() {
          $scope.$emit('closeViewer');
        }

        $scope.sendEnableReferenceEdition = function() {
          $scope.$emit('enableReferenceModeOn');
        }

      },
      link: function(scope, element, attrs) {
        // Code to write

        // Watcher on scope.element
      }
    };
  });
