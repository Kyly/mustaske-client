(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.config(['$routeProvider', routing]);

  function routing($routeProvider)
  {
    $routeProvider.otherwise({redirectTo: '/'});
  }
})();
