/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:poll
 * @description
 * # poll
 */
(function()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .directive('poll', [Poll]);

  function Poll()
  {
    return {
      templateUrl: 'views/poll.view.html',
      controller: 'PollController',
      controllerAs: 'ctrl',
      scope:{},
      restrict: 'E'
    };
  }

})();
