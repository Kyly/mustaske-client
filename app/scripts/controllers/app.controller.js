(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AppController', ['$log', '$mdToast', 'SocketService', 'RoomService', 'UserService', AppController]);

  var ctrl, logger, socketService, roomService, userService, mdToast;
  function AppController($log, $mdToast,SocketService, RoomService, UserService)
  {
    logger = $log;
    socketService = SocketService;
    roomService = RoomService;
    userService = UserService;
    mdToast = $mdToast;

    ctrl = this;
    ctrl.selectedIndex = 0;
    ctrl.isFabOpen = false;
    initSockets();
  }

  function initSockets()
  {
    socketService.io().on(
      socketService.events.NEW_QUESTION, function (question)
      {
        roomService.addQuestion(question);
      });

    socketService.io().on(
      socketService.events.UP_VOTE_QUESTION, function (questionVoteInfo)
      {
        roomService.updateVote(questionVoteInfo);
      });

    socketService.io().on(
      socketService.events.DOWN_VOTE_QUESTION, function (questionVoteInfo)
      {
        roomService.updateVote(questionVoteInfo);
      });

    socketService.io().on(
      socketService.events.DISMISS_QUESTION, function (questionId)
      {
        roomService.dismissQuestion(questionId);
      });
    socketService.io().on(
      socketService.events.WARN_USER, function (questionId)
      {
        mdToast.show(mdToast.simple().textContent('You\'ve been warned bitch'));
      });
    socketService.io().on(
      socketService.events.BAN_USER, function (roomId)
      {
        socketService.deleteRoom(roomId);
      });
  }

})();
