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
        url: '/recent-questions'
      },
      {
        label: 'Top Questions',
        url: '/top-questions'
      },
      {
        label: 'Polls',
        url: '/polls'
      }
    ];

    $scope.$watch('ctrl.selectedIndex', function(current) {
      $location.url(ctrl.pages[current].url);
    });
  }

})();
