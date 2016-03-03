(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AppController', ['$log', '$rootScope', '$scope', '$mdToast', 'SocketService',
                                      'RoomService', 'UserService', 'AppService', AppController]);

  var ctrl, logger, socketService, roomService, userService, mdToast, appService, rootScope, scope;

  function AppController($log, $scope, $rootScope, $mdToast, SocketService, RoomService, UserService, AppService)
  {
    logger        = $log;
    socketService = SocketService;
    roomService   = RoomService;
    userService   = UserService;
    mdToast       = $mdToast;
    appService    = AppService;
    rootScope     = $rootScope;
    scope         = $scope;

    logger.debug('$scope is: ', $scope);
    logger.debug('$rootScope is: ', $rootScope);

    ctrl               = this;
    ctrl.selectedIndex = 0;
    ctrl.isFabOpen     = false;

    $rootScope.$watch('appCtrl.selectedIndex', function (current) {
      logger.debug('index change');
      /* jshint ignore:start */
      switch (current)
      {
        case 0:
          ga('send', 'event', 'Tabs', 'RecentQuestions');
          break;
        case 1:
          ga('send', 'event', 'Tabs', 'TopQuestions');
          break;
        case 2:
          ga('send', 'event', 'Tabs', 'Polls');
          break;
        case 3:
          ga('send', 'event', 'Tabs', 'Settings');
          break;
      }
      /* jshint ignore:end */
    });

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
        mdToast.show(
          mdToast.simple().textContent(
            'You\'ve been issued a warning by the room owner. If you are warned again you will be banned from the room.'
          )
        );

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
