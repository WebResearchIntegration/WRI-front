'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:elementViewer
 * @description
 * # elementViewer
 */
angular.module('wriApp')
  .directive('elementFilter', function () {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/element-filter/element-filter.html',
        scope: {
            type: '@',
            element: '='
        },
        controller: function($scope, Articles) {
        
            // [PARAMETERS]
            var types = ["article", "author", "note", "question"];
            $scope.orderValue = {};
            $scope.orderBy = [
                {"name" : "Name"},
            ];

            // GET RID OF DEFAULT OPTION FOR THE SELECT 
            // AND SET THE DEFAULT VALUE 
            $scope.orderValue.config = $scope.orderBy[0];

            $scope.searchArticle = {};

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
             * Will send a message to parent scope or rootScope
             * to filter the list
             * @event sendFilters
             */
            $scope.sendFilters = function(filter) {
                $scope.$emit('sendFilters', filter);
            }

            /**
             * Will send a message to parent scope or rootScope
             * to reset all of the list (without filter) 
             * @event resetFilters
             */
            $scope.resetFiltersAndOrder = function() {
                $scope.searchArticle = {};
                $scope.orderValue.config = $scope.orderBy[0];
                $scope.$emit('sendFilters', 'reset');
            }

            /**
             * Will send a message to parent scope or rootScope
             * to order the list  
             * @event sendOrderBy
             */
            $scope.sendOrderBy = function(order) {
                order = _.lowerCase(order);
                if(order === 'score'){
                    order = '-score';
                }
                $scope.$emit('sendOrderBy', order);
            }

        },

        link: function(scope, element, attrs) {
        }
    };
});
