'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
  .controller('LoginCtrl', function ($location, Auth, UserFactory) {
    var ctrl = this;

    Auth.isAuthenticated().then(function (result) {
      $location.path('/manage');
    }, function (err) {
      console.log('Not connected');
    });

    /**
     * @name handleRequest
     * @desc  Will handle the request actionned by the user
     * @param {String} event that is coming from the form
     * @returns {void}
     * @memberOf Controllers.LoginCtrl
     */
    ctrl.handleRequest = function (event) {
      Auth.signIn(ctrl.email, ctrl.password, function (err, authenticatedUser) {
        if (err) {
          ctrl.notifError = true;
        } else {
          UserFactory.currentUser = authenticatedUser;
          $location.path('/manage');
          ctrl.notifError = false;
        }
      });
    };

  });
