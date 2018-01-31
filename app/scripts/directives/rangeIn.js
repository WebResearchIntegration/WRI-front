'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:rangeIn
 * @description
 * # rangeIn
 */
angular.module('wriApp')
  .directive('rangeIn', function () {
    return {
      restrict: "A",
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {

        // [VARIABLES : Declaration]
          var regEx;
          var rangeRegEx;
          var minLength;
          var maxLength;
          var range = [parseInt(attrs.min), parseInt(attrs.max)];

        // [CONFIG]
          minLength = range[0].toString().length;
          maxLength = range[1].toString().length;
          
          if (maxLength > 1 || minLength > 1){
            regEx = "^?[0-9]$";
          }
          else {
            regEx = "^?["+ range[0] + "-" + range[1] +"]$";
          }
          rangeRegEx = new RegExp(regEx);
      
      // [LIMITING INPUT]
          angular.element(elem).on("keypress", function(e) {
            var char = e.char || String.fromCharCode(e.charCode);
            if (this.value.length >= maxLength) {
              e.preventDefault();
            }
            else if (!rangeRegEx.test(char)){
              e.preventDefault();
            }
          });
      
      // [PARSE INPUT TO FIT RANGE]
        function parser(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          else if (value.toString().length == maxLength){
            var formatedValue;
            if (value >= range[1]){
              formatedValue = range[1];
            }
            else if (value <= range[0]){
              formatedValue = range[0];
            }
            else {
              formatedValue = value;
            }
            if (ctrl.$viewValue !== formatedValue) {
              ctrl.$setViewValue(formatedValue);
              ctrl.$render();
            }
            return formatedValue;
          }
          else {
            return value;
          }
        }

        function formatter(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          else if (value.toString().length == maxLength){
            var formatedValue;
            if (value >= range[1]){
              formatedValue = range[1];
            }
            else if (value <= range[0]){
              formatedValue = range[0];
            }
            else {
              formatedValue = value;
            }
            return formatedValue;
          }
          else {
            return value;
          }
        }

        ctrl.$formatters.push(formatter);
        ctrl.$parsers.push(parser);
      }
    };
  });
