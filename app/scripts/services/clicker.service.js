(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
         .service('ClickerService', ['$mdBottomSheet', 'SocketService', 'RoomService', 'AppService', ClickerService]);

  var ctrl, mdBottomSheet, socketService, answers, buttons, roomService, activePoll;

  function ClickerService($mdBottomSheet, SocketService, RoomService, AppService)
  {
    ctrl          = this;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;
    roomService   = RoomService;
    buttons       = ['A', 'B', 'C', 'D', 'E'];
    init();
    _.once(AppService.manageClear(ctrl.clear));
  }

  function init() {
    answers            = {current: '', all: []};
    ctrl.isPollStarted = false;
    activePoll         = false;
  }

  ClickerService.prototype.clear = function ()
  {
    init();
    mdBottomSheet.cancel();
  };

  ClickerService.prototype.getButtons = function ()
  {
    return buttons;
  };

  ClickerService.prototype.openClicker = function ()
  {
    mdBottomSheet.show(
      {
        templateUrl: 'views/clicker-input-bottom-sheet.tpl.html',
        controller: 'ClickerInputController',
        controllerAs: 'ctrl',
        clickOutsideToClose: true
      });
  };

  ClickerService.prototype.closeClicker = function ()
  {
    mdBottomSheet.cancel();
  };

  //poll status
  ClickerService.prototype.getPollStatus = function ()
  {
    if (roomService.getActivePoll())
    {
      ctrl.isPollStarted = true;
      roomService.setActivePoll(false);
      ctrl.isActivePoll = true;
      ctrl.openClicker();
    }
    return ctrl.isPollStarted;
  };

  ClickerService.prototype.setPollStatus = function (status)
  {
    ctrl.isPollStarted = status;
  };

  //answers
  ClickerService.prototype.vote = function (answer)
  {
    socketService.votePoll(answer);
    answers.current = answer;
  };

  ClickerService.prototype.saveCurrentVote = function ()
  {
    answers.all.push(answers.current);
  };

  ClickerService.prototype.getAnswers = function ()
  {
    return answers;
  };

  ClickerService.prototype.getActivePoll = function ()
  {
    return roomService.getRoomData();
  };

  ClickerService.prototype.setActivePoll = function (poll) {
    activePoll = poll;
  };

})();
