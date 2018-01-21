'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
  .controller('LoginCtrl', function (Auth) {
    var ctrl = this;

    /**
     * @name handleRequest
     * @desc  Will handle the request actionned by the user
     * @param {String} event that is coming from the form
     * @returns {void}
     * @memberOf Controllers.LoginCtrl
     */
    ctrl.handleRequest = function (event) {
      console.log(event);
      Auth.signIn(ctrl.email, ctrl.password, function (err, authenticatedUser) {
        if (err) {
          console.log('Voici', err);
          console.log(ctrl.notifError);
          ctrl.notifError = true;
        } else {
          console.log(authenticatedUser);
          UserFactory.currentUser = authenticatedUser;
          $location.path('/manage');
          ctrl.notifError = false;
        }
      });
    };

  });
