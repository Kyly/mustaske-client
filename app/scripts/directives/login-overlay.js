(function ()
{
  'use strict';

  /**
   * @ngdoc directive
   * @name mustaskeClientApp.directive:loginOverlay
   * @description
   * # loginOverlay
   */
  angular.module('mustaskeClientApp')
    .directive(
      'loginOverlay', function ()
      {
        return {
          templateUrl: 'views/login-overlay.tpl.html',
          restrict: 'E',
          controller: OverlayController,
          controllerAs: 'ctrl'
        };
      }
    );

  var ctrl;

  function OverlayController()
  {
    ctrl = this;
    ctrl.showRoom = false;
    ctrl.overlayHide = false;
  }

  OverlayController.prototype.isLoggedIn = function ()
  {
    ctrl.overlayHide = true;
  };

  OverlayController.prototype.toggleAlias = function ()
  {
    ctrl.showRoom = !(ctrl.showRoom);
  };

})();
