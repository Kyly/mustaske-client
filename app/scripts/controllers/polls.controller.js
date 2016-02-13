(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AboutController', ['$interval','$scope', 'ClickerService', 'UserService',AboutController]);
  var ctrl, interval,scope, clickerService,userService;
  function AboutController($interval,$scope, ClickerService,UserService)
  {
    interval=$interval;
    scope= $scope;
    clickerService=ClickerService;
    userService=UserService;
    ctrl = this;
    ctrl.isOwner=userService.isRoomOwner();
    ctrl.buttons=['A','B','C','D','E'];
    ctrl.counter=0;
    ctrl.isPollStarted=clickerService.getPollStatus();
  }

  AboutController.prototype.setAnswer=function(button){
    this.answer=button;
    console.log(button);
  };

  AboutController.prototype.startPoll=function(){
    var myThis=this;
    this.isPollStarted=true;
    interval(function () {
      myThis.counter++;
      //console.log('hello');
    },1000);

  };

  //------------------------------------------
  AboutController.prototype.stopPoll=function(){
    console.log('called');
    this.isPollStarted=false;
  };
  //--------------------------------
  AboutController.prototype.startVote=function(){
    clickerservice.openVote();
  };

  AboutController.prototype.getAnswer=function(){
    ctrl.answer=clickerservice.getAnswer();
  }

})();

