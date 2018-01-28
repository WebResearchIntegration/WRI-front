'use strict';

/**
 * manage Controller
 * @namespace Controllers 
 */
(function() {
  angular
      .module('wriApp') 
      .controller('manageCtrl', manageController);

  /**
   * @namespace manage
   * @name wriApp.controller:manageCtrl
   * @desc Controller of the manage page
   * @memberOf Controllers
   */
  function manageController($scope, $timeout, Selector) {
      
      var ctrl = this;

      //[SCOPE VARIABLES]
      ctrl.manageTabs;          // categories accessible in manage section
      ctrl.selectMode;          // boolean to check Selection Mode
      ctrl.selectionSize;       // size of items selected list
      ctrl.viewer;              // viewer params
      
      // [INIT]
      init();

      //[SCOPE METHODS]
      ctrl.disableSelector = disableSelector;
      ctrl.getType = getType;
      ctrl.getCurrentTab = getCurrentTab;
      ctrl.resetSelection = resetSelection;
      ctrl.selectItem = selectItem;
      ctrl.showCategory = showCategory;
      ctrl.toggleViewer = toggleViewer;
      ctrl.validateSelection = validateSelection;
    
      ////////////
    
      // [METHODS : begin]
        /**
         * @name init
         * @desc  Will init the controller with data
         * @param {type} param    precise type in {} and name just after, then explain what it is
         * @returns {void}
         * @memberOf Controllers.manage
         */
        function init(param) {
            // Tabs
            ctrl.manageTabs = {
                'articles' : true,
                'authors' : false,
                'notes' : false,
                'questions' : false
            };
            
            // Selection Mode
            ctrl.selectMode = Selector.isEnabled;
            ctrl.selectionSize = Selector.getSelectionSize();
            
            // Viewer variables
            ctrl.viewer = {
                isClosed: true,
                editMode: false,
                itemToShow: null,
                itemToShowType: getType() // select type of current tab by default
            };
            ctrl.viewer.closerIcon =  getViewerCloserIcon();
        }
            
        /**
         * @name disableSelector
         * @desc turn off the select mode
         * @return {void}
         */
        function disableSelector() {
            Selector.disable();
            $scope.$broadcast("manage:reset-list");
        }

        /**
         * @name getCurrentTab
         * @desc get the current active tab by checking which key in ctrl.manageTabs has true value
         * @return {String} tab   the active tab on the page
         */
        function getCurrentTab() {
            return _.findKey(ctrl.manageTabs, _.partial(_.isEqual, true));
        }

        /**
         * @name resetSelection
         * @desc reset selection in current selector
         * @return {String} tab   the active tab on the page
         */
        function resetSelection() {
            Selector.cleanList();
            ctrl.selectionSize = Selector.getSelectionSize();
            $scope.$broadcast('manage:reset-list');
        }

        /**
         * @name selectItem
         * @desc Three cases are available for this method.
         * Will send the item to the viewer (if not in edit mode)
         * Will send the item to the viewer after confirm (if in edit mode)
         * Will add the item to the list of selected items if selection mode is on.
         * @param {Object} item   item from the list got from the database.
         * @param {Boolean}  inEditor    true if we want to load the item in editor
         */
        function selectItem(item, inEditor) {
            if (ctrl.viewer.editMode && !ctrl.selectMode){
                $scope.$broadcast("manage:load-while-editing", item, inEditor);
            }
            else if(ctrl.selectMode) {
                item.isSelected = !item.isSelected;
                Selector.toggleInList(item);
                ctrl.selectionSize = Selector.getSelectionSize();
            } else {
                // TODO: check if the type can be load in viewer
                ctrl.viewer.itemToShow = item;
                loadItemInViewer(item, inEditor);
            }
        }

        /**
         * @name showCategory
         * @desc load the tab view in the page
         * @param {String} category    category to show
         * @returns {void}
         * @memberOf Controllers.manage
         */
        function showCategory(category){
            _.forOwn(ctrl.manageTabs, function(value, key) {
                ctrl.manageTabs[key] = false;
                if(category === key){
                    ctrl.manageTabs[key] = true;
                }
            });
        }

        /**
         * @name toggleViewer
         * @desc toggle the viewer
         * @return {void}
         * @memberOf Controllers.manage
         */
        function toggleViewer() {
            ctrl.viewer.isClosed = !ctrl.viewer.isClosed;
            if(Selector.isEnabled){
                Selector.disable();
            }
            changeCloserIcon();
        }

        /**
         * @name validateSelection
         * @desc valid the selection and send it to the current element
         * @param {Object} item   item from the list got from the database.
         */
        function validateSelection() {
            Selector.validate();
            $scope.$broadcast('manage:reset-list');
        }
      // [METHODS : end]

      // [PRIVATE FUNCTIONS : begin]
        /**
         * @name changeCloserIcon
         * @desc change the closer icon while viewer opening animation. Animation is during around 300ms.
         * @memberOf Controllers.manage
         */
        function changeCloserIcon(){
            $timeout(function(){
                ctrl.viewer.closerIcon = getViewerCloserIcon();
            }, 200);
        }

        /**
         * @name getType
         * @desc get the type of the clicked item by checking which key as a true value in ctrl.manageTabs. After get the key, we removed the last character ('s') for matching type
         * @returns {String}  type
         * @memberOf Controllers.manage
         */
        function getType() {
            var type = "";
            var tab = getCurrentTab();
            if (tab){
                type = tab.slice(0, -1);
            }
            return type; 
        }

        /**
         * @name getViewerCloserIcon
         * @desc return the arrow in opposite direction of viewer expansion
         * @memberOf Controllers.manage
         */
        function getViewerCloserIcon() {
            return ctrl.viewer.isClosed ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
        }
        
        /**
         * @name loadItemInViewer
         * @desc load item into viewer
         * @param {Object}  item    item to load in viewer
         * @param {Boolean}  inEditor    true if we want to load the item in editor
         * @memberOf Controllers.manage
         */
        function loadItemInViewer(item, inEditor, type) {
            ctrl.viewer.editMode = inEditor || false;
            if (type) {
                ctrl.viewer.itemToShowType = type;
            }
            else {
                ctrl.viewer.itemToShowType = getType();
            }
            ctrl.viewer.itemToShow = item;
            openViewerSafely();
        }

        /**
         * @name openViewerSafely
         * @desc open viewer and change icon if it's not opened
         * @memberOf Controllers.manage
         */
        function openViewerSafely() {
            if(ctrl.viewer.isClosed) {
                ctrl.viewer.isClosed = false;
                changeCloserIcon();
            }
        }

        /**
         * @name sliceBy
         * @desc 
         * @memberOf Controllers.manage
         */
        function sliceBy(string, separator, end) {
            var result = "";
            var startSliceAt = string.indexOf(separator);

            if (end !== 0) {
                end = end || string.length;
            }

            if (end > startSliceAt){
                result = string.slice(startSliceAt + separator.length, end);
            }    
            else if (startSliceAt == end){
                result = string.slice(end);
            }
            else {
                result = string.slice(end, startSliceAt);
            }

            return result;
        }
        // [PRIVATE FUNCTIONS : end]

        // [EVENTS]
        $scope.$on("items-list_manage:new", function(event, type, emptyModel){
            if (ctrl.viewer.editMode && !ctrl.selectMode){
                $scope.$broadcast("manage:load-while-editing", emptyModel, true, type);
            }
            else if (ctrl.selectMode){
                // not implemented yet
            }
            else {
                loadItemInViewer(emptyModel, true, type);
            }
        });

        $scope.$on("viewer_manage:open", function(event, item, inEditor, type){
            loadItemInViewer(item, inEditor, type);
        });

        $scope.$on("viewer_manage:select", function(event, type){
            showCategory(type);
            Selector.enable(type);
            $timeout(function(){
                ctrl.selectionSize = Selector.getSelectionSize();
            });
        });

        // [WATCHERS]
        $scope.$watch(function(){
            return Selector.isEnabled;
        }, function(newVal, oldVal){
            ctrl.selectMode = Selector.isEnabled;
        });
  }
})();
    
