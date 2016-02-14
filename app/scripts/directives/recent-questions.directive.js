/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:topQuestions
 * @description
 * # topQuestions
 */
(function()
{
  'use strict';
  angular.module('mustaskeClientApp')
    .directive('recentQuestions', [RecentQuestions]);

  function RecentQuestions()
  {
    return {
      templateUrl: 'views/recent-questions.view.html',
      controller: 'RecentQuestionsController',
      controllerAs: 'ctrl',
      scope:{},
      restrict: 'E'
    };
  }

})();
