'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:authorViewer
 * @description
 * # authorViewer
 */
angular.module('wriApp')
  .directive('authorViewer', authorViewerDirective);

function authorViewerDirective() {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/author-viewer.html',
    scope: {
      author: '=',
      editMode: '='
    },
    bindToController: true,
    controllerAs: 'authorViewer',
    controller: authorViewerCtrl
  };
}

function authorViewerCtrl($rootScope, $scope, $q, Authors, Articles, Selector, textToolbar, ngDialog, localStorageService) {

  var ctrl = this;

  // [PUBLIC VARIABLES]
  // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
  ctrl.authorFields;    // author fields accessible
  ctrl.authorTmp;       // temporary author during edition
  ctrl.textToolbar;     // toolbar for description's text block

  // [INIT]
  // ctrl.$onInit = loadAuthor; /* Angular 1.5+ does not bind attributes until calling $onInit() */
  init();

  // [PUBLIC METHODS]
  ctrl.createAuthor = createAuthor;
  ctrl.cancelEdition = cancelEdition;
  ctrl.deleteAuthor = deleteAuthor;
  ctrl.openArticle = openArticle;
  ctrl.selectArticles = selectArticles;
  ctrl.showAllArticles = showAllArticles;
  ctrl.toggleContact = toggleContact;
  ctrl.turnEditMode = turnEditMode;
  ctrl.updateAuthor = updateAuthor;

  ////////////

  // [METHODS : begin]
  /**
   * @name init
   * @desc will init the author viewer
   */
  function init(){
    ctrl.authorFields = ['name', 'email', 'linkedIn', 'rating', 'birthDate', 'gender', 'photoUrl', 'description', 'articles'];
  }

  /**
   * @name createAuthor
   * @desc Will create a new author
   * @memberOf Directives.authorViewer
   */
  function createAuthor() {
    var sendingElement = {
      user: localStorageService.get("user").id,
      author: ctrl.authorTmp
    };
    Authors.create(sendingElement).then(function (authorAdded) {
      ctrl.author = authorAdded;
      ctrl.editMode = false;
      $scope.$emit("viewer_items-list:insert", "authors", authorAdded._id);
    });
  }

  /**
   * @name cancelEdition
   * @desc Discard changes on the author edited
   * @memberOf Directives.authorViewer
   */
  function cancelEdition() {
    ctrl.editMode = false;
    ctrl.authorTmp = null;
    if(!ctrl.author._id){
      ctrl.author = null;
    }
  }

  /**
   * @name deleteAuthor
   * @desc Will delete current author
   * @memberOf Directives.authorViewer
   */
  function deleteAuthor() {
    ngDialog.openConfirm({
      template: "views/_confirm.html",
      appendClassName: "wri_dialog",
      showClose:false,
      data: {
        message: "Are you sure you want to delete this author ?"
      }
    }).then(function(){
      var authorID = ctrl.author._id;
      Authors.delete(authorID).then(function(){
          $scope.$emit("viewer_items-list:remove", "authors", authorID);
          ctrl.author = null;
          ctrl.editMode = false;
      });
    });
  }

  /**
   * @name loadAuthor
   * @desc Will load author in viewer
   * @param {Object}  author   author to load in author viewer
   * @memberOf Directives.authorViewer
   */
  function loadAuthor(author) {
    ctrl.authorTmp = null;
    ctrl.author = author;

    if(!_.isArray(ctrl.author.articles)){
      transformIntoArr("articles", true);
    }

    if(ctrl.editMode){
      turnEditMode();
    }
  }

  /**
   * @name openArticle
   * @desc Will load article in viewer
   * @param {Object}  article   article to load in article viewer
   * @memberOf Directives.authorViewer
   */
  function openArticle(article) {
    Articles.getById(article._id).then(function (referenceToOpen){
      $scope.$emit("viewer_manage:open", referenceToOpen, false, "article");
    });
  }

  /**
   * @name selectArticles
   * @desc Will turn on edit mode for author
   * @memberOf Directives.authorViewer
   */
  function selectArticles() {
    $scope.$emit('viewer_manage:select', "articles");
    Selector.loadSelection(ctrl.authorTmp.articles);
  }

  /**
   * @name showAllArticles
   * @desc Will turn on edit mode for author
   * @memberOf Directives.authorViewer
   */
  function showAllArticles() {
    // filter list with all articles of current author
  }
  
  /**
   * @name turnEditMode
   * @desc Will turn on edit mode for author
   * @memberOf Directives.authorViewer
   */
  function turnEditMode() {
    var clonedAuthor = _.cloneDeep(ctrl.author);
    ctrl.authorTmp = _.pick(clonedAuthor, ctrl.authorFields);
    ctrl.textToolbar = textToolbar.getSimpleToolbar();
    ctrl.editMode = true;
  }

  /**
   * @name toggleContact
   * @desc Will show/hide contact fo the autor
   * @memberOf Directives.authorViewer
   */
  function toggleContact() {
    ctrl.showContact = !ctrl.showContact;
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
      var originalData = _.pick(ctrl.author, ctrl.authorFields);

      if (!_.isEqual(ctrl.authorTmp, originalData)){
        ngDialog.openConfirm({
          template: "views/_confirm.html",
          appendClassName: "wri_dialog",
          showClose:false,
          data: {
            message: "Are you sure you want to quit current author without saving ?"
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
     * @desc Will update author property passed as param into an array
     * @memberOf Directives.authorViewer
     */
    function insertDataInto() {
      var itemsSelected = Selector.getSelection();
      var obj;
      ctrl.authorTmp.articles = [];
      _.forEach(itemsSelected, function(article){
        obj = {};
        obj = _.pick(article, ["_id"]);
        ctrl.authorTmp.articles.push(obj);
      });
      Selector.disable();
    }


    /**
     * @name transformIntoArr
     * @desc Will update author property passed as param into an array
     * @param {Object}  property   property to transform into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.authorViewer
     */
    function transformIntoArr(property, onlyObject) {
      onlyObject = onlyObject || false;
      var returnArr = [];
      if (!_.isEmpty(ctrl.author[property])){
        if (onlyObject && _.isObject(ctrl.author[property])){
          returnArr.push(ctrl.author[property]);
        }
        else if (!onlyObject){
          returnArr.push(ctrl.author[property]);
        }
      }
      ctrl.author[property] = returnArr;
    }

  /**
   * @name updateAuthor
   * @desc Will update current author
   * @param {Object}  property   property to transform into an array
   * @param {Boolean}  onlyObject   check if the current property has to be an object
   * @memberOf Directives.authorViewer
   */
  function updateAuthor() {
    var authorEdited = _.merge(ctrl.author, ctrl.authorTmp);

    Authors.updateById(authorEdited._id, authorEdited).then(function (authorUpdated) {
      ctrl.editMode = false;
      $scope.$emit("viewer_items-list:refresh", "authors", authorUpdated._id);

      Authors.getById(authorUpdated._id).then(function (authorToReload){
        loadAuthor(authorToReload);
      });
    });
  }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
  $scope.$on("manage:load-while-editing", function(event, item, inEditor, type){
      confirmBeforeSwitch(item, inEditor, type);
  });

  // [WATCHERS]
  $scope.$watch(function () {
    return ctrl.author;
  }, function (newAuthor, previousAuthor) {
    if (ctrl.author != null) {
      loadAuthor(ctrl.author);
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

