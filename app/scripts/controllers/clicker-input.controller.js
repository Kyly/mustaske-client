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
    .controller('ClickerInputController', ['$mdBottomSheet', 'ClickerService','SocketService', ClickerInputController]);

  var ctrl, socketService, mdBottomSheet, clickerService;

  function ClickerInputController(ClickerService, $mdBottomSheet, SocketService, RoomService)
  {
    ctrl = this;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;
    clickerService=ClickerService;
    console.log('hello started clickers');
    ctrl.buttons=['A','B','C','D','E'];
  }

  ClickerInputController.prototype.submitAnswer = function (event,button)
  {
    console.log(button);
    clickerService.setAnswer(button);
  };


})();

