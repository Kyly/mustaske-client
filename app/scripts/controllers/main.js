'use strict';

/**
 * @ngdoc function
 * @name mustaskeClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mustaskeClientApp
 */
angular.module('mustaskeClientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
