(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name mustaskeClientApp.directive:questionCard
   * @description
   * # questionCard
   */
  angular.module('mustaskeClientApp')
    .directive('questionCard', [QuestionCard]);

  function QuestionCard()
  {
    return {
      templateUrl: 'views/question-card.tpl.html',
      restrict: 'E',
      scope: {
        question: '='
      },
      link: linkFn
    };
  }

  function linkFn(scope)
  {
    scope.hide = true;
    scope.datailToggle = function()
    {
      scope.hide = !scope.hide;
    };
  }


})();
