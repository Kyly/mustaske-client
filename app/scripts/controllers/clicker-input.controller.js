/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:ClickerInputController
 * @description
 * # RecentQuesitonsControllerCtrl
 * Controller of the mustaskeClientApp
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .controller('ClickerInputController', ['$log', '$mdBottomSheet', 'SocketService', 'RoomService', ClickerInputController]);

  var ctrl, socketService, mdBottomSheet, logger, roomService;

  function ClickerInputController($log, $mdBottomSheet, SocketService, RoomService)
  {
    ctrl = this;
    logger = $log;
    roomService = RoomService;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;
    console.log('hello started clickers');
    ctrl.newAnswer = '';
    ctrl.buttons=['A','B','C','D','E'];
  }

  ClickerInputController.prototype.submitAnswer = function (event,button)
  {
    console.log(button);
  };


})();
