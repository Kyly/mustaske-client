/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:Settings Controller
 * @description
 * # Settings Controller
 * Controller of the mustaskeClientApp
 */

(function(){
  'use strict';

  angular.module('mustaskeClientApp')
    .controller('SettingsController', ['$log', '$scope', 'RoomService', 'UserService', 'SocketService', SettingsController]);

  var ctrl, owner, roomService, userService, socket, logger, scope;
  function SettingsController($log, $scope, RoomService, UserService, SocketService)
  {
    logger = $log;
    roomService = RoomService;
    userService = UserService;
    socket = SocketService;
    scope = $scope;

    ctrl = this;
    init();
  }

  function init()
  {
    scope.$watch(
      function ()
      {
        return roomService.getRoomId();
      },
      function (value)
      {
        ctrl.roomId = value;
      }
    );

    scope.$watch(
      function ()
      {
        return userService.isRoomOwner();
      },
      function (value)
      {
        ctrl.message = value ? 'Delete Room' : 'Leave Room';
      }
    );
  }

  SettingsController.prototype.removeRoom = function(){
    socket.deleteRoom(ctrl.roomId);
  };
})();
