'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
  .controller('HeaderCtrl', function () {
    var ctrl = this;

    ctrl.isCurrentUserConnected =  function(){
      return false;
     }  
});
