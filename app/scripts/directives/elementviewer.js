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

        /**
         * Will toggle the status of the selected element.
         * @param {String} status value that corresponds to the selected status can be 'saved', 'read' or 'printed'
         */
        $scope.toggleStatus = function(status){
          $scope.element.status[status] = !$scope.element.status[status];
          // don't forget to update element with back
        };

        /**
         * Will check if the element is an array.
         * @param {Object} elementToAnalyze the sending object to compare.
         * @return {boolean} true if element is array, false if it's not.
         */
        $scope.isArray = function(elementToAnalyze) {
          return Array.isArray(elementToAnalyze);
        }

        $scope.createNoteFor = function() {
          
        }
        /**
         * Will watch the value to know if the viewer is open.
         */
        $scope.$watch('isViewerOpen', function(old) {
          console.log(old)
        })

        /**
         * Will send a message to parent scoep or rootScope
         * to prevent of a closeViewer
         * @event closeViewer
         */
        $scope.closePanel =  function() {
          $scope.$emit('closeViewer');
        }

        /**
         * Will send a message to parent scope or rootScope
         * to prevent of a enableReferenceModeOn
         * @event enableReferenceModeOn
         */
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
