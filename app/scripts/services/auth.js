'use strict';

/**
 * @ngdoc service
 * @name wriApp.Auth
 * @description
 * # Auth
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('Auth', function (Restangular, $http, $q, localStorageService, UserFactory) {
    var authService = this;
            
    // [SERVICE METHODS]
    /**
     * Method that will log a user by mail and return the connected user by callback.
     * Besides, will initiate the current User of the application to allow navigation inside the project.
     * @param {String} email passed email to be authentificated with.
     * @param {String} pass passed password not hashed yet.
     * @param {Function} callback handle an error or return the authenticated user.
     */
    authService.signIn = function(email, pass, callback) {
        if(email == "" || pass == "") {
            var unvalidParam = new Error("Empty email or password provided");
            if(callback) callback(unvalidParam, null);
        } else {
            Restangular.service('auth/connect').post({email: email, password:pass}).then(function(result) {
                if(!result) {
                    var err = new Error('Failed to authenticate');
                    callback(err, null);
                } else {
                    $http.defaults.headers.common['Authorization'] = "Bearer " + result.token;
                    localStorageService.set("token", "Bearer " + result.token);
                    localStorageService.set("user", result.user);
                    callback(null, result);
                }
            }, function(err) {
                var err = new Error('Failed to authenticate');
                callback(err, null);
            });
        }
    }

    /**
     * Will check if the user is logged in and authenticated
     * @param {NoParam}
     * @return {Boolean || Async} send true or rejected value
     */
    authService.isAuthenticated = function() {
        if(localStorageService.get("token") && localStorageService.get("user")) {
            return $q.resolve(true);
        } else {
            return $q.reject('Not Authenticated');
        }
    }

    /**
     * Method that will log out the current user by deleting all token informations
     * in localStorage and inside self service.
     * @param {Function} callback will handle an error or retrieve a boolean value to know if current user is disconnected.
     */
    authService.logOut = function(callback) {
        UserFactory.currentUser = null;
        localStorageService.remove("token", "user");
        callback();
    }
    // [END SERVICE METHODS]

    // [PRIVATE METHODS]

    // [END PRIVATE METHODS]
    return authService;
  });
