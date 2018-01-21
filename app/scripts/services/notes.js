'use strict';

/**
 * @ngdoc service
 * @name wriApp.notes
 * @description
 * # notes
 * Service in the wriApp.
 */
angular.module('wriApp')
  .service('Notes', ['Restangular', function  (Restangular) {
    var service = this;

    /**
     * 
     */
    service.getAll = function () {
      return Restangular.all('note').getList();
    };

    /**
     * 
     */
    service.getById = function (id) {
      return Restangular.one('note', id).get();
    };

    /**
     * 
     * @param {*} note 
     */
    service.create = function (note) {
      // ADD OBJECT CONTROL
      return Restangular.service('note').post(note);
    }

    /**
     * 
     */
    service.updateById = function (id, newNote) {
      return service.getById(id).then(function (note) {
        note = newNote;
        note.save();
      });
    }


    /**
     * 
     */
    service.delete = function (id) {
      return service.getById(id).then(function(note) {
              note.remove();
          });
    }

    return service;
  }]);
