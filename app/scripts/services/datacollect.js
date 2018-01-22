'use strict';

/**
 * ControllerName Factory
 * @namespace Factories 
 */
(function() {
  angular
      .module('wriApp') 
      .controller('DataCollect', DataCollectFactory);

  /**
   * @namespace DataCollect
   * @desc Factory to allow to collect between data in Front
   * @memberOf Factories
   */
  function DataCollectFactory() {
      
      var factory = this;

      //[PRIVATE VARIABLES]
      var privateVar;
      
      //[PUBLIC VARIABLES]
      factory.publicVar;
      
      // [INIT]
      init();

      //[PUBLIC METHODS]
      factory.publicFunc = publicFunc;
    
      ////////////
    
      // [METHODS : begin]
        /**
         * @name init
         * @desc  Will init the controller with data
         * @param {type} param    precise type in {} and name just after, then explain what it is
         * @returns {void}
         * @memberOf Factories.DataCollect
         */
        function init(param) {
            // init function of the controller
        }
          
        /**
         * @name publicFunc
         * @desc describe the main goal of the function
         * @param {type} param    precise type in {} and name just after, then explain what it is
         * @returns {void}
         * @memberOf Factories.DataCollect
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
           * @memberOf Factories.DataCollect
           */
          function privateFunc(param) {
              // Can't be accessible from the view
          }
      // [PRIVATE FUNCTIONS : end]

      ////////////

      return factory;
  }
})();