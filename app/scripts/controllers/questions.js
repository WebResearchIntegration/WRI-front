'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:questionsCtrl
 * @description
 * # questionsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('questionsCtrl', function ($scope, Questions, $rootScope) {
        
        var ctrl = this;

        $scope.questionEdit = {};

        init()

        ctrl.newQuestion = function(){
            var targetId = _.maxBy(ctrl.questions, 'id')
            var id = targetId.id + 1;

            var obj = {
                'id' : id,
                'problematic':  '',
                'answer' : ''
            }

            ctrl.questions.unshift(obj);
            $scope.questionEdit.id = obj.id
            $scope.questionEdit.problematic = obj.problematic;
            $scope.questionEdit.answer = obj.answer;

        }

        ctrl.saveQuestion = function(question){
            var obj = {};

            var isDuplicate = _.find(ctrl.questions, ['id', question.id]);

            obj.problematic = question.problematic;
            obj.answer = question.answer;
            if (isDuplicate != undefined){
                isDuplicate.problematic = obj.problematic;
                isDuplicate.answer = obj.answer;
            }
        }

        ctrl.editQuestion = function(question){
            var obj = {
                'id': question.id,
                'problematic': question.problematic,
                'answer': question.answer
            };

            console.log('obj ', obj );
            $scope.questionEdit.id = obj.id;
            $scope.questionEdit.problematic = obj.problematic;
            $scope.questionEdit.answer = obj.answer;

        }

        function initList(){
            Questions.getAll().then(function(questions) {
                ctrl.questions = questions;
            });
        }

        function init(){
            initList()
        }

        // [EVENTS]
        $rootScope.$on('sendFilters', function(event, data) {
            if(data === 'reset'){
                $scope.filter = {}    
                $scope.order = {};
            } else {
                $scope.filter = data;
            }
        });

        $rootScope.$on('sendOrderBy', function(event, data) {
            $scope.order = data;
        });
    });
