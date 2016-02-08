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
  module.controller('OverlayController', ['$log', '$rootScope', 'UserService', 'Socket', 'SocketService', OverlayController]);

  var ctrl, logger, userService, socket, socketService, rootScope;

  function OverlayController($log, $rootScope, UserService, Socket, SocketService)
  {
    socket = Socket;
    rootScope = $rootScope;
    socketService = SocketService;
    userService = UserService;
    logger = $log;

    ctrl = this;
    ctrl.showRoom = false;
    ctrl.overlayHide = false;
    ctrl.roomName = '';
  }

  OverlayController.prototype.joinRoom = function ()
  {

  };

  OverlayController.prototype.createRoom = function ()
  {
    socketService.createRoom(ctrl.roomName).then(createRoomSuccess);
  };

  function createRoomSuccess(data)
  {
    userService.setRoomData(data);
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
