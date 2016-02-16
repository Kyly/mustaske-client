/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:RecentQuesitonsController
 * @description
 * # RecentQuesitonsController
 * Controller of the mustaskeClientApp
 */
(function(){
  'use strict';

  angular.module('mustaskeClientApp')
    .controller('RecentQuestionsController', ['$log', 'RoomService', RecentQuestionsController]);

  var ctrl, roomService, logger;
  function RecentQuestionsController($log, RoomService)
  {
    logger = $log;
    ctrl = this;
    ctrl.topIndex = 0;
    roomService = RoomService;
    ctrl.questions = roomService.getQuestions();
    logger.debug('Questions: ', ctrl.questions);
  }

})();
