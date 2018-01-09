'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:authorsCtrl
 * @description
 * # authorsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('authorsCtrl', function ($scope, Authors) {
        
        var ctrl = this;

        ctrl.authors = [];

        (ctrl.init = function() {
            // Will load the data directly from the database
            Authors.getAll().then(function(authors) {
                ctrl.authors = authors;
                console.log(authors);
            });
        })();
    });
