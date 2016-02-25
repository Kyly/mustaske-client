(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name mustaskeClientApp.controller:RecentQuesitonsControllerCtrl
   * @description
   * # TopQuestionsControllere
   * Controller of the mustaskeClientApp
   */
  angular.module('mustaskeClientApp')
    .controller('TopQuestionsController', ['$log', 'SocketService', 'RoomService', 'AppService', TopQuestionsController]);

  var ctrl, socketService, roomService, logger;
  function TopQuestionsController($log, SocketService, RoomService, AppService)
  {
    logger = $log;
    roomService = RoomService;
    socketService = SocketService;

    ctrl = this;
    ctrl.topIndex = 0;
    ctrl.topQuestions = roomService.getTopQuestions();
    logger.debug('Top Questions: ', ctrl.topQuestions);
    _.once(AppService.manageClear(ctrl.clear));
  }


  TopQuestionsController.prototype.clear = function() {
    ctrl.topIndex = 0;
    ctrl.topQuestions = roomService.getTopQuestions();
    ctrl.topQuestions.lenght = 0;
  };

  TopQuestionsController.prototype.zeroOrNull = function(question)
  {
    return question.question_score !== undefined && question.question_score > 0;
  };


})();
