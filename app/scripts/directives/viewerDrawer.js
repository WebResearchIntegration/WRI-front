'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:viewerDrawer
 * @description
 * # viewerDrawer
 */
angular.module('wriApp')
.directive('viewerDrawer', viewerDrawerDirective);

function viewerDrawerDirective() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/viewer-drawer.html',
        scope: {
            type: '=',
            element: '=',
            editMode:"=",
            closed: '='
        },
        bindToController: true,
        controllerAs: 'viewerDrawer',
        controller: viewerDrawerCtrl
    };
}

function viewerDrawerCtrl($scope, $compile){

    var ctrl = this;

    // [PRIVATE VARIABLES]

    // [PUBLIC VARIABLES]

    // [INIT]
        ctrl.$onInit = init;

    // [PUBLIC METHODS]        
        ctrl.closePanel = closePanel;

    ///////////////

    // [METHODS : begin]
        /**
         * @name onInit
         * @desc Will init drawer
         * @memberOf Directives.viewerDrawer
         */
        function init(){
            if (ctrl.type){
                ctrl.type = ctrl.type.toLowerCase();
            }
        }

        /**
         * @name closePanel
         * @desc Will send a message to parent scope to prevent of a closeViewer
         * @event manage:closeViewer
         */
        function closePanel() {
            $scope.$emit('viewer:closing');
        }
    // [METHODS : end]

    // [PRIVATE METHODS : begin]
    // [PRIVATE METHODS : end]

    // [EVENT]
        $scope.$watch(function(){
            return ctrl.type;
        }, function(newVal, oldVal) {
            console.log("type for viewer :", ctrl.type);
        });
}