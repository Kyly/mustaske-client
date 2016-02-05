(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name mustaskeClientApp.controller:RecentQuesitonsControllerCtrl
   * @description
   * # RecentQuesitonsControllerCtrl
   * Controller of the mustaskeClientApp
   */
  angular.module('mustaskeClientApp')
    .controller('RecentQuestionsController', ['$log', 'SocketService', RecentQuestionsController]);

  var ctrl, socketService, logger;
  function RecentQuestionsController($log, SocketService)
  {
    ctrl = this;
    ctrl.topIndex = 0;
    logger = $log;
    socketService = SocketService;
    ctrl.questions = socketService.getRecentQuestions();
    logger.debug('Questions: ', ctrl.questions);
  }


})();
