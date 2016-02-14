/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:loginOverlay
 * @description
 * # loginOverlay
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .directive(
      'loginOverlay', function ()
      {
        return {
          templateUrl: 'views/login-overlay.tpl.html',
          restrict: 'E',
          scope: {},
          controller: 'OverlayController',
          controllerAs: 'ctrl'
        };
      }
    );


})();
