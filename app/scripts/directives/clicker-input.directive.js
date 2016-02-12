/**
 * @ngdoc directive
 * @name mustaskeClientApp.directive:clickerInput
 * @description
 * # clickerInput
 */
(function ()
{
  'use strict';

  angular.module('mustaskeClientApp')
    .directive('clickerInput', ['$mdBottomSheet', ClickerInput]);

  var mdBottomSheet;

  function ClickerInput($mdBottomSheet)
  {
    mdBottomSheet = $mdBottomSheet;
    return {
      templateUrl: 'views/clicker-input-button.tpl.html',
      restrict: 'E',
      scope: {},
      link: linkFn
    };
  }

  function linkFn(scope)
  {
    scope.openOpenBottomSheet = function ()
    {
      //if statement for if poll started
      mdBottomSheet.show(
        {
          templateUrl: 'views/clicker-input-bottom-sheet.tpl.html',
          controller: 'ClickerInputController',
          controllerAs: 'ctrl',
          clickOutsideToClose: false
        });
    };
  }


})();
