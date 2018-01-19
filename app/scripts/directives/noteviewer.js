'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:noteViewer
 * @description
 * # noteViewer
 */
angular.module('wriApp')
  .directive('noteViewer', noteViewerDirective);

function noteViewerDirective() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/note-viewer.html',
    scope: {
      note: '=',
      editMode: '='
    },
    bindToController: true,
    controllerAs: 'noteViewer',
    controller: noteViewerCtrl
  };
}

function noteViewerCtrl($rootScope, $scope, Notes) {

  var ctrl = this;

  // [PUBLIC VARIABLES]
  // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
  ctrl.noteTmp; // temporary note during edition

  // [INIT]
  // ctrl.$onInit = loadNote; /* Angular 1.5+ does not bind attributes until calling $onInit() */

  // [PUBLIC METHODS]
  ctrl.createNote = createNote;
  ctrl.cancelEdition = cancelEdition;
  ctrl.deleteNote = deleteNote;
  ctrl.turnEditMode = turnEditMode;
  ctrl.updateNote = updateNote;

  ////////////

  // [METHODS : begin]
  /**
   * @name createNote
   * @desc Will create a new note
   * @memberOf Directives.noteViewer
   */
  function createNote() {
	console.log("note :: ", ctrl.noteTmp);
    Notes.create(ctrl.noteTmp).then(function (noteAdded) {
		console.log(noteAdded);
		ctrl.note = noteAdded;
		ctrl.editMode = false;
		$rootScope.$emit("notes:refresh");
    });
  }

  /**
   * @name cancelEdition
   * @desc Discard changes on the note edited
   * @memberOf Directives.noteViewer
   */
  function cancelEdition() {
    ctrl.editMode = false;
    ctrl.noteTmp = _.pick(ctrl.note, ['text']);
  }

  /**
   * @name deleteNote
   * @desc Will delete current note
   * @memberOf Directives.noteViewer
   */
  function deleteNote() {
    var noteID = ctrl.note.id;
    Notes.delete(noteID).then(function () {
      $scope.$emit("notes:refresh");
      ctrl.note = null;
    });
  }

  /**
   * @name loadNote
   * @desc Will load note in viewer
   * @param {Object}  note   note to load in note viewer
   * @memberOf Directives.noteViewer
   */
  function loadNote(note) {
    ctrl.noteTmp = null;
    ctrl.noteTmp = _.pick(ctrl.note, ['text']);
  }

  /**
   * @name turnEditMode
   * @desc Will turn on edit mode for note
   * @memberOf Directives.noteViewer
   */
  function turnEditMode() {
    ctrl.editMode = true;
    ctrl.noteTmp = _.pick(ctrl.note, ['text']);
  }
  // [METHODS : end]

  // [PRIVATE FUNCTIONS : begin]

  /**
   * @name updateNote
   * @desc Will update current note
   * @param {Object}  property   property to transform into an array
   * @param {Boolean}  onlyObject   check if the current property has to be an object
   * @memberOf Directives.noteViewer
   */
  function updateNote() {
    _.assignIn(ctrl.note, ctrl.noteTmp);

    Notes.updateById(ctrl.note.id, ctrl.note).then(function (noteUpdated) {
      ctrl.editMode = false;
      loadNote(noteUpdated);
    });
  }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
  $scope.$watch(function () {
    return ctrl.note;
  }, function (newNote, previousNote) {
    if (ctrl.note != null) {
      loadNote(ctrl.note);
    }
  });
}
