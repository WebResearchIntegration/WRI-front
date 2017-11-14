'use strict';

/**
 * @ngdoc service
 * @name wriApp.notes
 * @description
 * # notes
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('notesService', function () {
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
