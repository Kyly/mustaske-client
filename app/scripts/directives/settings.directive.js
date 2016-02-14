/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:settings
 * @description
 * # settings
 */
(function()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .directive('settings', [Settings]);

  function Settings()
  {
    return {
      templateUrl: 'views/settings.view.html',
      controller: 'SettingsController',
      controllerAs: 'ctrl',
      scope:{},
      restrict: 'E'
    };
  }

})();
