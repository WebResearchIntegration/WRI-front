'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:articleViewer
 * @description
 * # articleViewer
 */
angular.module('wriApp')
  .directive('articleViewer', articleViewerDirective);

function articleViewerDirective() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/article-viewer.html',
    scope: {
      article: '='
    },
    bindToController: true,
    controllerAs: 'articleViewer',
    controller: articleViewerCtrl
  };  
}

function articleViewerCtrl($rootScope, $scope) {

  var ctrl = this;

  // [PUBLIC VARIABLES]
    // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
    ctrl.showAbstract;      // boolean to know if we show abstract or not
    
  // [INIT]
    // ctrl.$onInit = onInit; /* Angular 1.5+ does not bind attributes until calling $onInit() */

  // [PUBLIC METHODS]
    ctrl.isArray = isArray;
    ctrl.turnEditMode = turnEditMode;
  
  ////////////

  // [METHODS : begin]
    /**
     * @name loadArticle
     * @desc Will load article in viewer
     * @param {Object}  article   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function loadArticle(article) {
      console.log(_.isEmpty(article.problematic));
      // if (!_.isEmpty(article.problematic) && !article.solution){
      //   ctrl.showAbstract = true;
      // }
      // else {
      //   ctrl.showAbstract = false;
      // }
    }

    /**
     * @name isArray
     * @desc check if element is an array
     * @param {Object} elementToAnalyze   element to analyze
     * @memberOf Directives.articleViewer
     */
    function isArray(elementToAnalyze) {
      return Array.isArray(elementToAnalyze);
    }

    /**
     * @name turnEditMode
     * @desc Will turn on edit mode for article
     * @memberOf Directives.articleViewer
     */
    function turnEditMode() {
      console.log("edit :" , ctrl.article);
    }

    /**
     * @name sendEnableReferenceEdition
     * @desc Will turn on selector mode for references of the article
     * @memberOf Directives.articleViewer
     */
    $scope.sendEnableReferenceEdition = function() {
      console.log("selection mode on");
      $rootScope.$emit('enableReferenceModeOn');
    };
  // [METHODS : end]

  // [PRIVATE FUNCTIONS : begin]
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
    // $scope.$watch( function(){
    //   return ctrl.article;
    // }, function(newArticle, previousArticle){
    //   if (ctrl.article != null){
    //     loadArticle(ctrl.article);
    //   }
    // }, true);
}