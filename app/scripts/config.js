//(function(){
  'use strict';
  angular.module('mustaskeClientApp')
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      console.log('The config was run');
      $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('orange');
    }]);
//})();
