'use strict';

/**
 * @ngdoc service
 * @name wriApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the wriApp.
 */
angular.module('wriApp')
  .factory('UserFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
