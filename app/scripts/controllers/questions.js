'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:questionsCtrl
 * @description
 * # questionsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('questionsCtrl', function ($scope, Questions) {
        
        var ctrl = this;

        $scope.questions = [
            {
                'id' : 1,
                'problematic':  '',
                'answer' : '',
            }
        ];

        $scope.selectedElementType = "question"

        init()

        ctrl.newQuestion = function(){
            var targetId = _.maxBy($scope.questions, 'id')
            var id = targetId.id + 1;

            var obj = {
                'id' : id,
                'problematic':  '',
                'answer' : ''
            }

            $scope.questions.unshift(obj);
            $scope.questionEdit.id = obj.id
            $scope.questionEdit.problematic = obj.problematic;
            $scope.questionEdit.answer = obj.answer;

        }

        ctrl.saveQuestion = function(question){
            var obj = {};

            var isDuplicate = _.find($scope.questions, ['id', question.id])

            obj.problematic = question.problematic
            obj.answer = question.answer
            isDuplicate.problematic = obj.problematic
            isDuplicate.answer = obj.answer
        }

        ctrl.editQuestion = function(question){
            var obj = {
                'id': question.id,
                'problematic': question.problematic,
                'answer': question.answer
            }

            console.log('obj ', obj );
            $scope.questionEdit.id = obj.id;
            $scope.questionEdit.problematic = obj.problematic;
            $scope.questionEdit.answer = obj.answer;

        }

        function initList(){
            $scope.questionEdit = {
                'id' : 1,
                'problematic': '',
                'answer': ''
            }
        }

        function init(){
            initList()
        }

        // (ctrl.init = function() {
        //     Questions.getAll().then(function(questions) {
        //         ctrl.questions = questions;
        //     });
        // })();
    });
