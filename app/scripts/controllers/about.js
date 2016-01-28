'use strict';

/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mustaskeClientApp
 */
angular.module('mustaskeClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
