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
  function manageController($scope, $timeout) {
      
      var ctrl = this;

      //[SCOPE VARIABLES]
      ctrl.selectMode;   // boolean to check Selection Mode
      ctrl.manageTabs;   // categories accessible in manage section
      ctrl.viewer;       // viewer params
      
      // [INIT]
      init();

      //[SCOPE METHODS]
      ctrl.selectItem = selectItem;
      ctrl.showCategory = showCategory;
      ctrl.toggleViewer = toggleViewer;
    
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
            var currentTab = getCurrentTab();
            ctrl.currentCtrl = currentTab + "Ctrl as " + currentTab +"Ctrl";
            
            // Selection Mode
            ctrl.selectMode = false;
            
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
         * @name selectItem
         * @desc Two cases are available for this method.
         * Will send the item to the viewer.
         * Will add the item to the list of selected items if selection mode is on.
         * @param {Object} item   item from the list got from the database.
         */
        function selectItem(item) {
            if(ctrl.selectMode) {
                // Not implemented yet
            } else {
                // TODO: check if the type can be load in viewer
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
            changeCloserIcon();
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
         * @name getCurrentTab
         * @desc get the current active tab by checking which key in ctrl.manageTabs has true value
         * @return {String} tab   the active tab on the page
         */
        function getCurrentTab() {
            return _.findKey(ctrl.manageTabs, _.partial(_.isEqual, true));
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
  }
})();
    
