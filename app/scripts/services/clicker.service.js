(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .service('ClickerService', ['$mdBottomSheet', 'SocketService', ClickerService]);

  var ctrl, mdBottomSheet, socketService;
  function ClickerService($mdBottomSheet, SocketService)
  {
    ctrl = this;
    socketService = SocketService;
    mdBottomSheet = $mdBottomSheet;

    ctrl.answer = '';
    ctrl.isPollStarted = false;
  }

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
  ClickerService.prototype.setAnswer = function (answer)
  {
    ctrl.answer = answer;
  };

  ClickerService.prototype.getAnswer = function ()
  {
    return ctrl.answer;
  };

})();
