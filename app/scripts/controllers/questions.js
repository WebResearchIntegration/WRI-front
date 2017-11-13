'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:questionsCtrl
 * @description
 * # questionsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('questionsCtrl', function ($scope) {
        
        var ctrl = this;

        ctrl.questions = [
            {
                'name' : 'Question X'
            },
            {
                'name' : 'Question X'
            },
            {
                'name' : 'Question X'
            },
            {
                'name' : 'Question X'
            },
            {
                'name' : 'Question X'
            },
            {
                'name' : 'Question X'
            },
            
        ];
    });
