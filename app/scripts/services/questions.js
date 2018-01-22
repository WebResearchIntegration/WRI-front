'use strict';

/**
 * @ngdoc service
 * @name wriApp.questions
 * @description
 * # questions
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('Questions', ['Restangular', function (Restangular) {
    var service = this;

    /**
     * 
     */
    service.getAll = function () {
      return Restangular.all('questions').getList();
    };

    /**
     * 
     */
    service.getById = function (id) {
      return Restangular.one('questions', id).get();
    };

    /**
     * 
     */
    service.updateById = function (id, newQuestion) {
      return service.getById(id).then(function (question) {
        question = newQuestion;
        question.id = newQuestion._id;
        return question.save();
      });
    };

    /**
    * Will create an article inside the database.
    * 
    */
    service.create = function (question) {
      // ADD OBJECT CONTROL
      return Restangular.service('questions').post(question);
    };

    /**
     * 
     */
    service.delete = function (id) {
      return service.getById(id).then(function(question) {
        question.id = id;
        question.remove();
      });
    };
    return service;
  }]);
