(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name mustaskeClientApp.question.factory
   * @description
   * # question.factory
   * Factory in the mustaskeClientApp.
   */
  angular.module('mustaskeClientApp')
    .factory('QuestionDef', [QuestionDef]);

  function QuestionDef()
  {
    function Question(q)
    {
      this.question = q;
    }

    Question.prototype.getText = function ()
    {
      return this.question.text;
    };

    Question.prototype.getVotes = function ()
    {
      return this.question.votes;
    };

    return (Question);
  }

})();
