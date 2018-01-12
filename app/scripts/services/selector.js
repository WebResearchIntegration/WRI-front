'use strict';

/**
 * @ngdoc service
 * @name wriApp.Selector
 * @description
 * # Selector
 * Factory in the wriApp.
 */
angular.module('wriApp')
  .factory('Selector', function ($timeout) {

    var factory = this;

    // [PRIVATE PROPERTIES]
    var selectedItems = [];
    var selectedType = "";
    
    // [PUBLIC PROPERTIES]
    factory.itemsAlreadySelectedSize = false;
    factory.isEnabled = false;
    factory.selectionValidated = false;

    // [PUBLIC METHODS]
    factory.cleanList = cleanList;
    factory.disable = disable;
    factory.enable = enable;
    factory.getSelection = getSelection;
    factory.getSelectionSize = getSelectionSize;
    factory.getSelectionType = getSelectionType;
    factory.loadSelection = loadSelection;
    factory.reinitSelection = reinitSelection;
    factory.receiptSelection = receiptSelection;
    factory.setSelectionInCtrl = setSelectionInCtrl;
    factory.toggleInList = toggleInList;
    factory.validate = validate;

    //////////////////////

    // [METHODS : begin]
      /**
       * @name cleanList
       * @desc will empty the itemsList
       * @return {void}
       */
      function cleanList(){
        selectedItems = [];
      }

      /**
       * @name disable
       * @desc will turn off select mode
       * @return {void}
       */
      function disable(){
        selectedType = "";
        factory.isEnabled = false;
        factory.itemsAlreadySelectedSize = 0;
        cleanList();
      }

      /**
       * @name enable
       * @desc will turn on select mode
       * @param {String} type   type which will be selected
       * @return {void}
       */
      function enable(type){
        factory.isEnabled = true;
        selectedType = type;
      }

      /**
       * @name getSelection
       * @desc will return the selected items
       * @return {Array}  the selected items
       */
      function getSelection(){
          return selectedItems;
      }

      /**
       * @name getSelectionType
       * @desc will return the selected items
       * @return {Array}  the selected items
       */
      function getSelectionType(){
          return selectedType;
      }

      /**
       * @name getSelectionSize
       * @desc will return size of selection
       * @return {Number} size of selection
       */
      function getSelectionSize(){
          return selectedItems.length;
      }

      /**
       * @name loadSelection
       * @desc will load items which are already presents in selected item property
       * @return {void}
       */
      function loadSelection(itemsAlreadySelected){
        factory.itemsAlreadySelectedSize = itemsAlreadySelected.length;
        selectedItems = _.union(selectedItems, itemsAlreadySelected);
        factory.itemsAlreadySelectedSize = true;
      }

      /**
       * @name reinitSelection
       * @desc Disable selected articles in list 
       * @return {void} 
       */
      function reinitSelection(listOfItem){
        listOfItem.forEach(element => {
          delete element.isSelected;
        });
      }

      /**
       * @name receiptSelection
       * @desc confirm reception of the selection
       * @return {void}
       */
      function receiptSelection(){
        factory.selectionValidated = false;
      }

      /**
       * @name setSelectionInCtrl
       * @desc Select items in items list 
       * @param {Array} itemsToSelect  items to select in the list
       * @return {void} 
       */
      function setSelectionInCtrl(collection){
        var tmp;
        _.forEach(selectedItems, function(itemToSelect){
          tmp = _.find(collection, ['id', itemToSelect.id]);
          console.log(tmp);
          if (tmp != undefined){
              tmp.isSelected = true;
          }
        });
      }

      /**
       * @name toggleInList
       * @desc will add the item to the list if doesn't exist but remove it if it already exists
       * @param {Object} item  item to toggle in list
       * @return {Boolean}  success of updating the list
       */
      function toggleInList(item){
        var lengthBefore = selectedItems.length;
        var itemFound = _.find(selectedItems, ['id', item.id]);
        if (!itemFound){
          selectedItems.push(item);
        }
        else {
          _.remove(selectedItems, item);
        }
        return lengthBefore == selectedItems.length;
      }
      
      /**
       * @name validate
       * @desc will validate the selection
       * @return {void}
       */
      function validate(){
        factory.selectionValidated = true;
      }
    // [METHODS : end]

    //////////////////////

    return factory;
  });
