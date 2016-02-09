(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AppController', ['$scope', '$location', '$log', '$timeout', 'SocketService', 'RoomService', AppController]);

  var ctrl, logger, socketService, roomService;
  function AppController($scope, $location, $log, $timeout, SocketService, RoomService)
  {
    logger = $log;
    socketService = SocketService;
    roomService = RoomService;

    ctrl = this;
    ctrl.selectedIndex = 0;
    ctrl.isFabOpen = false;
    ctrl.pages = [
      {
        label: 'Recent Questions',
        url: '/recent-questions',
        icon: 'fa fa-question-circle'
      },
      {
        label: 'Top Questions',
        url: '/top-questions',
        icon: 'fa fa-star'
      },
      {
        label: 'Polls',
        url: '/polls',
        icon: 'fa fa-bar-chart'
      },
      {
        label: 'Settings',
        url: '/settings',
        icon: 'fa fa-cog'
      }
    ];

    $scope.$watch('appCtrl.selectedIndex', function(current) {
      logger.debug('Current: ', current);
      logger.debug('Changed location too', ctrl.pages[current].url);
      $timeout(function(){
        $location.url(ctrl.pages[current].url);
      });
    });

    initSockets()
  }

  function initSockets()
  {
    socketService.io().on(
      socketService.events.NEW_QUESTION, function (question)
      {
        roomService.addQuestion(question);
      });

  }

})();
