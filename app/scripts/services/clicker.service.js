(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .service('ClickerService', ['$mdBottomSheet', ClickerService]);
  console.log('cc start');
  var ctrl, mdbottomsheet ;

  function ClickerService($mdBottomSheet)
  {
    ctrl=this;
    mdbottomsheet=$mdBottomSheet;
    ctrl.answer='';
    ctrl.isPollStarted=false;
  }

  ClickerService.prototype.openVote = function ()
  {
    console.log('hi');
    mdbottomsheet.show(
      {
        templateUrl: 'views/clicker-input-bottom-sheet.tpl.html',
        controller: 'ClickerInputController',
        controllerAs: 'ctrl',
        clickOutsideToClose: true
      });

  };
  //poll status
  ClickerService.prototype.getPollStatus=function (){
    return ctrl.isPollStarted;
  } ;

  ClickerService.prototype.setPollStatus=function(status){
    ctrl.isPollStarted=status;
  };
  //answers
  ClickerService.prototype.setAnswer=function(answer){
    ctrl.answer=answer;
    console.log('answer is: '+ctrl.answer);
  };

  ClickerService.prototype.getAnswer=function(){
    return ctrl.answer;
  };

})();
