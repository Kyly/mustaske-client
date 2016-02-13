(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AboutController', ['$interval','$scope', 'ClickerService', 'UserService' ,AboutController]);
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

    //inital graph
    ctrl.graphOptions = {
      chart: {
        type: 'discreteBarChart',
        height: 300,
        margin : {
          top: 5,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: false,
        showYAxis: false,
        duration: 500
      }
    };
    ctrl.graphData = [
      {
        key: '',
        values: [
          {
            'label' : 'A' ,
            'value' : 0
          } ,
          {
            'label' : 'B' ,
            'value' : 0
          } ,
          {
            'label' : 'C' ,
            'value' : 0
          } ,
          {
            'label' : 'D' ,
            'value' : 0
          } ,
          {
            'label' : 'E' ,
            'value' : 0
          }
        ]
      }
    ];
  }

  AboutController.prototype.addAnswerToGraph=function(data){

  };

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
    this.counter=0;
    this.isPollStarted=false;
  };
  //--------------------------------
  AboutController.prototype.startVote=function(){
    clickerService.openVote();
  };

  AboutController.prototype.getAnswer=function(){
    ctrl.answer=clickerService.getAnswer();
  };

  AboutController.prototype.getAnswer=function(){
    ctrl.answer=clickerService.getAnswer();
  };

})();

