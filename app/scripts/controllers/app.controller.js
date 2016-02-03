(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AppController', ['$scope', '$location', '$log', AppController]);

  var ctrl, logger;
  function AppController($scope, $location, $log)
  {
    logger = $log;
    ctrl = this;
    ctrl.selectedIndex = 0;
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

    $scope.$watch('ctrl.selectedIndex', function(current) {
      logger.debug('Changed location too', ctrl.pages[current].url);
      $location.url(ctrl.pages[current].url);
    });
  }

})();
