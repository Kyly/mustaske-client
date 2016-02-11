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
    .controller('SettingsController', ['$log', 'RoomService', 'UserService', 'SocketService', SettingsController]);

  var ctrl, roomService, userService, socket, logger;
  function SettingsController($log, RoomService, SocketService, UserService)
  {
    logger = $log;
    roomService = RoomService;
    userService = UserService;
    socket = SocketService;
    ctrl = this;

    ctrl.roomId = roomService.getRoomId();
  }

  SettingsController.prototype.deleteRoom = function()
  {
    //var leaveRoomImpl = function () {
    var owner = userService.isRoomOwner;

    if (owner)
    {
      //bootbox.dialog({
        //message: deleteRoomMsg,
        //title: "<strong>Are you sure?</strong>",
        //buttons: {
        //  main:    {
        //    label:     "Stay",
        //    className: "btn-success"
        //  },
        //  danger:  {
        //    label:     "Delete",
        //    className: "btn-danger",
              //callback:  function() {
        owner = false;
        //        activePoll = false;
        //        timer.stop();
        //        graph.clearData();
        //        $('.start-poll-btn').removeClass('poll-on');
      socket.deleteRoom(ctrl.roomId);
             // }
    }
        //  }
      //  });
     // }
    else {
      socket.deleteRoom(ctrl.roomId);
    }
    //}



  };

})();
