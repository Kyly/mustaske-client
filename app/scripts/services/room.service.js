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
    .service('RoomService', ['$log', 'Socket', 'SocketService', RoomService]);

  var room, logger, socket, socketService, ctrl;

  function RoomService($log, Socket, SocketService)
  {
    logger = $log;
    socket = Socket;
    socketService = SocketService;
    ctrl = this;

    room = {
      room_name : '',
      room_id : '',
      questions : [],
      top_questions : []
    };

    initSockets();
  }

  function initSockets()
  {
    socket.on(
      socketService.events.NEW_QUESTION, function (question)
      {
        ctrl.getQuestions().push(question);
      });

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
    room.questions.push(question);
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

})();
