angular.module('wriApp')
    .service('articleService', [ 'Restangular', function (Restangular) {
        var service = this;

        /**
         * 
         */
        service.getAll = function() {
            return Restangular.all('article').getList();
        };

        /**
         * 
         */
        service.getById =  function(id) {
            return Restangular.one('article', id).get();
        };

        /**
         * 
         */
        service.updateById = function(id, newArticle) {
            return service.getById(id).then(function(article) {
                article = newArticle;
                article.save();
            });
        }

        /**
         * 
        */
        service.create = function (article) {
            return Restangular.all('article').post('article', article);
        }

        /**
         * 
         */
        service.delete = function(id) {

        }

        return service;
    }]);
