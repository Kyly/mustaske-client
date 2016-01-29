'use strict';

/**
 * @ngdoc overview
 * @name mustaskeClientApp
 * @description
 * # mustaskeClientApp
 *
 * Main module of the application.
 */
angular
  .module('mustaskeClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    //$mdThemingProvider.theme('default')
    //  .primaryPalette('light-blue')
    //  .accentPalette('blue-gray');


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
