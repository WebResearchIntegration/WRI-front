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

        };

        /**
         * 
         */
        service.updateById = function(id) {

        }

        /**
         * 
         */
        service.delete = function(id) {

        }

        return service;
    }]);
