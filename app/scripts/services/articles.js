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
            
        }
        
        /**
         * 
        */
        service.create = function (article) {
            
        }

        /**
         * 
         */
        service.delete = function(id) {

        }

        return service;
    }]);
