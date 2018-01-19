'use strict';

/**
 * @ngdoc overview
 * @name wriApp
 * @description
 * # wriApp
 *
 * Main module of the application.
 */
angular
  .module('wriApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ngDialog',
    'textAngular',
    'selectize'
  ])
  .config(function ($routeProvider, RestangularProvider, $provide) {
    $routeProvider
      .when('/manage', {
        templateUrl: 'views/manage.html',
        controller: 'manageCtrl',
        controllerAs: 'manageCtrl' 
      })
      .otherwise({
        redirectTo: '/'
      });

    // [RESTANGuLAR CONFIG: START]
    RestangularProvider.setBaseUrl('http://localhost:8888/api/');

    // [RESTANGuLAR CONFIG: END]
    
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
      taRegisterTool('separator', {
        iconclass: "ta-separator",
        action: null
      });
      taOptions.toolbar = [
        [ 
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'pre', 'quote', 'separator',
          'bold', 'italics', 'underline', 'strikeThrough' ,'separator',
          'justifyLeft', 'justifyCenter', 'justifyRight', 'separator',
          'ul', 'ol', 'indent', 'outdent', 'separator', 
          'insertImage','insertLink', 'insertVideo','separator',
          'html','separator',
          'undo', 'redo', 'clear'
        ]
      ];
      return taOptions;
    }]);
    // // ADD MATH FORMULA BUTTON TO NOTE EDITOR
    // $provide.decorator('taOptions', ['taRegisterTool', '$delegate', 'ngDialog', function(taRegisterTool, taOptions, ngDialog){
    //   taRegisterTool('mathForm', {
    //     iconclass: "fa fa-superscript",
    //     action : function(){
    //       ngDialog.open({
    //           template: '../views/formulaEditor.html',
    //           controller: 'formulaEditorCtrl as formulaEditor'
    //       });
    //     }
    //   });
    //   // add the button to the default toolbar definition
    //   taOptions.toolbar[3].unshift('mathForm');
    //   return taOptions;
    // }]);

    // MathJax.Hub.Config({
    //   tex2jax: {
    //     inlineMath: [['$','$'], ['\\(','\\)']],
    //     processEscapes: true
    //   }
    // });

  });
