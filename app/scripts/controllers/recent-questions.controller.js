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
    .controller('RecentQuestionsController', ['$log', 'SocketService', 'Socket', RecentQuestionsController]);

  var ctrl, socketService, logger, socket;
  function RecentQuestionsController($log, SocketService, Socket)
  {
    logger = $log;
    ctrl = this;
    ctrl.topIndex = 0;
    socketService = SocketService;
    //ctrl.questions = socketService.getRecentQuestions();
    logger.debug('Questions: ', ctrl.questions);
  }


})();
