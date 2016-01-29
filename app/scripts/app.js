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
    var blueWhiteMap = $mdThemingProvider.extendPalette('blue', {
      'A400': '000000'
    });

    $mdThemingProvider.definePalette('blueWhite', blueWhiteMap);
    $mdThemingProvider.theme('default')
      .primaryPalette('blueWhite')
      .accentPalette('blueWhite');


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
