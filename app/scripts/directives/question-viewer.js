'use strict';

  /**
   * @ngdoc directive
   * @name wriApp.directive:questionViewer
   * @description
   * # questionViewer
   */
  angular.module('wriApp')
    .directive('questionViewer', questionViewerDirective);
  
  function questionViewerDirective() {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/question-viewer.html',
      scope: {
        question: '=',
        editMode: '='
      },
      bindToController: true,
      controllerAs: 'questionViewer',
      controller: questionViewerCtrl
    };  
  }
  
  function questionViewerCtrl($rootScope, $scope, Selector, Questions, $timeout) {
  
    var ctrl = this;
  
    var selectedProperty;  // variable for know which property is being updated
    
    // [PUBLIC VARIABLES]
    // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
    ctrl.questionTmp;        // temporary question during edition
    ctrl.showAbstract;      // boolean to know if we show abstract or not
    ctrl.showProbSoluce;    // boolean to know if we show problematic and soluce or not
      
    // [INIT]
      // ctrl.$onInit = loadQuestion; /* Angular 1.5+ does not bind attributes until calling $onInit() */
  
      // [PUBLIC METHODS]
      ctrl.createQuestion = createQuestion;
      ctrl.cancelEdition = cancelEdition;
      ctrl.deleteQuestion = deleteQuestion;
      ctrl.turnEditMode = turnEditMode;
      ctrl.updateQuestion = updateQuestion;
    
    ////////////
  
    // [METHODS : begin]
      /**
       * @name createQuestion
       * @desc Will create a new question
       * @memberOf Directives.questionViewer
       */
      function createQuestion() {
        ctrl.question = ctrl.questionTmp;
        Questions.create(ctrl.question).then(function(questionAdded){
            ctrl.question = questionAdded;
            ctrl.editMode = false;
            $rootScope.$emit("questions:refresh");
        });
      }
  
      /**
       * @name cancelEdition
       * @desc Discard changes on the question edited
       * @memberOf Directives.questionViewer
       */
      function cancelEdition(){
        ctrl.editMode = false;
        ctrl.questionTmp = null;
        $scope.$emit("questions:refresh");
      }
  
      /**
       * @name deleteQuestion
       * @desc Will delete current question
       * @memberOf Directives.questionViewer
       */
      function deleteQuestion() {
        var questionID = ctrl.question.id;
        ctrl.question = null;
        Questions.delete(questionID).then(function(){
            $scope.$emit("questions:refresh");
        });
      }
  
      /**
       * @name loadQuestion
       * @desc Will load question in viewer
       * @param {Object}  question   question to load in question viewer
       * @memberOf Directives.questionViewer
       */
      function loadQuestion(question) {
        ctrl.questionTmp = null;
        ctrl.questionTmp = angular.copy(ctrl.question);
      }
      
      /**
       * @name turnEditMode
       * @desc Will turn on edit mode for question
       * @memberOf Directives.questionViewer
       */
      function turnEditMode() {
        ctrl.editMode = true;
        ctrl.questionTmp = angular.copy(ctrl.question);
      } 
    // [METHODS : end]
  
    // [PRIVATE FUNCTIONS : begin]
  
      /**
       * @name updateQuestion
       * @desc Will update current question
       * @param {Object}  property   property to transform into an array
       * @param {Boolean}  onlyObject   check if the current property has to be an object
       * @memberOf Directives.questionViewer
       */
      function updateQuestion() {
        ctrl.question = ctrl.questionTmp;
        Questions.updateById(ctrl.question.id, ctrl.question).then(function(questionUpdated){
            ctrl.editMode = false;
            console.log(questionUpdated);
            loadQuestion(questionUpdated);
            $scope.$emit("questions:refresh");
        });
      }
    // [PRIVATE FUNCTIONS : end]
  
    // [EVENTS]
      $scope.$watch( function(){
        return ctrl.question;
      }, function(newQuestion, previousQuestion){
        if (ctrl.question != null){
          loadQuestion(ctrl.question);
        }
      });
  }
