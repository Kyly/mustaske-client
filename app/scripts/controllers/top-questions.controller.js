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
    .controller('TopQuestionsController', ['$log', 'SocketService', 'RoomService', TopQuestionsController]);

  var ctrl, socketService, roomService, logger;
  function TopQuestionsController($log, SocketService, RoomService)
  {
    logger = $log;
    roomService = RoomService;
    socketService = SocketService;

    ctrl = this;
    ctrl.topIndex = 0;
    ctrl.topQuestions = roomService.getTopQuestions();
    logger.debug('Top Questions: ', ctrl.topQuestions);

  }


})();
