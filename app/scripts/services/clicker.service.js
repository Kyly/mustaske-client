(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .service('ClickerService', ['$mdBottomSheet', 'SocketService', ClickerService]);

  var ctrl, mdBottomSheet, socketService, answers, buttons;
  function ClickerService($mdBottomSheet, SocketService)
  {
    ctrl = this;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;

    answers = {
      current: '',
      all: []
    };

    buttons = ['A', 'B', 'C', 'D', 'E'];
    ctrl.isPollStarted = false;
  }

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

  ClickerService.prototype.getAnswer = function ()
  {
    return answers.current;
  };

})();
