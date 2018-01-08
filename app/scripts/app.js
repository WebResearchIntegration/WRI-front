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
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/manage', {
        templateUrl: 'views/manage.html',
        controller: 'manageCtrl',
        controllerAs: 'manage' 
      })
      .otherwise({
        redirectTo: '/'
      });

      // [RESTANGuLAR CONFIG: START]
      RestangularProvider.setBaseUrl('http://localhost:8888/api/');

      // [RESTANGuLAR CONFIG: END]
  });
