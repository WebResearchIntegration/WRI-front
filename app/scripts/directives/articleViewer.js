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

function articleViewerCtrl($rootScope, $scope, Articles, textToolbar, Selector) {

  var ctrl = this;

  var selectedProperty;  // variable for know which property is being updated
  
  // [PUBLIC VARIABLES]
  // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
  ctrl.articleTmp;        // temporary article during edition
  ctrl.showAbstract;      // boolean to know if we show abstract or not
  ctrl.showProbSoluce;    // boolean to know if we show problematic and soluce or not
  ctrl.keywordsSelectize; // object to setup selectize for keywords
  ctrl.textToolbar;       // text toolbar for edit problematic, solution, and abstract of article
  ctrl.articleFields;     // article fields
    
  // [INIT]
    // ctrl.$onInit = onInit; /* Angular 1.5+ does not bind attributes until calling $onInit() */
    init();

    // [PUBLIC METHODS]
    ctrl.applyKeywordFilter = applyKeywordFilter;
    ctrl.cancelEdition = cancelEdition;
    ctrl.createArticle = createArticle;
    ctrl.createNoteFor = createNoteFor;
    ctrl.deleteArticle = deleteArticle;
    ctrl.loadArticle = loadArticle;
    ctrl.openAuthorProfile = openAuthorProfile;
    ctrl.openReference = openReference;
    ctrl.selectAuthors = selectAuthors;
    ctrl.selectNotes = selectNotes;
    ctrl.selectQuestions = selectQuestions;
    ctrl.selectReferences = selectReferences;
    ctrl.toggleAbstract = toggleAbstract;
    ctrl.toggleStatus = toggleStatus;
    ctrl.turnEditMode = turnEditMode;
    ctrl.updateArticle = updateArticle;
  
  ////////////

  // [METHODS : begin]
    /**
     * @name init
     * @desc will init article viewer
     */
    function init(){
      ctrl.articleFields = ['name', 'conference', 'publishedDate', 'score', 'isSaved', 'isRead', 'isPrinted', 'problematic', 'solution', 'abstract', 'authors', 'keywords', 'references', 'notes', 'questions'];
    }
    
    /**
     * @name applyKeywordFilter
     * @desc Will load article in viewer
     * @param {String}  keyword   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function applyKeywordFilter(keyword){
      console.log('apply filter keywords on articles : ', keyword);
    }

    /**
     * @name createArticle
     * @desc Will create a new article
     * @memberOf Directives.articleViewer
     */
    function createArticle() {
      Articles.create(ctrl.articleTmp).then(function(articleAdded){
        ctrl.article = articleAdded;
        ctrl.editMode = false;
        $rootScope.$emit("articles:refresh");
      });
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
     * @name cancelEdition
     * @desc Discard changes on the article edited
     * @memberOf Directives.articleViewer
     */
    function cancelEdition(){
      ctrl.editMode = false;
      ctrl.articleTmp = null;
      if(!ctrl.article.id){
        ctrl.article = null;
      }
    }

    /**
     * @name deleteArticle
     * @desc Will delete current article
     * @memberOf Directives.articleViewer
     */
    function deleteArticle() {
      var articleID = ctrl.article.id;
      Articles.delete(articleID).then(function(){
          $scope.$emit("articles:refresh");
          ctrl.article = null;
      });
    }

    /**
     * @name loadArticle
     * @desc Will load article in viewer
     * @param {Object}  article   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function loadArticle(article) {

      // Main informations
      if(!_.isEmpty(_.trim(article.problematic)) && !_.isEmpty(_.trim(article.problematic))){
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

      // Questions 
      if(!_.isArray(ctrl.article.questions)){
        transformIntoArr("questions", true);
      }

      ctrl.articleTmp = null;
      ctrl.article = article;
      if(ctrl.editMode){
        turnEditMode();
      }
    }
    
    /**
     * @name openAuthorProfile
     * @desc Will load the author in the viewer
     * @param {Object}  author   author to load in viewer
     * @memberOf Directives.articleViewer
     */
    function openAuthorProfile(author) {
      $scope.$emit("author:open", author);
    } 

    /**
     * @name openReference
     * @desc Will load the reference in the viewer
     * @param {Object}  article   article to load in viewer
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
     * @name toggleStatus
     * @desc Will toggle abstract in the viewer
     * @memberOf Directives.articleViewer
     */
    function toggleStatus(status) {
      ctrl.article[status] = !ctrl.article[status];
      updateArticle();
    }
    
    /**
     * @name turnEditMode
     * @desc Will turn on edit mode for article
     * @memberOf Directives.articleViewer
     */
    function turnEditMode() {
      ctrl.articleTmp = _.pick(ctrl.article, ctrl.articleFields);

      ctrl.textToolbar = textToolbar.getSimpleToolbar();
      ctrl.keywordsSelectize = {
        config: {
          create: true,
          valueField: 'text',
          labelField: 'text',
          delimiter: ',',
          placeholder: 'Add keywords',
          onInitialize: function(selectize){
            // receives the selectize object as an argument
          },
          render: {
            item: function(data, escape) {
              return '<span class="mdl-chip"><span class="mdl-chip__text">#' + escape(data.text) + '</span></span>';
            }
          }
        },
        options: [{id:1, text: "interest"}] // get all keywords from database
      };

      ctrl.editMode = true;
    } 

    /**
     * @name selectAuthors
     * @desc Will turn on selector mode for authors of the article
     * @memberOf Directives.articleViewer
     */
    function selectAuthors() {
      selectedProperty = "authors";
      $scope.$emit('select:authors');
      Selector.loadSelection(ctrl.article.authors);
    }

    /**
     * @name selectNotes
     * @desc Will turn on selector mode for notes of the article
     * @memberOf Directives.articleViewer
     */
    function selectNotes() {
      selectedProperty = "notes";
      $scope.$emit('select:notes');
      Selector.loadSelection(ctrl.article.notes);
    }

    /**
     * @name selectQuestions
     * @desc Will turn on selector mode for questions of the article
     * @memberOf Directives.articleViewer
     */
    function selectQuestions() {
      selectedProperty = "questions";
      $scope.$emit('select:questions');
      Selector.loadSelection(ctrl.article.questions);
    }

    /**
     * @name selectReferences
     * @desc Will turn on selector mode for references of the article
     * @memberOf Directives.articleViewer
     */
    function selectReferences() {
      selectedProperty = "references";
      $scope.$emit('select:articles');
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
      ctrl.articleTmp[selectedProperty] = itemsSelected;
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

    /**
     * @name updateArticle
     * @desc Will update current article
     * @memberOf Directives.articleViewer
     */
    function updateArticle() {
      _.assignIn(ctrl.article, ctrl.articleTmp);

      Articles.updateById(ctrl.article.id, ctrl.article).then(function(articleUpdated){
          ctrl.editMode = false;
          loadArticle(articleUpdated);
      });
    }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
    $scope.$watch( function(){
      return ctrl.article;
    }, function(newArticle, previousArticle){
      if (ctrl.article != null){
        loadArticle(ctrl.article);
      }
    });

    $scope.$watch( function(){
      return Selector.selectionValidated;
    }, function(newVal, oldVal){
      if (newVal){
        insertDataInto();
        Selector.receiptSelection();
      }
    }, true);
}