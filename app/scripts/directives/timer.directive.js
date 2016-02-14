/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:timer
 * @description
 * # timer
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .directive('maTimer', ['$log', '$interval', Timer]);

  var logger, interval;

  function Timer($log, $interval)
  {
    logger = $log;
    interval = $interval;
    return {
      template:'<span>{{time}}</span>',
      replace: true,
      restrict: 'E',
      scope: {
        timer: '='
      },
      link: linkFn
    };
  }

  var sec = 0.0;
  var min = 0.0;
  var timing;
  function linkFn(scope)
  {
    logger.debug('Timer called');
    scope.internalTimer = scope.timer || {};
    logger.debug('timer', scope.internalTimer);
    scope.internalTimer.start = function ()
    {
      scope.time = '00:00';
      sec = 0.0;
      min = 0.0;

      timing = interval(update, 1000);
    };

    scope.internalTimer.stop = function ()
    {
      interval.cancel(timing);
      scope.time = '00:00';
    };

    function update()
    {
      logger.debug('Update called');
      sec++;

      if (sec === 60.0)
      {
        sec = 0.0;
        min++;
      }

      var padSec = sec.toString();
      var padMin = min.toString();
      if (sec < 10)
      {
        padSec = '0' + padSec;
      }

      if (min < 10)
      {
        padMin = '0' + padMin;
      }

      scope.time = padMin + ':' + padSec;
    }
  }

})();
