(function()
{
  'use strict';

  /**
   * @ngdoc directive
   * @name mustaskeClientApp.directive:topQuestions
   * @description
   * # topQuestions
   */
  angular.module('mustaskeClientApp')
    .directive('topQuestions', [TopQuestions]);

  function TopQuestions()
  {
    return {
      templateUrl: 'views/top-questions.view.html',
      controller: 'TopQuestionsController',
      controllerAs: 'ctrl',
      scope:{},
      restrict: 'E'
    };
  }

})();
