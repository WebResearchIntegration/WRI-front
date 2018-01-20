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
    templateUrl: '/views/directives/author-viewer.html',
    scope: {
      author: '=',
      editMode: '='
    },
    bindToController: true,
    controllerAs: 'authorViewer',
    controller: authorViewerCtrl
  };
}

function authorViewerCtrl($rootScope, $scope, Authors) {

  var ctrl = this;

  // [PUBLIC VARIABLES]
  // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
  ctrl.authorFields;    // author fields accessible
  ctrl.authorTmp;       // temporary author during edition

  // [INIT]
  // ctrl.$onInit = loadAuthor; /* Angular 1.5+ does not bind attributes until calling $onInit() */
  init();

  // [PUBLIC METHODS]
  ctrl.createAuthor = createAuthor;
  ctrl.cancelEdition = cancelEdition;
  ctrl.deleteAuthor = deleteAuthor;
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
    ctrl.author = ctrl.authorTmp;
    Authors.create(ctrl.authorTmp).then(function (authorAdded) {
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
    ctrl.authorTmp = _.pick(ctrl.author, ctrl.authorFields);
  }

  /**
   * @name deleteAuthor
   * @desc Will delete current author
   * @memberOf Directives.authorViewer
   */
  function deleteAuthor() {
    var authorID = ctrl.author.id;
    Authors.delete(authorID).then(function () {
      $scope.$emit("authors:refresh");
      ctrl.author = null;
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
    ctrl.authorTmp = _.pick(ctrl.author, ctrl.authorFields);
  }

  /**
   * @name turnEditMode
   * @desc Will turn on edit mode for author
   * @memberOf Directives.authorViewer
   */
  function turnEditMode() {
    ctrl.editMode = true;
    ctrl.authorTmp = _.pick(ctrl.author, ctrl.authorFields);
  }
  // [METHODS : end]

  // [PRIVATE FUNCTIONS : begin]

  /**
   * @name updateAuthor
   * @desc Will update current author
   * @param {Object}  property   property to transform into an array
   * @param {Boolean}  onlyObject   check if the current property has to be an object
   * @memberOf Directives.authorViewer
   */
  function updateAuthor() {
    _.assignIn(ctrl.author, ctrl.authorTmp);

    Authors.updateById(ctrl.author.id, ctrl.author).then(function (authorUpdated) {
      ctrl.editMode = false;
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
}

