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
    .controller('QuestionInputController', ['$log', '$mdBottomSheet', 'SocketService', 'RoomService', QuestionInputController]);

  var ctrl, socketService, mdBottomSheet, logger, roomService;

  function QuestionInputController($log, $mdBottomSheet, SocketService, RoomService)
  {
    ctrl = this;
    logger = $log;
    roomService = RoomService;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;

    ctrl.newQuestion = '';
  }

  QuestionInputController.prototype.submitQuestion = function (event)
  {
    var question = {
      room_id: roomService.getRoomId(),
      question_text: ctrl.newQuestion
    };

    socketService.newQuestion(question);
    //roomService.addQuestion(question);

    mdBottomSheet.hide(ctrl.newQuestion);

    if (event)
    {
      event.preventDefault();
    }
  };


})();
