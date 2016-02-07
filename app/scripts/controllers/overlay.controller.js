(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');
  module.controller('OverlayController', ['$log', 'UserService', OverlayController]);

  var ctrl, logger, userService;

  function OverlayController($log, UserService)
  {
    ctrl = this;
    ctrl.showRoom = false;
    ctrl.overlayHide = false;
    ctrl.roomName = '';
    userService = UserService;
    logger = $log;
  }

  OverlayController.prototype.joinRoom = function()
  {
    userService.setRoomName(ctrl.roomName);
    ctrl.overlayHide = true;

    logger.debug(userService.getType());
    logger.debug(userService.getRoomName());
  };

  OverlayController.prototype.createRoom = function()
  {
    userService.setRoomName(ctrl.roomName);
    userService.setUserType('owner');
    ctrl.overlayHide = true;

    logger.debug(userService.getType());
    logger.debug(userService.getRoomName());
  };

  OverlayController.prototype.toggleAlias = function()
  {
    ctrl.showRoom = !(ctrl.showRoom);
  };

  function broadcastRoomName($rootScope)
  {
    $rootScope.$broadcast('roomNameSet', userService.setRoomName());
  }















})();
