'use strict';

/**
 * @ngdoc service
 * @name wriApp.questions
 * @description
 * # questions
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('questionsService', function () {
    var service = this;

    /**
     * 
     */
    service.getAll = function () {
      return Restangular.all('question').getList();
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
