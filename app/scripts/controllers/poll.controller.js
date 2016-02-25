(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
         .controller('PollController',
                     ['$log', '$interval', '$scope', '$rootScope', 'ClickerService', 'UserService', 'SocketService', 'Votes', 'AppService', PollController]);

  var ctrl, interval, scope, rootScope, clickerService, userService, logger, socketService, votes;

  function PollController($log, $interval, $scope, $rootScope, ClickerService, UserService, SocketService, Votes, AppService)
  {
    interval       = $interval;
    scope          = $scope;
    rootScope      = $rootScope;
    clickerService = ClickerService;
    userService    = UserService;
    socketService  = SocketService;
    logger         = $log;
    ctrl           = this;

    ctrl.timer        = {};
    ctrl.answers      = clickerService.getAnswers();
    ctrl.buttons      = clickerService.getButtons();
    ctrl.isActivePoll = clickerService.getActivePoll();
    ctrl.chart        = {
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
    _.once(AppService.manageClear(ctrl.clear));
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

    scope.$watch(
      function ()
      {
        return clickerService.getActivePoll();
      },
      function (value)
      {
        ctrl.isActivePoll = value;
      }
    );

    scope.$watch(
      function ()
      {
        return clickerService.getAnswers();
      },
      function (value)
      {
        ctrl.answers = value;
      }
    );

    socketService.io().on(socketService.events.START_POLL, newPollStarted);
    socketService.io().on(socketService.events.STOP_POLL, pollStopped);
    socketService.io().on(socketService.events.VOTE_POLL, addVote);
  }

  PollController.prototype.clear = function () {
    ctrl.poll = {
      counter: 0,
      isPollStarted: false
    };

    votes.clear();
    ctrl.timer.stop();
  };

  function pollStopped()
  {
    logger.debug('Pull stopped');
    ctrl.poll.isPollStarted = false;
    if (!ctrl.isActivePoll)
    {
      ctrl.timer.stop();
    }
    votes.updateVotes({'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0});
    if (userService.isRoomOwner())
    {
      return;
    }

    clickerService.closeClicker();
    clickerService.saveCurrentVote();
  }

  function newPollStarted(data)
  {
    logger.debug('Pull started', data);
    ctrl.isActivePoll       = false;
    ctrl.poll.isPollStarted = true;
    ctrl.timer.start();
    if (!userService.isRoomOwner())
    {
      clickerService.openClicker();
    }

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
    clickerService.setActivePoll(false);
  };

  PollController.prototype.restartVote = function ()
  {
    if (ctrl.poll.isPollStarted)
    {
      clickerService.openClicker();
    }
  };

})();

