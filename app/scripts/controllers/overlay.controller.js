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
    ['$log', '$scope', '$rootScope', '$mdDialog', 'UserService', 'SocketService', 'RoomService', 'AppService', OverlayController]);

  var ctrl, logger, userService, socketService, scope, rootScope, mdDialog, roomService;

  function OverlayController($log, $scope, $rootScope, $mdDialog, UserService, SocketService, RoomService, AppService)
  {
    rootScope     = $rootScope;
    scope         = $scope;
    mdDialog      = $mdDialog;
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
    socketService.joinRoom(ctrl.roomName.toLowerCase()).then(joinRoomSuccess, joinRoomFailure);
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

  OverlayController.prototype.firstTime = function()
  {
    //var helpText =

    var alert = mdDialog.alert()
      .clickOutsideToClose(true)
      .title('Welcome to Mustaske')
    /**  .textContent('Mustaske is an application to facilitate asking questions in a group forum.  If you are a professor/creator' +
        ' simply put in a room name and tap create.  Once in the room give your students or audience members the room id located' +
        ' on the top right or in the settings menu.  If you are a student or audience member please ask your professor or room' +
        ' owner to give you the room id.  The room id should come in the form adjective-noun-number for example: smelly-pussycat-69')
     **/
      .ok('Aske!');

    mdDialog.show()
      .templateUrl('views/help.tpl.html');

  };

})();
