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
    'textAngular'
  ])
  .config(function ($routeProvider, RestangularProvider, $provide) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/manage.html',
        controller: 'manageCtrl',
        controllerAs: 'manage' 
      })
      .when('/manage/articles', {
        templateUrl: 'views/articles.html',
        controller: 'articlesCtrl',
        controllerAs: 'articles' 
      })
      .otherwise({
        redirectTo: '/'
      });

    // [RESTANGuLAR CONFIG: START]
    RestangularProvider.setBaseUrl('http://localhost:8888/api/');

    // [RESTANGuLAR CONFIG: END]

    // ADD MATH FORMULA BUTTON TO NOTE EDITOR
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
