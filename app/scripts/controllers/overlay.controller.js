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

    //Help dialog
    scope.firstTime = function(event) {
      mdDialog.show(
        mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Welcome to Mustaske')
          .textContent('If you are new create a room and share the given room id to others so they can join the room.' +
            ' If you are joining an already created room ask someone near you for the room id.')
          .ok('Aske!')
          .targetEvent(event)
      );
    };

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
  /**
  OverlayController.prototype.firstTime = function()
  {

    mdDialog.show('You\'ve been warned bitch');

    alert = mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('This is an alert title')
      .textContent('You can specify some description text in here.')
      .ok('Got it!');

    mdDialog.show( alert );

  };
**/
})();
