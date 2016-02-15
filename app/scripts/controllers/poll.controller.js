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

    ctrl.buttons = clickerService.getButtons();
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

    socketService.io().on(socketService.events.START_POLL, newPollStarted);
    socketService.io().on(socketService.events.STOP_POLL, pollStopped);
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
    clickerService.saveCurrentVote();
  }

  function newPollStarted (data)
  {
    logger.debug('Pull started', data);
    ctrl.poll.isPollStarted = true;
    if(userService.isRoomOwner())
    {
      ctrl.timer.start();

      socketService.io().on(socketService.events.VOTE_POLL, addVote);
      return;
    }

    clickerService.openClicker();
  }

  function addVote(pollData)
  {
    logger.debug('Poll vote', pollData);
  }

  PollController.prototype.addAnswerToGraph = function (data)
  {

  };

  PollController.prototype.startPoll = function ()
  {
    socketService.activatePolling();
  };

  PollController.prototype.stopPoll = function ()
  {
    socketService.deactivatePolling();
  };

  PollController.prototype.getAnswer = function ()
  {
    ctrl.answer = clickerService.getAnswer();
  };

})();

