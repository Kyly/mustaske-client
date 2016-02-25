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
    .controller('RecentQuestionsController', ['$log', 'RoomService', 'AppService', RecentQuestionsController]);

  var ctrl, roomService, logger;
  function RecentQuestionsController($log, RoomService, AppService)
  {
    logger = $log;
    ctrl = this;
    roomService = RoomService;

    init();
    _.once(AppService.manageClear(ctrl.clear));
  }

  RecentQuestionsController.prototype.clear = function() {
    init();
    ctrl.questions.length = 0;
  };

  function init()
  {
    ctrl.topIndex = 0;
    ctrl.questions = roomService.getQuestions();
    logger.debug('Questions: ', ctrl.questions);
  }

})();
