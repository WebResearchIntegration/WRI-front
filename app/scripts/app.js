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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
  });
