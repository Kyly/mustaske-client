/**
 * @ngdoc service
 * @name mustaskeClientApp.AppService
 * @description
 * # AppService
 * Service in the mustaskeClientApp.
 */

(function ()
{

  'use strict';
  angular.module('mustaskeClientApp').service('AppService', ['$log', AppService]);

  var logger, clearFunctions;

  function AppService($log)
  {
    logger = $log;
    clearFunctions = [];
  }

  AppService.prototype.reset = function() {
    clearFunctions.forEach(function (clearFn) {
      clearFn.call();
    });
  };

  AppService.prototype.manageClear = function (clearFn) {
    clearFunctions.push(clearFn);
  };
})();
