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
    templateUrl: 'views/directives/article-viewer.html',
    scope: {
      article: '=',
      editMode: '='
    },
    bindToController: true,
    controllerAs: 'articleViewer',
    controller: articleViewerCtrl
  };  
}

function articleViewerCtrl($rootScope, $scope, $timeout, $filter, localStorageService, Articles, Authors, textToolbar, Selector, ngDialog, DataCollect) {

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
    ctrl.createQuestionFor = createQuestionFor;
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
      var sendingElement = {
        user: localStorageService.get("user").id,
        article: ctrl.articleTmp
      };
      Articles.create(sendingElement).then(function(articleAdded){
        ctrl.article = articleAdded;
        ctrl.editMode = false;
        $scope.$emit("viewer_items-list:insert", "articles", articleAdded._id);
      });
    }

    /**
     * @name createNoteFor
     * @desc Will load notes view and note editor. It will bind the new note with current article
     * @memberOf Directives.articleViewer
     */
    function createNoteFor(){
      var emptyNote = {
        text: ""
      };
      loadItemInPreviewer(emptyNote, "note");
    }

    /**
     * @name createQuestionFor
     * @desc Will load questions view and question editor. It will bind the new question with current article
     * @memberOf Directives.articleViewer
     */
    function createQuestionFor(){
      var emptyQuestion = {
        problematic: "",
        answer: ""
      };
      loadItemInPreviewer(emptyQuestion, "question");
    }

    /**
     * @name cancelEdition
     * @desc Discard changes on the article edited
     * @memberOf Directives.articleViewer
     */
    function cancelEdition(){
      ctrl.editMode = false;
      ctrl.articleTmp = null;
      if(!ctrl.article._id){
        ctrl.article = null;
      }
    }

    /**
     * @name deleteArticle
     * @desc Will delete current article
     * @memberOf Directives.articleViewer
     */
    function deleteArticle() {
      ngDialog.openConfirm({
        template: "views/_confirm.html",
        appendClassName: "wri_dialog",
        showClose:false,
        data: {
          message: "Are you sure you want to delete this article ?"
        }
      }).then(function(){
        var articleID = ctrl.article._id;
        // check article.id (because of RESTangular)
        Articles.delete(articleID).then(function(){
            $scope.$emit("viewer_items-list:remove", "articles", articleID);
            ctrl.article = null;
            ctrl.editMode = false;
        });
      }).catch(function(){
        console.log("cancel delete ");
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
      Authors.getById(author._id).then(function (authorToOpen){
        $scope.$emit("viewer_manage:open", authorToOpen, false, "author");
      });
    } 

    /**
     * @name openReference
     * @desc Will load the reference in the viewer
     * @param {Object}  article   article to load in viewer
     * @memberOf Directives.articleViewer
     */
    function openReference(article) {
      Articles.getById(article._id).then(function (referenceToOpen){
        $scope.$emit("viewer_manage:open", referenceToOpen, false, "article");
      });
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
      var clonedArticle = _.cloneDeep(ctrl.article);
      ctrl.articleTmp = _.pick(clonedArticle, ctrl.articleFields);
      ctrl.articleTmp.publishedDate = new Date(ctrl.articleTmp.publishedDate);
      
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
        options: DataCollect.getKeywordsAsOptions() // get all keywords from database
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
      $scope.$emit('viewer_manage:select', selectedProperty);
      Selector.loadSelection(ctrl.articleTmp.authors);
    }

    /**
     * @name selectNotes
     * @desc Will turn on selector mode for notes of the article
     * @memberOf Directives.articleViewer
     */
    function selectNotes() {
      selectedProperty = "notes";
      $scope.$emit('viewer_manage:select', selectedProperty);
      Selector.loadSelection(ctrl.articleTmp.notes);
    }

    /**
     * @name selectQuestions
     * @desc Will turn on selector mode for questions of the article
     * @memberOf Directives.articleViewer
     */
    function selectQuestions() {
      selectedProperty = "questions";
      $scope.$emit('viewer_manage:select', selectedProperty);
      Selector.loadSelection(ctrl.articleTmp.questions);
    }

    /**
     * @name selectReferences
     * @desc Will turn on selector mode for references of the article
     * @memberOf Directives.articleViewer
     */
    function selectReferences() {
      selectedProperty = "references";
      $scope.$emit('viewer_manage:select', "articles");
      Selector.loadSelection(ctrl.articleTmp.references);
    }
  // [METHODS : end]

  // [PRIVATE FUNCTIONS : begin]
    /**
     * @name  confirmBeforeSwitch
     * @desc  Will open a confirm box to ask user to confirm choice before load another item in viewer, if currently was being edited
     * @param   item  item to load in viewer
     * @param   inEditor  to know if we need to turn edit mode or not
     * @return  {Event} 'viewer_manage:open'   if confirmed 
     */
    function confirmBeforeSwitch(item, inEditor, type){
      inEditor = inEditor || false;
      var originalData = _.pick(ctrl.article, ctrl.articleFields);

      if (!_.isEqual(ctrl.articleTmp, originalData)){
        ngDialog.openConfirm({
          template: "views/_confirm.html",
          appendClassName: "wri_dialog",
          showClose:false,
          data: {
            message: "Are you sure you want to quit current article without saving ?"
          }
        }).then(function(){
          $scope.$emit("viewer_manage:open", item, inEditor, type);
        }).catch(function(){
          console.log("continue current edition");
        });
      } 
      else {
        $scope.$emit("viewer_manage:open", item, inEditor, type);
      }
    }

    /**
     * @name insertDataInto
     * @desc Will update article property passed as param into an array
     * @param {Object}  property   property to transform into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.articleViewer
     */
    function insertDataInto() {
      var itemsSelected = Selector.getSelection();
      var obj;
      ctrl.articleTmp[selectedProperty] = [];
      _.forEach(itemsSelected, function(item){
        obj = {};
        obj = _.pick(item, ["_id"]);
        ctrl.articleTmp[selectedProperty].push(obj);
      });
      Selector.disable();
    }

    /**
     * @name loadItemInPreviewer
     * @desc load item into previewer
     * @param {Object}  item    item to load in viewer
     * @param {Boolean}  inEditor    true if we want to load the item in editor
     * @memberOf Controllers.manage
     */
    function loadItemInPreviewer(item, type) {
      var previewParams = {
        type: type,
        fullEditor: true,
        field: item
      };

      switch(type){
          case "note":
            previewParams.title = "New Note for " + ctrl.article.name;
          break;

          case "question":
            previewParams.title = "New Question for " + ctrl.article.name;
            previewParams.toolbar = textToolbar.getAdvancedToolbar();
          break;

          default:
            previewParams.title = "Previewer";
          break;
      }
      
      ngDialog.open({
          template: "views/previewer.html",
          className: "viewer",
          showClose: false,
          closeByDocument: false,
          closeByEscape: false,
          controller: 'previewerCtrl',
          controllerAs: 'previewer',
          scope: $scope,
          data: previewParams
      });
    }

    /**
     * @name pushElementIntoArticle
     * @desc Will push new note / question into article
     * @param {Object}  item   item to push into article property
     * @param {String}  type   to determinate which article property collection need to be updated
     * @memberOf Directives.articleViewer
     */
    function pushElementIntoArticle(item, type){
      switch(type){
        case "note":
          ctrl.articleTmp = _.pick(ctrl.article, ["_id", "notes"]);
          ctrl.articleTmp.notes.push(item);
          updateArticle();
        break;

        case "question":
          ctrl.articleTmp = _.pick(ctrl.article, ["_id", "questions"]);
          ctrl.articleTmp.questions.push(item);
          updateArticle();
        break;

        default: 
          console.error("type unknown to save in article");
        break;
      }
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
      var articleEdited = _.assignIn(ctrl.article, ctrl.articleTmp);

      Articles.updateById(articleEdited._id, articleEdited).then(function(articleUpdated){
          ctrl.editMode = false;
          // TODO : sync viewer with last version from database
          $scope.$emit("viewer_items-list:refresh", "articles", articleUpdated._id);
          Articles.getById(articleUpdated._id).then(function(updatedArticle){
              DataCollect.extractKeywordsOf(updatedArticle);
              loadArticle(updatedArticle);
            }
          );
      });
    }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
    $scope.$on("manage:load-while-editing", function(event, item, inEditor, type){
      confirmBeforeSwitch(item, inEditor, type);
    });

    $scope.$on("previewer_viewer:push-to", function(event, item, type){
      pushElementIntoArticle(item, type);
    });

  // [WATCHERS]
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