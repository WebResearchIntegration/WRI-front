'use strict';

/**
 * previewer Controller
 * @namespace Controllers 
 */
(function() {
    angular
        .module('wriApp') 
        .controller('previewerCtrl', previewerController);

    /**
     * @namespace previewer
     * @desc Controller of the previewers
     * @memberOf Controllers
     */
    function previewerController($scope, localStorageService, Articles, Authors, Notes, Questions) {
      
        var ctrl = this;

        //[PUBLIC VARIABLES]
        ctrl.type;      // type of item loaded in previewer
        
        // [INIT]
        init();

        //[PUBLIC METHODS]
        ctrl.createItem = createItem;
        
        ////////////
    
        // [METHODS : begin]
            /**
             * @name init
             * @desc  Will init the controller with data
             * @param {type} param    precise type in {} and name just after, then explain what it is
             * @return {void}
             * @memberOf Controllers.previewer
             */
            function init(param) {
                ctrl.type = $scope.ngDialogData.type.toLowerCase();
            }
          
            /**
             * @name createItem
             * @desc will create a partial item in database
             * @return {void}
             * @memberOf Controllers.previewer
             */
            function createItem() {
                var sendingElement;
                switch(ctrl.type){
                    case "article":
                        sendingElement = {
                            user: localStorageService.get("user").id,
                            article: {name: $scope.ngDialogData.field}
                        };
                        Articles.create(sendingElement).then(function(articleAdded){
                            $scope.$emit("articles:refresh"); // add a param to ask to set selection ?
                            $scope.$emit("previewer_manage:push-to-selection", articleAdded);
                            $scope.closeThisDialog();
                        });
                        break;

                    case "author":
                        sendingElement = {
                            user: localStorageService.get("user").id,
                            author: {name: $scope.ngDialogData.field}
                        };
                        Authors.create(sendingElement).then(function(authorAdded){
                            $scope.$emit("authors:refresh");
                            $scope.$emit("previewer_manage:push-to-selection", authorAdded);
                            $scope.closeThisDialog();
                        });
                        break;

                    case "note":
                        sendingElement = {
                            user: localStorageService.get("user").id,
                            note: {text: $scope.ngDialogData.field}
                        };
                        Notes.create(sendingElement).then(function(noteAdded){
                            $scope.$emit("previewer_viewer:push-to", noteAdded, "note");
                            $scope.closeThisDialog();
                        });
                        break;

                    default:
                        console.error("no type");
                        break;
                }
            } 
        // [METHODS : end]

        // [PRIVATE FUNCTIONS : begin]
            /**
             * @name privateFunc
             * @desc describe the main goal of the function
             * @param {type} param    precise type in {} and name just after, then explain what it is
             * @returns {void}
             * @memberOf Controllers.previewer
             */
            function privateFunc(param) {
                // Can't be accessible from the view
            }
        // [PRIVATE FUNCTIONS : end]

        // [EVENTS]
          
    }
})();