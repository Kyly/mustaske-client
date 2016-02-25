/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:ClickerInputController
 * @description
 * # ClickerInputController
 * Controller of the mustaskeClientApp
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .controller('ClickerInputController', ['$log', 'ClickerService', 'SocketService', ClickerInputController]);

  var ctrl, socketService, clickerService, logger;

  function ClickerInputController($log, ClickerService, SocketService)
  {
    socketService = SocketService;
    clickerService = ClickerService;
    logger = $log;

    ctrl = this;
    ctrl.answers = clickerService.getAnswers();
    ctrl.buttons = clickerService.getButtons();
  }

  ClickerInputController.prototype.submitAnswer = function (button)
  {
    clickerService.vote(button);
  };


})();

