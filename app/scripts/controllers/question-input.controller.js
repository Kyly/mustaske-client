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
    .controller('QuestionInputController', ['$log', '$mdBottomSheet', 'SocketService', 'RoomService', 'AppService', QuestionInputController]);

  var ctrl, socketService, mdBottomSheet, logger, roomService;

  function QuestionInputController($log, $mdBottomSheet, SocketService, RoomService, AppService)
  {
    ctrl = this;
    logger = $log;
    roomService = RoomService;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;

    ctrl.newQuestion = '';
    init();
    _.once(AppService.manageClear(ctrl.clear));
  }

  function init() { ctrl.newQuestion = ''; }

  QuestionInputController.prototype.clear = function()
  {
    init();
  };

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
