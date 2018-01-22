'use strict';

/**
 * @ngdoc service
 * @name wriApp.authors
 * @description
 * # authors
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('Authors', ['Restangular', function (Restangular) {
    var service = this;

    /**
     * Will get all authors from the database
     */
    service.getAll = function () {
      return Restangular.all('authors').getList();
    };

    /** 
     * Will get one author from the database.
     */
    service.getById = function (id) {
      return Restangular.one('authors', id).get();
    };

    /**
     * Will update one author from the database by providing it's id.
     */
    service.updateById = function (id, newAuthor) {
      return service.getById(id).then(function(author) {
        author = newAuthor;
        return author.save();
      });
    };

    /**
     * Will delete one author by providing its id.
     */
    service.delete = function (id) {
      return service.getById(id).then(function(author) {
        author.remove();
    });
    };

    /**
     * Will create a new author inside the database
     */
    service.create = function(author) {
      return Restangular.service('authors').post(author);
    };

    return service;
  }]);
