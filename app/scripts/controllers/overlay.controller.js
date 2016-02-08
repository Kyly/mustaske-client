/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:OverlayController
 * @description
 * # OverlayController
 * Controller of the mustaskeClientApp.
 * Handles create/join from login overlay.
 */
(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');
  module.controller(
    'OverlayController',
    ['$log', '$rootScope', 'UserService', 'SocketService', 'RoomService', OverlayController]);

  var ctrl, logger, userService, socketService, rootScope, roomService;

  function OverlayController($log, $rootScope, UserService, SocketService, RoomService)
  {
    rootScope = $rootScope;
    socketService = SocketService;
    userService = UserService;
    roomService = RoomService;
    logger = $log;

    ctrl = this;
    ctrl.showRoom = false;
    ctrl.overlayHide = false;
    ctrl.roomName = '';
  }

  OverlayController.prototype.joinRoom = function ()
  {
    socketService.joinRoom(ctrl.roomName).then(joinRoomSuccess, joinRoomFailure);
  };

  function joinRoomFailure(data)
  {
    logger.debug('Failed to join room: ', data);
  }

  function joinRoomSuccess(data)
  {
    userService.setRoomData(data);
    roomService.setRoomData(data);

    logger.debug(userService.getType());
    logger.debug(userService.getRoomName());
    rootScope.roomName = userService.getRoomName();
    ctrl.overlayHide = true;
  }

  OverlayController.prototype.createRoom = function ()
  {
    socketService.createRoom(ctrl.roomName).then(createRoomSuccess, createRoomFailure);
  };

  function createRoomFailure(data)
  {
    logger.debug('Failed to join room: ', data);
  }

  function createRoomSuccess(data)
  {
    userService.setRoomData(data);
    roomService.setRoomData(data);

    userService.setUserType('owner');
    logger.debug(userService.getType());
    logger.debug(userService.getRoomName());
    rootScope.roomName = userService.getRoomName();
    ctrl.overlayHide = true;
  }

  OverlayController.prototype.toggleAlias = function ()
  {
    ctrl.showRoom = !(ctrl.showRoom);
  };

  //function broadcastRoomName()
  //{
  //  rootScope.$broadcast('room name', userService.getRoomName());
  //}


})();
