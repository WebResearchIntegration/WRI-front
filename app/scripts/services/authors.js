'use strict';

/**
 * @ngdoc service
 * @name wriApp.authors
 * @description
 * # authors
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('authorsService', function () {
    var service = this;

    /**
     * 
     */
    service.getAll = function () {
      return Restangular.all('article').getList();
    };

    /**
     * 
     */
    service.getById = function (id) {

    };

    /**
     * 
     */
    service.updateById = function (id) {

    }

    /**
     * 
     */
    service.delete = function (id) {

    }
    
    return service;
  });
