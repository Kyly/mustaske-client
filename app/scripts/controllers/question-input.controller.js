/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:QuestionInputController
 * @description
 * # RecentQuesitonsControllerCtrl
 * Controller of the mustaskeClientApp
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .controller('QuestionInputController', ['$log', '$mdBottomSheet', 'SocketService', QuestionInputController]);

  var ctrl, socketService, mdBottomSheet, logger;

  function QuestionInputController($log, $mdBottomSheet, SocketService)
  {
    ctrl = this;
    logger = $log;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;

    ctrl.newQuestion = '';
  }

  QuestionInputController.prototype.submitQuestion = function(event)
  {
    socketService.emitNewQuestion(ctrl.newQuestion);
    /* Will need to check if message was actually sent */
    mdBottomSheet.hide(ctrl.newQuestion);

    if (event)
    {
      event.preventDefault();
    }
  }


})();
