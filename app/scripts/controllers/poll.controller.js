(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .controller('PollController',
                ['$log', '$interval', '$scope', 'ClickerService', 'UserService', 'SocketService', PollController]);

  var ctrl, interval, scope, clickerService, userService, logger, socketService;

  function PollController($log, $interval, $scope, ClickerService, UserService, SocketService)
  {
    interval = $interval;
    scope = $scope;
    clickerService = ClickerService;
    userService = UserService;
    socketService = SocketService;
    logger = $log;

    ctrl = this;
    ctrl.timer = {};

    ctrl.buttons = ['A', 'B', 'C', 'D', 'E'];
    ctrl.chart = {
      labels: ctrl.buttons,
      data: [[30, 50, 5, 10, 5]],
      options: {
        scaleShowGridLines: false,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        barShowStroke: false,
        barValueSpacing: 15,
        scaleShowLabels: false,
        tooltipTemplate: '<%= value + " %" %>'
      },
      colours: [{
        fillColor: '#1D3951'
      }]
    };

    init();
  }

  function init()
  {
    ctrl.poll = {
      counter: 0,
      isPollStarted: false
    };

    ctrl.isRoomOwner = false;

    scope.$watch(
      function ()
      {
        return clickerService.getPollStatus();
      },
      function (value)
      {
        ctrl.poll.isPollStarted = value;
      }
    );

    scope.$watch(
      function ()
      {
        return userService.isRoomOwner();
      },
      function (value)
      {
        ctrl.isRoomOwner = value;
      }
    );

    socketService.io().on(socketService.events.START_PULL, newPollStarted);
    socketService.io().on(socketService.events.STOP_PULL, pollStopped);
  }

  function pollStopped ()
  {
    logger.debug('Pull stopped');
    ctrl.poll.isPollStarted = false;
    if (userService.isRoomOwner())
    {
      ctrl.timer.stop();
      return;
    }

    clickerService.closeClicker();
  }

  function newPollStarted (data)
  {
    logger.debug('Pull started', data);
    ctrl.poll.isPollStarted = true;
    if(userService.isRoomOwner())
    {
      ctrl.timer.start();
      return;
    }

    clickerService.openClicker();
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
    socketService.activatePolling();
  };

  //------------------------------------------
  PollController.prototype.stopPoll = function ()
  {
    socketService.deactivatePolling();
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

