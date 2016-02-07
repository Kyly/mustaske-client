/**
 * @ngdoc service
 * @name mustaskeClientApp.socket
 * @description
 * # socket
 * Service in the mustaskeClientApp.
 */

(function(){
  'use strict';

  angular.module('mustaskeClientApp')
    .service('SocketService', ['QuestionDef', 'socketFactory', SocketService]);

  var ctrl, Question, socket;
  function SocketService(QuestionDef, socketFactory)
  {

    Question = QuestionDef;
    ctrl = this;
    ctrl.questions = [
      new Question({ text: 'Here is some sample question?', votes: 100}),
      new Question({ text: 'I\'m not a popular question?', votes: 3}),
      new Question({ text: 'How do you do things?', votes: 50})
    ];

    initSocket(socketFactory);
  }

  function initSocket(socketFactory)
  {

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
