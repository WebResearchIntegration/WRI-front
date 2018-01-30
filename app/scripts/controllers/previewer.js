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
  function previewerController() {
      
      var ctrl = this;

      //[PUBLIC VARIABLES]
      
      
      // [INIT]
      init();

      //[PUBLIC METHODS]
      ctrl.publicFunc = publicFunc;
    
      ////////////
    
      // [METHODS : begin]
        /**
         * @name init
         * @desc  Will init the controller with data
         * @param {type} param    precise type in {} and name just after, then explain what it is
         * @returns {void}
         * @memberOf Controllers.previewer
         */
        function init(param) {
            // init function of the controller
        }
          
        /**
         * @name publicFunc
         * @desc describe the main goal of the function
         * @param {type} param    precise type in {} and name just after, then explain what it is
         * @returns {void}
         * @memberOf Controllers.previewer
         */
        function publicFunc(param) {
          // Can be accessible from the view
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