'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:manageCtrl
 * @description
 * # manageCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('manageCtrl', function ($scope) {

        var ctrl = this;

        ctrl.manageTab = {
            'articles' : true,
            'authors' : false,
            'notes' : false,
            'questions' : false
        }    

        ctrl.showCategory = function(category){

            _.forOwn(ctrl.manageTab, function(value, key) {
                ctrl.manageTab[key] = false;
                if(category === key){
                    ctrl.manageTab[key] = true;
                }
            })

        }
    });
    
