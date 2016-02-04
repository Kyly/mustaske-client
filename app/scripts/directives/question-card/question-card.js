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
      template: 'scripts/directives/question-card/question-card.tpl.html',
      restrict: 'E',
      scope: {

      },
      link: function postLink(scope, element, attrs) {
        element.text('this is the questionCard directive');
      }
    };
  }

})();
