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
         * @name selectItem
         * @desc Two cases are available for this method.
         * Will send the item to the viewer.
         * Will add the item to the list of selected items if selection mode is on.
         * @param {Object} item   item from the list got from the database.
         */
        function selectItem(item) {
            if(ctrl.selectMode) {
                item.isSelected = !item.isSelected;
                Selector.toggleInList(item);
                ctrl.selectionSize = Selector.getSelectionSize();
            } else {
                // TODO: check if the type can be load in viewer
                console.log(item);
                ctrl.viewer.itemToShow = item;
                loadItemInViewer(item);
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
            }, 400);
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
        function loadItemInViewer(item, inEditor) {
            ctrl.viewer.editMode = inEditor || false;
            ctrl.viewer.itemToShowType = getType();
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
         * @desc return the arrow in opposite direction of viewer expansion
         * @memberOf Controllers.manage
         */
        function sliceBy(string, separator, end) {
            var startSliceAt = string.indexOf(separator)+separator.length;
            return string.slice(startSliceAt, end);
        }
        // [PRIVATE FUNCTIONS : end]

        // [EVENTS]
        $scope.$on("articles:new", function(event, emptyArticle){
            event.stopPropagation(); // to prevent to be called twice => why is it called twice ?
            loadItemInViewer(emptyArticle, true);
        });

        $scope.$on("reference:open", function(event, article){
            event.stopPropagation(); // to prevent to be called twice => why is it called twice ?
            loadItemInViewer(article);
        });

        $scope.$on("select:articles", function(event){
            event.stopPropagation(); // to prevent to be called twice => why is it called twice ?
            var category = sliceBy(event.name, ":");
            showCategory(category);
            Selector.enable("articles");
            $timeout(function(){
                ctrl.selectionSize = Selector.getSelectionSize();
            });
        });

        $scope.$on("select:authors", function(event){
            event.stopPropagation(); // to prevent to be called twice => why is it called twice ?
            var category = sliceBy(event.name, ":");
            showCategory(category);
            Selector.enable("authors");
            $timeout(function(){
                ctrl.selectionSize = Selector.getSelectionSize();
            });
        });

        $scope.$on("select:notes", function(event){
            event.stopPropagation(); // to prevent to be called twice => why is it called twice ?
            var category = sliceBy(event.name, ":");
            showCategory(category);
            Selector.enable("notes");
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
    
