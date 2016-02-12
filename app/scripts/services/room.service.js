/**
 * @ngdoc service
 * @name mustaskeClientApp.RoomService
 * @description
 * # RoomService
 * Service in the mustaskeClientApp.
 */

(function ()
{

  'use strict';
  angular.module('mustaskeClientApp')
    .service('RoomService', ['$log', RoomService]);

  var room, logger, ctrl;
  function RoomService($log)
  {
    logger = $log;
    ctrl = this;

    room = {
      room_name : '',
      room_id : '',
      questions : [],
      top_questions : []
    };

  }

  RoomService.prototype.setRoomData = function (data)
  {
    room.room_name = data.room_name;
    room.room_id = data.room_id;
    if (data.questions && data.questions.length > 0)
    {
      room.questions.push.apply(room.questions, data.questions);
    }

    if (data.top_questions && data.top_questions.length > 0)
    {
      room.top_questions.push.apply(room.top_questions, data.top_questions);
    }

  };

  RoomService.prototype.addQuestion = function (question)
  {
    room.questions.unshift(question);
  };

  RoomService.prototype.getTopQuestions = function ()
  {
    return room.questions; /* May not really need top questions anymore, just handle this by sorting */
  };

  RoomService.prototype.getQuestions = function ()
  {
    return room.questions;
  };

  RoomService.prototype.getRoomId = function ()
  {
    return room.room_id;
  };

  RoomService.prototype.getRoomName = function ()
  {
    return room.room_name;
  };

  RoomService.prototype.updateVote = function (questionData)
  {
    angular.forEach(room.questions, function(question) {
      if (question.question_id === questionData.question_id)
      {
        question.question_score = questionData.question_score;
      }
    });
  };

})();
