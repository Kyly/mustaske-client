(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AppController', ['$log', '$rootScope', '$mdToast', 'SocketService',
                                      'RoomService', 'UserService', 'AppService', AppController]);

  var ctrl, logger, socketService, roomService, userService, mdToast, appService, rootScope;

  function AppController($log, $rootScope, $mdToast, SocketService, RoomService, UserService, AppService)
  {
    logger        = $log;
    socketService = SocketService;
    roomService   = RoomService;
    userService   = UserService;
    mdToast       = $mdToast;
    appService    = AppService;
    rootScope     = $rootScope;

    ctrl               = this;
    ctrl.selectedIndex = 0;
    ctrl.isFabOpen     = false;
    initSockets();
  }

  function initSockets()
  {
    var io = socketService.io();
    io.on(
      socketService.events.NEW_QUESTION, function (question)
      {
        roomService.addQuestion(question);
      });

    io.on(
      socketService.events.UP_VOTE_QUESTION, function (questionVoteInfo)
      {
        roomService.updateVote(questionVoteInfo);
      });

    io.on(
      socketService.events.DOWN_VOTE_QUESTION, function (questionVoteInfo)
      {
        roomService.updateVote(questionVoteInfo);
      });

    io.on(
      socketService.events.DISMISS_QUESTION, function (questionId)
      {
        roomService.dismissQuestion(questionId);
      });

    io.on(
      socketService.events.WARN_USER, function (questionId)
      {
        mdToast.show(mdToast.simple().textContent('You\'ve been warned bitch'));
      });

    io.on(
      socketService.events.BAN_USER, function (roomId)
      {
        socketService.deleteRoom(roomId);
      });

    io.on(
      socketService.events.LEAVE_ROOM, function () {
        appService.reset();
        ctrl.selectedIndex = 0;
        ctrl.isFabOpen     = false;
        rootScope.$emit('leaving.room');
      }
    );

    rootScope.$on('reconnect.failed', function () {
      appService.reset();
      ctrl.selectedIndex = 0;
      ctrl.isFabOpen     = false;
    });

  }

})();
