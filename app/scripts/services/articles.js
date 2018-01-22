'use strict';

angular.module('wriApp')
    .service('Articles', [ 'Restangular', function (Restangular) {
        var service = this;

        /**
         * Will get all articles from the database.
         * @param NoParam
         */
        service.getAll = function() {
            return Restangular.all('articles').getList();
        };

        /**
         * Will get an article by it's id.
         * This method is async so you'll be able to use the then() method.
         */
        service.getById =  function(id) {
            return Restangular.one('articles', id).get();
        };

        /**
         * Will update one article by ID.
         * This method is async you'll be able to use the then( method on it.)
         */
        service.updateById = function(id, newArticle) {
            return service.getById(id).then(function(article) {
                article = newArticle;
                article.id = newArticle._id;
                return article.save();
            });
        };

        /**
         * Will create an article inside the database.
         * 
        */
        service.create = function (article) {
            // ADD OBJECT CONTROL
            return Restangular.service('articles').post(article);
        };

        /**
         * Will delete an article by the giving id.
         */
        service.delete = function(id) {
            return service.getById(id).then(function(article) {
                article.id = id;
                article.remove();
            });
        };

        return service;
    }]);
