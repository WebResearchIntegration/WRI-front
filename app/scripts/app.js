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
      $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
        taRegisterTool('mathForm', {
          iconclass: "fa fa-superscript",
        });
        // add the button to the default toolbar definition
        taOptions.toolbar[3].unshift('mathForm');
        return taOptions;
      }]);


  });
