(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.controller('AppController', ['$scope', '$location', '$log', AppController]);

  function AppController($scope, $location, $log)
  {
    $scope.selectedIndex = 0;

    $scope.$watch('selectedIndex', function(current, old) {
      switch(current) {
        case 0: $location.url("/top-questions"); break;
        case 1: $location.url("/recent-questions"); break;
        case 2: $location.url("/polls"); break;

      }
    });
  }

})();
