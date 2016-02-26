/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:questionInputFab
 * @description
 * # questionInputFab
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .directive('questionInputFab', ['$log', '$mdBottomSheet', QuestionInputFab]);

  var mdBottomSheet, logger;
  function QuestionInputFab($log, $mdBottomSheet)
  {
    logger = $log;
    mdBottomSheet = $mdBottomSheet;
    return {
      templateUrl: 'views/question-input-fab.tpl.html',
      restrict: 'E',
      scope: {},
      link: linkFn
    };
  }


  function linkFn(scope)
  {
    scope.openOpenBottomSheet = function ()
    {
      mdBottomSheet.show(
        {
          templateUrl: 'views/question-input-bottom-sheet.tpl.html',
          controller: 'QuestionInputController',
          controllerAs: 'ctrl',
          clickOutsideToClose: false
        }).then(function(result) {logger.debug(result);});
    };
  }


})();
