(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .service('ClickerService', ['$mdBottomSheet', 'SocketService', ClickerService]);

  var ctrl, mdbottomsheet, socketService;
  function ClickerService($mdBottomSheet, SocketService)
  {
    ctrl = this;
    socketService = SocketService;
    mdbottomsheet = $mdBottomSheet;

    ctrl.answer = '';
    ctrl.isPollStarted = false;
  }

  ClickerService.prototype.openVote = function ()
  {
    mdbottomsheet.show(
      {
        templateUrl: 'views/clicker-input-bottom-sheet.tpl.html',
        controller: 'ClickerInputController',
        controllerAs: 'ctrl',
        clickOutsideToClose: true
      });
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
