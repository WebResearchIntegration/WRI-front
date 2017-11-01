angular.module('wriApp')
    .service('articleService', function ($http, $q) {
        var deffered = $q.defer();

        // $http.get('API').then(function (data) {
        //     deffered.resolve(data);
        // });

        // getArticles = function(){
        //     return deffered.promise;
        // }

    });
