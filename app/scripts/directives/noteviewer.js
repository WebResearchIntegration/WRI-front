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
    templateUrl: 'views/directives/note-viewer.html',
    scope: {
      note: '=',
      editMode: '='
    },
    bindToController: true,
    controllerAs: 'noteViewer',
    controller: noteViewerCtrl
  };
}

function noteViewerCtrl($rootScope, $scope, Notes, ngDialog, localStorageService) {

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
    var sendingElement = {
      user: localStorageService.get("user").id,
      note: ctrl.noteTmp
    };
    sendingElement.note.isDocument = false;// specify that the current note is not a document

    Notes.create(sendingElement).then(function (noteAdded) {
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
    ctrl.noteTmp = null;
    if(!ctrl.note._id){
      ctrl.note = null;
    }
  }

  /**
   * @name deleteNote
   * @desc Will delete current note
   * @memberOf Directives.noteViewer
   */
  function deleteNote() {
    ngDialog.openConfirm({
      template: "views/_confirm.html",
      appendClassName: "wri_dialog",
      showClose:false,
      data: {
        message: "Are you sure you want to delete this note ?"
      }
    }).then(function(){
      var noteID = ctrl.note._id;
      Notes.delete(noteID).then(function(){
          $scope.$emit("notes:refresh");
          ctrl.note = null;
          ctrl.editMode = false;
      });
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
    ctrl.note = note;
    if(ctrl.editMode){
      turnEditMode();
    }
  }

  /**
   * @name turnEditMode
   * @desc Will turn on edit mode for note
   * @memberOf Directives.noteViewer
   */
  function turnEditMode() {
    ctrl.noteTmp = _.pick(ctrl.note, ['text']);
    ctrl.editMode = true;
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
      var originalData = _.pick(ctrl.note, ctrl.noteFields);
      
      if (!_.isEqual(ctrl.noteTmp, originalData)){
        ngDialog.openConfirm({
          template: "views/_confirm.html",
          appendClassName: "wri_dialog",
          showClose:false,
          data: {
            message: "Are you sure you want to quit current note without saving ?"
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
     * @name updateNote
     * @desc Will update current note
     * @param {Object}  property   property to transform into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.noteViewer
     */
    function updateNote() {
      var noteEdited = _.assignIn(ctrl.note, ctrl.noteTmp);

      Notes.updateById(noteEdited._id, noteEdited).then(function (noteUpdated) {
        ctrl.editMode = false;
        // TODO : sync viewer with last version from database
        loadNote(noteUpdated);
      });
    }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
  $scope.$on("manage:load-while-editing", function(event, item, inEditor, type){
    confirmBeforeSwitch(item, inEditor, type);
  });

  // [WATCHERS]
  $scope.$watch(function () {
    return ctrl.note;
  }, function (newNote, previousNote) {
    if (ctrl.note != null) {
      loadNote(ctrl.note);
    }
  });
}
