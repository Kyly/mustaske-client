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
    .service('SocketService', ['$log', '$q', 'Socket', SocketService]);

  var ctrl, socket, logger, Q;

  function SocketService($log, $q, Socket)
  {
    logger = $log;
    socket = Socket;
    Q = $q;

    ctrl = this;
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
    socket.emit('join room', roomId);
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
    socket.emit('create room', roomName);
    return response('create room');
  };

  function response(event)
  {
    var deferred = Q.defer();
    socket.on(
      event, function (data)
      {
        logger.debug('SocketService#createRoom:response', data);
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

  SocketService.prototype.newQuestion = function ()
  {

  };

  SocketService.prototype.upVoteQuesiton = function ()
  {

  };

  SocketService.prototype.downVoteQuestion = function ()
  {

  };

  SocketService.prototype.dismissQuestion = function ()
  {

  };

  SocketService.prototype.getAllQuestions = function ()
  {
    return ctrl.questions;
  };


  SocketService.prototype.getTopQuestions = function ()
  {
    //ctrl.topQuestions = [
    //  new Question({text: 'Here is some sample question?', votes: 100}),
    //  new Question({text: 'How do you do things?', votes: 50})
    //];
    //
    //return ctrl.topQuestions;
  };

  SocketService.prototype.warnUser = function ()
  {

  };

  SocketService.prototype.newPoll = function ()
  {

  };

  SocketService.prototype.closePoll = function ()
  {

  };

  SocketService.prototype.io = function ()
  {
    return socket;
  };


})();
