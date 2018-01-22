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
    'selectize',
    'LocalStorageModule',
    'angular-loading-bar',
    'nvd3'
  ])
  .config(function ($routeProvider, RestangularProvider, $provide, localStorageServiceProvider) {
    $routeProvider
      .when('/manage', {
        templateUrl: 'views/manage.html',
        controller: 'manageCtrl',
        controllerAs: 'manageCtrl',
        resolve: {
          access: ["Auth", function(Auth) {return Auth.isAuthenticated()}]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/dataviz', {
        templateUrl: 'views/dataviz.html',
        controller: 'DatavizCtrl',
        controllerAs: 'dataviz'
      })
      .otherwise({
        redirectTo: '/'
      });

    // [LOCALSTORAGECONFIG]
    localStorageServiceProvider.setStorageType('localStorage');
    // [LOCALSTORAGECONFIG: END]


    // [RESTANGuLAR CONFIG: START]
    RestangularProvider.setBaseUrl('https://api-wri.herokuapp.com/api/'); // FOR PROD: https://api-wri.herokuapp.com/api/
    // FOR LOCAL: http://localhost:3000/api/
    
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

  }).run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
      if (rejection === 'Not Authenticated') {
        console.log(">>> USER NOT AUTHENTICATED");
        $location.path('/login');
      }
    });
  }).run(function ($http, localStorageService, $location) {
    console.log('here');
    if(localStorageService.get("token")) {
      console.log(localStorageService.get("token"))
      var token = localStorageService.get("token");
      $http.defaults.headers.common['Authorization'] = token;
    } else {
      $location.path('/login');
    }
  });
