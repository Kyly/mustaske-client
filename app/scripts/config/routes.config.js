(function ()
{
  'use strict';
  var module = angular.module('mustaskeClientApp');

  module.config(['$routeProvider', routing]);

  function routing($routeProvider)
  {

    console.log('Routing was initialized');
    $routeProvider.otherwise({redirectTo: '/recent-questions'});

    $routeProvider
      .when(
        '/recent-questions', {
          templateUrl: 'views/recent-questions.view.html',
          controller: 'MainCtrl'
        })
      .when(
        '/top-questions', {
          templateUrl: 'views/top-questions.view.html',
          controller: 'AboutCtrl'
        })
      .when(
        '/polls', {
          templateUrl: 'views/polls.view.html',
          controller: 'AboutCtrl'
        });
  }

})();
