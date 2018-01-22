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
      $rootScope.$emit("authors:refresh");
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
    if(!ctrl.author.id){
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
        action: "delete",
        itemType: "author"
      }
    }).then(function(){
      var authorID = ctrl.author.id;
      Authors.delete(authorID).then(function(){
          $scope.$emit("authors:refresh");
          ctrl.author = null;
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
   * @name selectArticles
   * @desc Will turn on edit mode for author
   * @memberOf Directives.authorViewer
   */
  function selectArticles() {
    $scope.$emit('select:articles');
    Selector.loadSelection(ctrl.author.articles);
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
    ctrl.textToolbar = textToolbar.getSimpleToolbar();
    ctrl.authorTmp = _.pick(ctrl.author, ctrl.authorFields);
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
     * @name insertDataInto
     * @desc Will update author property passed as param into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.authorViewer
     */
    function insertDataInto() {
      var itemsSelected = Selector.getSelection();
      ctrl.authorTmp.articles = itemsSelected;
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

    Authors.updateById(ctrl.author.id, ctrl.author).then(function (authorUpdated) {
      ctrl.editMode = false;
      // TODO: update article viewer with last version from database
      loadAuthor(authorUpdated);
    });
  }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
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

