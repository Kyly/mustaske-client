(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('PollController', ['$log', '$interval', '$scope', 'ClickerService', 'UserService', PollController]);

  var ctrl, interval, scope, clickerService, userService, logger;
  function PollController( $log, $interval, $scope, ClickerService, UserService)
  {
    interval = $interval;
    scope = $scope;
    clickerService = ClickerService;
    userService = UserService;
    logger = $log;

    ctrl = this;
    ctrl.isOwner = userService.isRoomOwner();
    ctrl.buttons = ['A', 'B', 'C', 'D', 'E'];

    ctrl.poll = {
      counter: 0,
      isPollStarted: clickerService.getPollStatus()
    };

    //inital graph
    ctrl.graphOptions = {
      chart: {
        type: 'discreteBarChart',
        height: 300,
        margin: {
          top: 5,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function (d)
        {
          return d.label;
        },
        y: function (d)
        {
          return d.value;
        },
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
            'label': 'A',
            'value': 0
          },
          {
            'label': 'B',
            'value': 0
          },
          {
            'label': 'C',
            'value': 0
          },
          {
            'label': 'D',
            'value': 0
          },
          {
            'label': 'E',
            'value': 0
          }
        ]
      }
    ];
  }

  PollController.prototype.addAnswerToGraph = function (data)
  {

  };

  PollController.prototype.setAnswer = function (button)
  {
    ctrl.answer = button;
  };

  PollController.prototype.startPoll = function ()
  {
    logger.debug('Pull started');
    ctrl.poll.isPollStarted = true;
    interval(function () {
      ctrl.counter++;
      //console.log('hello');
    },1000);
  };

  //------------------------------------------
  PollController.prototype.stopPoll = function ()
  {
    logger.debug('Pull stopped');
    ctrl.poll.counter = 0;
    ctrl.poll.isPollStarted = false;
  };

  //--------------------------------
  PollController.prototype.startVote = function ()
  {
    clickerService.openVote();
  };

  PollController.prototype.getAnswer = function ()
  {
    ctrl.answer = clickerService.getAnswer();
  };

  PollController.prototype.getAnswer = function ()
  {
    ctrl.answer = clickerService.getAnswer();
  };

})();

