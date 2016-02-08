/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:topbar
 * @description
 * # topbar
 */
(function ()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .directive(
      'topbar', [Topbar]);

  function Topbar()
  {
    return {
      templateUrl: 'views/topbar.tpl.html',
      restrict: 'E'
    };
  }

})();

