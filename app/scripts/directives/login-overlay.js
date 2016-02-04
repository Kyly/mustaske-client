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
  function OverlayController(){
    ctrl=this;
    ctrl.showRoom=true;
    ctrl.overlayHide=true;
    ctrl.toggleAlias=function(){
      console.log('Welcome to this Function');
      ctrl.showRoom = !(ctrl.showRoom);
    };
    ctrl.isLoggedIn=function(){
      ctrl.overlayHide=false;
    };
  }

  OverlayController.prototype.toggleAlias= function() {
    ctrl.showRoom=!(ctrl.showRoom);
  };

})();
