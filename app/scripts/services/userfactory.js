'use strict';

/**
 * @ngdoc service
 * @name wriApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the wriApp.
 */
angular.module('wriApp')
  .factory('UserFactory', function (localStorageService) {
    var UserFactory = this;

    UserFactory.currentUser = null;

    UserFactory.getCurrentUser = function (callback) {
      var user = localStorageService.get("user");

      if (user) {
        // console.log("Get the user: ", user);
        callback(user);
      } else {
        callback(null);
      }
    }

    return UserFactory;

  });
