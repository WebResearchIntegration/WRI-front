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
      article: '=',
      editMode: '='
    },
    bindToController: true,
    controllerAs: 'articleViewer',
    controller: articleViewerCtrl
  };  
}

function articleViewerCtrl($scope, Selector, Articles) {

  var ctrl = this;

  var selectedProperty;  // variable for know which property is being updated
  
  // [PUBLIC VARIABLES]
    // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
    ctrl.showAbstract;      // boolean to know if we show abstract or not
    ctrl.showProbSoluce;    // boolean to know if we show problematic and soluce or not
    
  // [INIT]
    // ctrl.$onInit = onInit; /* Angular 1.5+ does not bind attributes until calling $onInit() */

    // [PUBLIC METHODS]
    ctrl.applyKeywordFilter = applyKeywordFilter;
    ctrl.createNoteFor = createNoteFor;
    ctrl.loadArticle = loadArticle;
    ctrl.openReference = openReference;
    ctrl.selectReferences = selectReferences;
    ctrl.toggleAbstract = toggleAbstract;
    ctrl.turnEditMode = turnEditMode;
  
  ////////////

  // [METHODS : begin]
    /**
     * @name applyKeywordFilter
     * @desc Will load article in viewer
     * @param {String}  keyword   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function applyKeywordFilter(keyword){
      console.log("apply filter keywords on articles : ", keyword);
    }

    /**
     * @name createNoteFor
     * @desc Will load notes view and note editor. It will bind the new note with current article
     * @memberOf Directives.articleViewer
     */
    function createNoteFor(){
      console.log("add a note for article #", ctrl.article.id);
    }

    /**
     * @name loadArticle
     * @desc Will load article in viewer
     * @param {Object}  article   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function loadArticle(article) {
      
      // Main informations
      if(!_.isEmpty(article.problematic) && !_.isEmpty(article.problematic)){
        ctrl.showProbSoluce = true;
        ctrl.showAbstract = false;
      }
      else {
        ctrl.showProbSoluce = false;
        ctrl.showAbstract = true;
      }
      
      // Authors
      if(!_.isArray(ctrl.article.authors)){
        transformIntoArr("authors", true);
      }
      
      // References
      if(!_.isArray(ctrl.article.references)){
        transformIntoArr("references", true);
      }

      // Notes 
      if(!_.isArray(ctrl.article.notes)){
        transformIntoArr("notes", true);
      }
    }
    
    /**
     * @name openReference
     * @desc Will load the reference in the second viewer in readonly mode
     * @param {Object}  article   article to load in second viewer
     * @memberOf Directives.articleViewer
     */
    function openReference(article) {
      $scope.$emit("reference:open",article);
    }
    
    /**
     * @name toggleAbstract
     * @desc Will toggle abstract in the viewer
     * @memberOf Directives.articleViewer
     */
    function toggleAbstract() {
      ctrl.showAbstract = !ctrl.showAbstract;
    }
    
    /**
     * @name turnEditMode
     * @desc Will turn on edit mode for article
     * @memberOf Directives.articleViewer
     */
    function turnEditMode() {
      ctrl.editMode = true;
    }
    

    /**
     * @name selectReferences
     * @desc Will turn on selector mode for references of the article
     * @memberOf Directives.articleViewer
     */
    function selectReferences() {
      selectedProperty = "references";
      $scope.$emit('select:articles', ctrl.article);
      Selector.loadSelection(ctrl.article.references);
    }
  // [METHODS : end]

  // [PRIVATE FUNCTIONS : begin]
    /**
     * @name insertDataInto
     * @desc Will update article property passed as param into an array
     * @param {Object}  property   property to transform into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.articleViewer
     */
    function insertDataInto() {
      var itemsSelected = Selector.getSelection();
      if(_.isArray(ctrl.article[selectedProperty])){
        ctrl.article[selectedProperty] = itemsSelected;
      }
      Selector.disable();
    }

    /**
     * @name transformIntoArr
     * @desc Will update article property passed as param into an array
     * @param {Object}  property   property to transform into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.articleViewer
     */
    function transformIntoArr(property, onlyObject) {
      onlyObject = onlyObject || false;
      var returnArr = [];
      if (!_.isEmpty(ctrl.article[property])){
        if (onlyObject && _.isObject(ctrl.article[property])){
          returnArr.push(ctrl.article[property]);
        }
        else if (!onlyObject){
          returnArr.push(ctrl.article[property]);
        }
      }
      ctrl.article[property] = returnArr;
    }

      //       /**
      //    * Will delete an article by giving the right id.
      //    * @param {Number} id the correponsding of the database.
      //    */
      //   ctrl.deleteArticle = function(id) {
      //     Articles.delete(29).then(function(el){
      //         ctrl.init();
      //     });
      // }

      // Articles.create({'name': promptToUser}).then(function(element){
      //     console.log(element);
      //     ctrl.init();
      // });
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
    $scope.$watch( function(){
      return ctrl.article;
    }, function(newArticle, previousArticle){
      if (ctrl.article != null){
        loadArticle(ctrl.article);
      }
    }, true);

    $scope.$watch( function(){
      return Selector.selectionValidated;
    }, function(newVal, oldVal){
      if (newVal){
        insertDataInto();
        Selector.receiptSelection();
      }
    }, true);
}