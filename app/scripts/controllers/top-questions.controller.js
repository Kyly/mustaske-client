(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name mustaskeClientApp.controller:RecentQuesitonsControllerCtrl
   * @description
   * # TopQuestionsController
   * Controller of the mustaskeClientApp
   */
  angular.module('mustaskeClientApp')
    .controller('TopQuestionsController', ['$log', 'SocketService', TopQuestionsController]);

  var ctrl, socketService, logger;
  function TopQuestionsController($log, SocketService)
  {
    ctrl = this;
    ctrl.topIndex = 0;
    logger = $log;
    socketService = SocketService;
    ctrl.topQuestions = socketService.getTopQuestions();
  }


})();
