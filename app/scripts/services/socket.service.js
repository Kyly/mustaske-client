(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name mustaskeClientApp.socket
   * @description
   * # socket
   * Service in the mustaskeClientApp.
   */
  angular.module('mustaskeClientApp')
    .service('SocketService', ['QuestionDef', SocketService]);

  var ctrl, Question;
  function SocketService(QuestionDef)
  {
    Question = QuestionDef;
    ctrl = this;
    ctrl.questions = [
      new Question({ text: 'Here is some sample question?', votes: 100}),
      new Question({ text: 'I\'m not a popular question?', votes: 3}),
      new Question({ text: 'How do you do things?', votes: 50})
    ];
  }


  SocketService.prototype.getRecentQuestions = function ()
  {
    return ctrl.questions;
  };

  SocketService.prototype.getTopQuestions = function ()
  {
    ctrl.topQuestions = [
      new Question({ text: 'Here is some sample question?', votes: 100}),
      new Question({ text: 'How do you do things?', votes: 50})
    ];

    return ctrl.topQuestions;
  };

  SocketService.prototype.emitNewQuestion = function(question)
  {
    /* TODO Tie into actual socket */
  };

})();
