'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:DatavizCtrl
 * @description
 * # DatavizCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('DatavizCtrl', function ($scope, Articles) {
        var ctrl = this;
        (ctrl.init = function () {
            Articles.getAll().then(function (articles) {
                ctrl.articles = articles;
                $scope.data = { "nodes": articles, "links": [] };
                 /*ctrl.articles.forEach(function(element) {
                    element.group = 1;
                    if(element.references.length >1) {
                        element.references.forEach(function(ref) {
                            console.log(ref, "here")
                            var link = {"source":element._id,"target":ref._id,"value":1};
                            console.log($scope.data.links);
                            console.log('yo')
                            $scope.data.links.push(link);
                        });
                    }
                }); */
            }); 
        })();

        var color = d3.scale.category20();

        $scope.options = {
            chart: {
                type: 'forceDirectedGraph',
                height: nv.utils.windowSize().height - 100,
                width: (function () { return nv.utils.windowSize().width })(),
                margin: { top: 20, right: 20, bottom: 20, left: 20 },
                color: function (d) {
                    return color(d.type)
                },
                nodeExtras: function (node) {
                    node && node
                        .append("text")
                        .attr("dx", 8)
                        .attr("dy", ".35em")
                        .text(function (d) { return d.name })
                        .style('font-size', '10px');
                }
            }
        };

        $scope.delete = function () {
            $scope.data.links = [];
        }

    });
