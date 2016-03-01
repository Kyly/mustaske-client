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
    ['$log', '$scope', '$rootScope', '$mdDialog', '$mdToast',
     'UserService', 'SocketService', 'RoomService', 'AppService', OverlayController]);

  var ctrl, logger, userService, socketService, scope, rootScope, mdDialog, roomService, mdToast, joinError;

  function OverlayController($log, $scope, $rootScope, $mdDialog, $mdToast, UserService, SocketService, RoomService, AppService)
  {
    rootScope     = $rootScope;
    scope         = $scope;
    mdDialog      = $mdDialog;
    socketService = SocketService;
    userService   = UserService;
    roomService   = RoomService;
    logger        = $log;
    mdToast       = $mdToast;
    ctrl          = this;

    joinError = $mdToast
      .simple()
      .action('Close')
      .highlightAction(true)
      .textContent('Error joining room. Double check your room id (Ex. fluffy-beaver-82).');

    ctrl.input = {
      pattern: /^[A-Za-z]+-[A-Za-z]+-\d+$/
    };

    init();
    _.once(AppService.manageClear(ctrl.clear));

  }

  OverlayController.prototype.clear = function () {
    ctrl.isLeaving        = true;
    ctrl.roomName         = '';
    ctrl.overlayHide      = false;
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
    mdToast.show(joinError);
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

  OverlayController.prototype.help = function ()
  {
    mdDialog
      .show({
              templateUrl: 'views/help.tpl.html',
              clickOutsideToClose: true,
              controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
                $scope.close = function () {
                  $mdDialog.hide();
                };
              }]

            }
      );

  };

})();
