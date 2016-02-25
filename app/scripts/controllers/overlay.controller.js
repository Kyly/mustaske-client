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
    ['$log', '$scope', '$rootScope', 'UserService', 'SocketService', 'RoomService', 'AppService', OverlayController]);

  var ctrl, logger, userService, socketService, scope, rootScope, roomService;

  function OverlayController($log, $scope, $rootScope, UserService, SocketService, RoomService, AppService)
  {
    rootScope     = $rootScope;
    scope         = $scope;
    socketService = SocketService;
    userService   = UserService;
    roomService   = RoomService;
    logger        = $log;

    ctrl       = this;
    ctrl.input = {
      pattern: /^[A-Za-z]+-[A-Za-z]+-\d+$/
    };

    init();

    _.once(AppService.manageClear(ctrl.clear));
  }

  OverlayController.prototype.clear = function () {
    ctrl.isLeaving = true;
    ctrl.roomName = '';
    ctrl.overlayHide = false;
    rootScope.isRoomOwner = '';
    rootScope.roomName    = '';
    rootScope.roomId      = '';
  };

  function init()
  {
    ctrl.showRoom         = false;
    ctrl.isLeaving        = false;
    ctrl.overlayHide      = false;
    ctrl.roomName         = '';
    rootScope.isRoomOwner = '';
    rootScope.roomName    = '';
    rootScope.roomId      = '';
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
    rootScope.roomId   = roomService.getRoomId();
    ctrl.overlayHide   = true;
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
    roomService.setRoomData(data);
    userService.setRoomData(data);
    userService.setUserType('owner');
    logger.debug(userService.getType());
    logger.debug(userService.getRoomName());

    rootScope.isRoomOwner = userService.isRoomOwner();
    rootScope.roomName    = roomService.getRoomName();
    rootScope.roomId      = roomService.getRoomId();
    ctrl.overlayHide      = true;
  }

})();
