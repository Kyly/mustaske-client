(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name mustaskeClientApp.directive:questionCard
   * @description
   * # questionCard
   */
  angular.module('mustaskeClientApp')
    .directive('questionInputFab', [QuestionCard]);

  function QuestionCard()
  {
    return {
      templateUrl: 'views/question-input-fab.tpl.html',
      restrict: 'E',
      scope: {},
      link: linkFn
    };
  }

  function linkFn(scope)
  {
  }


})();
