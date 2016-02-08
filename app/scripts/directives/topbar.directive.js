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
      'topbar', ['$log', 'UserService', Topbar]);

  var logger, userService;

  function Topbar($log, UserService)
  {
      logger = $log;
      userService = UserService;

      return {
        templateUrl: 'views/topbar.tpl.html',
        restrict: 'E',
        link: linkFn
      };
  }

  function linkFn($rootScope){
    $rootScope.$on('roomNameSet');
  }
})();

