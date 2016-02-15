(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .controller('PollController',
                ['$log', '$interval', '$scope', 'ClickerService', 'UserService', 'SocketService', 'Votes', PollController]);

  var ctrl, interval, scope, clickerService, userService, logger, socketService, votes;

  function PollController($log, $interval, $scope, ClickerService, UserService, SocketService, Votes)
  {
    interval = $interval;
    scope = $scope;
    clickerService = ClickerService;
    userService = UserService;
    socketService = SocketService;
    logger = $log;

    ctrl = this;
    ctrl.timer = {};
    ctrl.answers = clickerService.getAnswers();
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

    votes = new Votes(ctrl.chart.labels, ctrl.chart.data);
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
    votes.updateVotes(pollData);
  }

  PollController.prototype.startPoll = function ()
  {
    socketService.activatePolling();
  };

  PollController.prototype.stopPoll = function ()
  {
    socketService.deactivatePolling();
  };


  PollController.prototype.restartVote= function ()
  {
    if(ctrl.poll.isPollStarted){
      clickerService.openClicker();
    }
  };


})();

