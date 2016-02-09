(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AboutController', ['$timeout',AboutController]);
  var ctrl;

  function AboutController($timeout)
  {
    ctrl = this;
    ctrl.isOwner=true;
    ctrl.buttons=['A','B','C','D','E'];
    ctrl.answer;
    ctrl.counter='0:24';
    ctrl.isPollStarted=false;
    generateChart();
  }

  AboutController.prototype.setAnswer=function(button){
    ctrl.answer=button;
    console.log(button);
  };

  function generateChart(){
    ctrl.chartObject = {};

    ctrl.chartObject.type = "ColumnChart";

    ctrl.answerB = [
      {v: "B"},
      {v: 3},
    ];

    ctrl.chartObject.data = {"cols": [
      {id: "t", label: "Answer", type: "string"},
      {id: "s", label: "Students", type: "number"}
    ], "rows": [
      {c: [
        {v: "A"},
        {v: 3},
      ]},
      {c: ctrl.answerB},
      {c: [
        {v: "C"},
        {v: 1},
      ]},
      {c: [
        {v: "D"},
        {v: 2},
      ]},
      {c: [
        {v: "E"},
        {v: 2},
      ]}
    ]};

    ctrl.chartObject.options = {
      'title': 'Poll Results'
    };

  };
  AboutController.prototype.startPoll=function(){
    console.log('called');
    ctrl.isPollStarted=true;
  };
  AboutController.prototype.stopPoll=function(){
    console.log
  };

})();
