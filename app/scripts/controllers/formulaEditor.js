'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:formulaEditorCtrl
 * @description
 * # formulaEditorCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('formulaEditorCtrl', function ($scope, $rootScope) {
        
        var ctrl = this;
        ctrl.exampleText = '$\\int x^2dx = 2x + C$ \n'

        $scope.addFormula = function(string){
            var el = angular.element(document.getElementsByClassName('mathjax'))
            var data = {
                'tex' : string,
                'div' : el
            }
            $rootScope.$emit('mathFormula', data);

        }


        
    });
