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
  angular.module('mustaskeClientApp').service('RoomService', ['$rootScope', '$log', 'AppService', RoomService]);

  var room, logger, ctrl, rootScope;

  function RoomService($rootScope, $log, AppService)
  {
    logger = $log;
    rootScope = $rootScope;

    ctrl = this;
    init();
    _.once(AppService.manageClear(ctrl.clear));
  }

  function init() {
    room = {
      has_room: false,
      room_name: '',
      room_id: '',
      questions: [],
      top_questions: [],
      active_poll: ''
    };
  }

  RoomService.prototype.clear = function() {
    init();
  };

  RoomService.prototype.setRoomData = function (data)
  {
    room.has_room = true;
    room.room_name = data.room_name;
    room.room_id = data.room_id;
    room.active_poll = data.active_poll;
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
    return room.questions;
    /* May not really need top questions anymore, just handle this by sorting */
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

  RoomService.prototype.getActivePoll = function ()
  {
    return room.active_poll;
  };

  RoomService.prototype.setActivePoll = function (poll)
  {
    room.active_poll = poll;
  };

  RoomService.prototype.getRoomData = function () {
    return room;
  };

  RoomService.prototype.hasRoom = function () {
    return room.has_room;
  };

  RoomService.prototype.updateVote = function (questionData)
  {
    angular.forEach(room.questions, function (question)
    {
      if (question.question_id === questionData.question_id)
      {
        question.question_score = questionData.question_score;
      }
    });
  };

  RoomService.prototype.dismissQuestion = function (questionId)
  {
   for(var index = 0; room.questions.length > index; index++)
   {
     if(room.questions[index].question_id === questionId)
     {
       room.questions.splice(index, 1);
       return;
     }
   }

  };

})();
