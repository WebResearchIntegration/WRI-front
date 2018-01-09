'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:questionsCtrl
 * @description
 * # questionsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('questionsCtrl', function ($scope, Questions) {
        
        var ctrl = this;

        ctrl.questions = [];

        (ctrl.init = function() {
            Questions.getAll().then(function(questions) {
                ctrl.questions = questions;
            });
        })();
    });
