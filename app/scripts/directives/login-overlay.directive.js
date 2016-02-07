(function ()
{
  'use strict';

  /**
   * @ngdoc directive
   * @name mustaskeClientApp.directive:loginOverlay
   * @description
   * # loginOverlay
   */
  angular.module('mustaskeClientApp')
    .directive(
      'loginOverlay', function ()
      {
        return {
          templateUrl: 'views/login-overlay.tpl.html',
          restrict: 'E',
          controller: 'OverlayController',
          controllerAs: 'ctrl'
        };
      }
    );


})();
