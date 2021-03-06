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
    scope.internalTimer = scope.timer || {};
    scope.internalTimer.start = function ()
    {
      scope.time = '0:00';
      sec = 0.0;
      min = 0.0;

      timing = interval(update, 1000);
    };

    scope.internalTimer.stop = function ()
    {
      interval.cancel(timing);
      scope.time = '0:00';
    };

    function update()
    {
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

      scope.time = padMin + ':' + padSec;
    }
  }

})();
