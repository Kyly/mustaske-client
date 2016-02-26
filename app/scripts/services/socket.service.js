/**
 * @ngdoc service
 * @name mustaskeClientApp.socket
 * @description
 * # socket
 * Service in the mustaskeClientApp.
 */

(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
         .service('SocketService', ['$log', '$q', 'Socket', 'RoomService', '$mdDialog', SocketService]);

  var ctrl, socket, logger, Q, roomService, warnWarning, mdDialog, banWarning;

  function SocketService($log, $q, Socket, RoomService, $mdDialog)
  {
    logger      = $log;
    socket      = Socket;
    Q           = $q;
    roomService = RoomService;
    mdDialog    = $mdDialog;

    ctrl = this;

    ctrl.events = {
      JOIN_ROOM: 'join room',
      CREATE_ROOM: 'create room',
      NEW_QUESTION: 'new question',
      UP_VOTE_QUESTION: 'upvote question',
      DOWN_VOTE_QUESTION: 'downvote question',
      SET_POLL_ACTIVE: 'set active poll',
      START_POLL: 'start poll',
      STOP_POLL: 'stop poll',
      VOTE_POLL: 'vote poll',
      DISMISS_QUESTION: 'dismiss question',
      WARN_USER: 'warn user',
      BAN_USER: 'ban user',
      LEAVE_ROOM: 'leave room'
    };

    warnWarning = mdDialog.alert()
                          .clickOutsideToClose(true)
                          .title('You\'ve been warned')
                          .textContent('The first time you warn a asker of a question it will do just that, "warn" the user by giving them a alert.' +
                                       ' The second time you warn that same user is banned from the room. So yeah, be cool.')
                          .ok('Got it!');

    banWarning = _.once(function() {
      mdDialog.show(warnWarning);
    });
  }

  /**
   * @name joinRoom
   * @description This is called when the user decides to join a room.
   * @param {string} roomId the id of the room the user wishes to join
   * @return {Object} data false if the room doesn't exist,
   * else
   * data {
   *    room_name : string,
   *    room_id : string,
   *    questions : array,
   *    top_questions : array
   * }
   */
  SocketService.prototype.joinRoom = function (roomId)
  {
    logger.debug('SocketService#joinRoom:roomId:', roomId);
    socket.emit(ctrl.events.JOIN_ROOM, roomId);
    return response(ctrl.events.JOIN_ROOM);
  };

  /**
   * @name createRoom
   * @description This is called when the user decides to create a room.
   * @param {string} roomName
   * @return {Object} data false if the room can't be created,
   * else
   * data {
   *    room_id : string,
   *    room_name : string,
   *    owner_id : string
   * }
   */
  SocketService.prototype.createRoom = function (roomName)
  {
    logger.debug('SocketService#createRoom:roomName:', roomName);
    socket.emit(ctrl.events.CREATE_ROOM, roomName);
    return response(ctrl.events.CREATE_ROOM);
  };

  function response(event)
  {
    var deferred = Q.defer();
    socket.on(
      event, function (data)
      {
        logger.debug('SocketService:response', event, data);
        if (data)
        {
          deferred.resolve(data);
        }

        else
        {
          deferred.reject(data);
        }
      });

    return deferred.promise;
  }

  /**
   * @name newQuestion
   * @description This is called when the user decides to post a new question.
   * @param {Object} question {room_id: string, question_text: string }
   * @return {Object} question
   * @example false if it fails, data = {
   *    question_id : string,
   *    question_text : string,
   * }
   */
  SocketService.prototype.newQuestion = function (question)
  {
    logger.debug('SocketService#newQuestion:question:', question);
    socket.emit(ctrl.events.NEW_QUESTION, question);
  };

  SocketService.prototype.upVoteQuestion = function (questionId)
  {
    var roomId = roomService.getRoomId();
    logger.debug('SocketService#upVoteQuestion:questionId:', questionId, roomId);
    socket.emit(ctrl.events.UP_VOTE_QUESTION, {room_id: roomId, question_id: questionId});
  };

  SocketService.prototype.downVoteQuestion = function (questionId)
  {
    var roomId = roomService.getRoomId();
    logger.debug('SocketService#upVoteQuestion:questionId:', questionId, roomId);
    socket.emit(ctrl.events.DOWN_VOTE_QUESTION, {room_id: roomId, question_id: questionId});
  };

  SocketService.prototype.dismissQuestion = function (questionId)
  {
    var roomId = roomService.getRoomId();
    logger.debug('SocketService#dismissQuesiton:questionId:', questionId, roomId);
    socket.emit(ctrl.events.DISMISS_QUESTION, {room_id: roomId, question_id: questionId});
  };

  SocketService.prototype.warnUser = function (questionId)
  {
    banWarning();
    var roomId = roomService.getRoomId();
    logger.debug('SocketService#warnUser:questionId:', questionId, roomId);
    socket.emit(ctrl.events.WARN_USER, {room_id: roomId, question_id: questionId});
  };

  SocketService.prototype.activatePolling = function ()
  {
    var roomId = roomService.getRoomId();
    logger.debug('SocketService#activatePolling:', roomId);
    socket.emit(ctrl.events.SET_POLL_ACTIVE, {room_id: roomId, active: true});
  };

  SocketService.prototype.deactivatePolling = function ()
  {
    var roomId = roomService.getRoomId();
    logger.debug('SocketService#deactivatePolling:', roomId);
    socket.emit(ctrl.events.SET_POLL_ACTIVE, {room_id: roomId, active: false});
  };

  SocketService.prototype.votePoll = function (option)
  {
    logger.debug('SocketService#votePoll:option:', option);
    socket.emit(ctrl.events.VOTE_POLL, {room_id: roomService.getRoomId(), option: option});
  };

  SocketService.prototype.io = function ()
  {
    return socket;
  };

  SocketService.prototype.deleteRoom = function (roomId)
  {
    logger.debug('SocketService#deleteRoom:roomId:', roomId);
    socket.emit(ctrl.events.LEAVE_ROOM, roomId);
  };

})();
