'use strict';

/**
 * @ngdoc service
 * @name wriApp.textToolbar
 * @description
 * # textToolbar
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('textToolbar', function () {

    var service = this;

    // [PRIVATE PROPERTIES]
    var toolbars = {
      miniToolbar :  [
        [ 
          'bold', 'italics', 'underline', 'strikeThrough','separator',
          'undo', 'redo', 'clear'
        ]
      ],
      simpleToolbar :  [
        [ 
          'bold', 'italics', 'underline', 'strikeThrough','separator',
          'ol', 'ul', 'indent', 'outdent', 'separator',
          'undo', 'redo', 'clear'
        ]
      ],
      advancedToolbar : [
        [ 
          'p', 'pre', 'quote', 'separator',
          'bold', 'italics', 'underline', 'strikeThrough','separator',
          'ol', 'ul', 'indent', 'outdent', 'separator', 
          'insertImage','insertLink','separator',
          'undo', 'redo', 'clear'
        ]
      ],
    };

    //[PUBLIC METHODS]
    service.getAdvancedToolbar = getAdvancedToolbar;
    service.getMiniToolbar = getMiniToolbar;
    service.getSimpleToolbar = getSimpleToolbar;

    ///////////////

    // [METHODS : begin]
      /**
       * @name getAdvancedToolbar
       * @desc return the advanced toolbar for text edition. 
       * The advanced toolbar is usually used for textarea like a question, a question's answer.
       * It allow to choose the type of input, give some styles, add lists and insert some media
       * @param {void}
       * @returns {Array} toolbars.advancedToolbar , array of string for textAngular module
       */
      function getAdvancedToolbar(){
        return toolbars.advancedToolbar;
      }

      /**
       * @name getMiniToolbar
       * @desc return the mini toolbar for text edition. 
       * The mini toolbar is usually used for mini edition of a text.
       * It allow to give some styles to the text (bold, underline, italic, strikeThrough)
       * @param {void}
       * @returns {Array}  toolbars.miniToolbar , array of string for textAngular module
       */
      function getMiniToolbar(){
        return toolbars.miniToolbar;
      }
      
      /**
       * @name getSimpleToolbar
       * @desc return the simple toolbar for text edition. 
       * The simple toolbar is usually used for basic edition of a text.
       * It allow to give some styles to the text , and add some lists
       * @param {void}
       * @returns {Array}  toolbars.simpleToolbar , array of string for textAngular module
       */
      function getSimpleToolbar(){
        return toolbars.miniToolbar;
      }
    // [METHODS : end]
    
    // [PRIVATE METHODS : begin]
    // [PRIVATE METHODS : end]

    ///////////////
    
    return service;
  });
