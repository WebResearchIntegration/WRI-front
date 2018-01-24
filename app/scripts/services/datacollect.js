'use strict';

/**
 * DataCollect Factory
 * @namespace Factories 
 */
(function() {
    angular
        .module('wriApp') 
        .factory('DataCollect', DataCollectFactory);

    /**
     * @namespace DataCollect
     * @desc Factory to allow to collect between data in Front
     * @memberOf Factories
     */
    function DataCollectFactory() {
      
        var factory = this;

        //[PRIVATE VARIABLES]
        var keywords;
        
        //[PUBLIC VARIABLES]
        factory.publicVar;
        
        // [INIT]
        init();

        //[PUBLIC METHODS]
        factory.extractKeywordsOf = extractKeywordsOf;
        factory.getKeywordsList = getKeywordsList;
        factory.setKeywordsList = setKeywordsList;
        factory.getKeywordsAsOptions = getKeywordsAsOptions;
    
        ////////////
        
        // [METHODS : begin]
            /**
             * @name init
             * @desc  Will init the controller with data
             * @param {type} param    precise type in {} and name just after, then explain what it is
             * @returns {void}
             * @memberOf Factories.DataCollect
             */
            function init(param) {
                keywords = [];
            }
            
            /**
             * @name extractKeywordsOf
             * @desc to collect the keywords in each article
             * @returns {Object}    keywords, an array of String
             * @memberOf Factories.DataCollect
             */
            function extractKeywordsOf(article) {
            _.forEach(article.keywords, function(keyword){
                if(_.isString(keyword) && !_.isEmpty(keyword) && !_.includes(keywords, keyword)){
                    keywords.push(keyword);
                }
            });
            } 

            /**
             * @name getKeywordsList
             * @desc to get the keywords list from all view
             * @returns {Array}    keywords, an array of String
             * @memberOf Factories.DataCollect
             */
            function getKeywordsList() {
            return keywords;
            } 

            /**
             * @name setKeywordsList
             * @desc to set the keywords list
             * @param {Array}    list, an array of String
             * @returns {void}
             * @memberOf Factories.DataCollect
             */
            function setKeywordsList(list) {
                keywords = list;
            }
        // [METHODS : end]

        // [PRIVATE FUNCTIONS : begin]
                /**
                 * @name getKeywordsAsOptions
                 * @desc will return an array of object to match 'options' attribute in selectize directive.
                 * @returns {Array} selectizeOptions, array of object of type : {text: "keyword"}
                 * @memberOf Factories.DataCollect
                 */
                function getKeywordsAsOptions()  {
                    var selectizeOptions = [];
                    for (var i = 0; i < keywords.length; i++){
                        selectizeOptions.push({
                            text: keywords[i]
                        });
                    }
                    return selectizeOptions;
                }
        // [PRIVATE FUNCTIONS : end]

        ////////////

        return factory;
    }
})();