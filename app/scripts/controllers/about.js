(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AboutController', ['$interval','$scope', AboutController]);
  var ctrl, interval,scope;
  function AboutController($interval,$scope)
  {
    interval=$interval;
    scope= $scope;
    ctrl = this;
    ctrl.isOwner=true;
    ctrl.buttons=['A','B','C','D','E'];
    ctrl.counter=0;
    ctrl.isPollStarted=false;
    generateChart();
  }

  AboutController.prototype.setAnswer=function(button){
    this.answer=button;
    console.log(button);
  };

  function generateChart(){
    ctrl.chartObject = {};

    ctrl.chartObject.type = 'ColumnChart';

    ctrl.answerB = [
      {v: 'B'},
      {v: 3},
    ];

    ctrl.chartObject.data = {'cols': [
      {id: 't', label: 'Answer', type: 'string'},
      {id: 's', label: 'Students', type: 'number'}
    ], 'rows': [
      {c: [
        {v: 'A'},
        {v: 3},
      ]},
      {c: ctrl.answerB},
      {c: [
        {v: 'C'},
        {v: 1},
      ]},
      {c: [
        {v: 'D'},
        {v: 2},
      ]},
      {c: [
        {v: 'E'},
        {v: 2},
      ]}
    ]};

    ctrl.chartObject.options = {
      'title': 'Poll Results'
    };


  }

  AboutController.prototype.startPoll=function(){
    var myThis=this;
    this.isPollStarted=true;
    interval(function () {
      myThis.counter++;
      //console.log('hello');
    },1000);

  };
  AboutController.prototype.stopPoll=function(){
    console.log('called');
    this.isPollStarted=false;
  };

})();
